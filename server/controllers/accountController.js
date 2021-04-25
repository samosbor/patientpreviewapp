const db = require('../db/db')
const { v4: uuid } = require('uuid')

module.exports = {

  createAccount: async (company, customerId) => {
    const id = uuid()
    let sql = db.prepare(`INSERT INTO account
      (id,
      name,
      stripeCustomer_id)
      VALUES
      (?, ?, ?)`)
    const rows = sql.run(id, company, customerId)
    return id
  }
}