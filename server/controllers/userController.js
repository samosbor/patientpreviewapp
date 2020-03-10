const conn = require('../db/db')
const auth = require('../auth')
const axios = require('axios')
const { v4: uuid } = require('uuid')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {

  getUserData: (req, res) => { 
    let sql = `SELECT a.name as "companyName",
      a.planLevel as "planLevel",
      m.role as "role"
      FROM account a
      INNER JOIN user u
      INNER JOIN membership m
      WHERE u.id = ?;`

    conn.query(sql, [req.body.id],
      (err, results, fields) => {
        if (err) res.status(400);
        res.send(results);
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
    
    conn.query(sql, [req.body.companyName],
      (err, results, fields) => {
        if (err) res.status(400);
        res.send(results);
      }
    )
  },
  createAuth0User: async (email, name, password, res) => { //creates user in Auth0
    //get management token
    const user_id = await axios.post('https://' + auth.authConfig.domain + '/oauth/token',
    {
      client_id: auth.authConfig.client_id,
      client_secret: auth.authConfig.client_secret,
      audience: auth.authConfig.management_audience,
      grant_type: "client_credentials"
    },
    {
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(authResponse => { //create user
      const accessToken = authResponse.data.access_token
      return axios.post('https://' + auth.authConfig.domain + '/api/v2/users',
      {
        email: email,
        name: name,
        password: password,
        connection: "Username-Password-Authentication"
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(userResponse => {
        return userResponse.data.user_id
      })
      .catch(err =>{
        throw err
      })
    })
    .catch(err => {
      res.status(err.response.data.statusCode).send(err.response.data)
      throw err
    })
    return user_id
  },
  giveAuth0Access: async (id) => {
    await axios.post('https://' + auth.authConfig.domain + '/oauth/token',
    {
      client_id: auth.authConfig.client_id,
      client_secret: auth.authConfig.client_secret,
      audience: auth.authConfig.management_audience,
      grant_type: "client_credentials"
    },
    {
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(authResponse => { //add app_metadata
      const accessToken = authResponse.data.access_token
      return axios.patch('https://' + auth.authConfig.domain + '/api/v2/users/' + id,
      {
        app_metadata: {access: "full"}
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .catch(err =>{
        throw err
      })
    })
    .catch(err => {
      res.status(err.response.data.statusCode).send(err.response.data)
      throw err
    })
  },
  createUser: async (name, email) => {
    let sql1 = `SELECT * FROM user WHERE LOWER(email) = LOWER(?)`
    user = await conn.promise().query(sql1, [email])
    .then(([rows,fields]) => {
      return rows
    })
    if (user.length > 0) {
      throw "User already exists"
    }

    const id = uuid()
    let sql2 = `INSERT INTO user
      (id,
      name,
      email)
      VALUES
      (?, ?, ?)`
    const rows = await conn.promise().query(sql2, [id, name, email])
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
      conn.promise().query(sql, [id, userId, email, hash])
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
    const rows = await conn.promise().query(sql, [id, userId, accountId, role])
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
    let user = await conn.promise().query(sql, [req.body.email])
    .then(([rows,fields]) => {
      return rows
    })
    if (user.length < 1) {
      res.status(401).send({
        msg: 'Username or password is incorrect'
      })
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