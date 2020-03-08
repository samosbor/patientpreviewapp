const conn = require('../db/db')
const { v4: uuid } = require('uuid')

module.exports = {

  createAccount: async (company, customerId) => {
    const id = uuid()
    let sql = `INSERT INTO account
      (id,
      name,
      stripeCustomer_id)
      VALUES
      (?, ?, ?)`
    const rows = await conn.promise().query(sql, [id, company, customerId])
      .then(([rows,fields]) => {
        return rows
      })
      .catch(err => {
        throw err
      })
    return id
  }
}