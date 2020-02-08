const conn = require('../db/db')

module.exports = {

  searchPatient: (req, res) => { 
    conn.query('SELECT * FROM lawsuit WHERE plaintiff LIKE ?', req.body.name,
    (err, results, fields) => {
      if (err) res.send(err)
      res.send(results);
    })
  }
}