const conn = require('../db/db')

module.exports = {

  getUserData: (req, res) => { 
    let sql = `SELECT account.name as "companyName",
      account.planLevel as "planLevel",
      membership.role as "role"
      FROM account JOIN user JOIN membership
      WHERE user.id = ?;`

    conn.query(sql, [req.body.id],
      (err, results, fields) => {
        if (err) res.status(400);
        res.send(results);
      }
    )
  },
  getCompanyUsers: (req, res) => {
    let sql = `SELECT user.id as 'userId',
      user.name as 'name',
      user.email as 'email',
      membership.role as 'role'
      FROM account INNER JOIN membership JOIN user
      WHERE account.name = ?;`
    
    conn.query(sql, [req.body.companyName],
      (err, results, fields) => {
        if (err) res.status(400);
        res.send(results);
      }
    )
  }
}