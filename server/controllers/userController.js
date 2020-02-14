const conn = require('../db/db')

module.exports = {

  getUserData: (req, res) => { 
    let sql = `SELECT account.name as "Company Name",
      account.planLevel as "Plan Level",
      membership.role as "Role"
      FROM account JOIN user JOIN membership
      WHERE user.id = ?;`

    conn.query(sql, [req.body.id],
    (err, results, fields) => {
      if (err) res.status(400);
      res.send(results);
    })
  }
}