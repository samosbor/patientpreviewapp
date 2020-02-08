var conn = require('../db/db')

module.exports = {

  listAllLawsuits: (req, res) => {
    conn.query("Select * from lawsuit",
    (err, results, fields) => {
      if (err) res.send(err)
      res.send(results);
    })
  },

  getLawsuitById: (req, res) => {
    conn.query("Select * from lawsuit where id = ? ", req.params.id,
    (err, results, fields) => {
      if (err) res.send(err)
      res.send(results);
    })
  }
}