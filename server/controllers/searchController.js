const conn = require('../db/db')

module.exports = {

  searchPatient: (req, res) => { 
    let sql = `SELECT *, 
    MATCH (CaseName,Plaintiff,Defendant) AGAINST (?)
    as score 
    FROM production.lawsuit
    ORDER BY score DESC
    LIMIT 10`

    conn.query(sql, [req.body.name],
    (err, results, fields) => {
      if (err) res.status(400);
      res.send(results);
    })
  }
}