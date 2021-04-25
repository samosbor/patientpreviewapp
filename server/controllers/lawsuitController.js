var db = require('../db/db')

module.exports = {

  listAllLawsuits: (req, res) => {
    let stmt = db.prepare("Select * from lawsuit")
    let results = stmt.all()  
    res.send(results);
  },

  getLawsuitById: (req, res) => {
    let stmt = db.prepare("Select * from lawsuit where id = ? ")
    let results = stmt.get(req.params.id)
    res.send(results);
  }
}