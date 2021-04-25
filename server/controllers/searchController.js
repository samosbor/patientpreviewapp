const db = require('../db/db')

module.exports = {

  searchPatient: (req, res) => { 
    let stmt = db.prepare(`SELECT *
    FROM lawsuit
    WHERE CaseName LIKE ?
    LIMIT 10`)

    let results = stmt.all("%"+req.body.name+"%")
    for (const result of results) {
      result.score = 10
    }
    res.send(results);
  }
}