const db = require('../db/db')
const { v4: uuid } = require('uuid')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {

  getUserData: (req, res) => { 
    let sql = `SELECT a.name as "companyName",
      a.planLevel as "planLevel",
      m.role as "role",
      u.name as "name",
      u.email as "email"
      FROM user u
      INNER JOIN membership m ON u.id = m.relatedUserId
      INNER JOIN account a ON m.relatedAccountId = a.id
      WHERE u.id = ?;`

    db.query(sql, [req.tokenData.userId],
      (err, results, fields) => {
        if (err) {
          console.log(err)
          res.status(400)
        }
        res.send(results)
      }
    )
  },
  getCompanyUsers: (req, res) => {
    let sql = `SELECT u.id as 'userId',
      u.name as 'name',
      u.email as 'email',
      m.role as 'role'
      FROM account a
      INNER JOIN membership m ON m.relatedAccountId = a.id
      INNER JOIN user u ON m.relatedUserId = u.id
      WHERE a.name = ?;`
    
    db.query(sql, [req.body.companyName],
      (err, results, fields) => {
        if (err) res.status(400);
        res.send(results);
      }
    )
  },
  createUser: async (name, email) => {
    let sql1 = `SELECT * FROM user WHERE LOWER(email) = LOWER(?)`
    user = await db.promise().query(sql1, [email])
    .then(([rows,fields]) => {
      return rows
    })
    if (user.length > 0) {
      var err = new Error("HTTP status code: 409")
      err.response = "User already exists"
      err.status = "409"
      throw err
    }

    const id = uuid()
    let sql2 = `INSERT INTO user
      (id,
      name,
      email)
      VALUES
      (?, ?, ?)`
    const rows = await db.promise().query(sql2, [id, name, email])
      .then(([rows,fields]) => {
        return rows
      })
      .catch(err => {
        throw err
      })
    return id
  },
  createLogin: async (userId, email, password) => {
    await bcrypt.hash(password, 10)
    .then(hash => {
      const id = uuid()
      let sql = `INSERT INTO login
        (id,
        userId,
        email,
        passwordHash)
        VALUES
        (?, ?, ?, ?)`
      db.promise().query(sql, [id, userId, email, hash])
        .then(([rows,fields]) => {
          return rows
        })
        .catch(err => {
          throw err
        })
    })
    .catch(err => {
      throw err
    })
  },
  createMembership: async(userId, accountId, role) => {
    const id = uuid()
    let sql = `INSERT INTO membership
      (id,
      relatedUserId,
      relatedAccountId,
      role)
      VALUES
      (?, ?, ?, ?)`
    const rows = await db.promise().query(sql, [id, userId, accountId, role])
      .then(([rows,fields]) => {
        return rows
      })
      .catch(err => {
        throw err
      })
    return id
  },
  login: async (req, res) => {
    let sql = `SELECT * 
    FROM login
    WHERE LOWER(email) = LOWER(?)`
    let user = await db.promise().query(sql, [req.body.email])
    .then(([rows,fields]) => {
      return rows
    })
    if (user === []) {
      res.status(401).send({
        msg: 'Username or password is incorrect'
      })
      throw 'Username or password is incorrect'
    }
    bcrypt.compare(req.body.password, user[0]['passwordHash'])
    .then(result => {
      if (result) {
        const token = jwt.sign({
            email: user[0].email,
            userId: user[0].userId
          },
          'SECRETKEY', {
            expiresIn: '7d'
          }
        )
        res.status(200).send({
          msg: 'Logged in!',
          token,
          user: result[0]
        })
      } else {
        res.status(401).send({
          msg: 'Username or password is incorrect'
        })
      }
    })
    .catch(err => {
      res.status(401).send({
        msg: 'Username or password is incorrect'
      })
    })
  }
}