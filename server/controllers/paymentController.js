const conn = require('../db/db')
const stripe = require("stripe")("sk_test_WIJW1ylS8sqogFxmKA9ltsmL00e11EvfNU");

module.exports = {
  createCustomer: async (email, source, company, res) => {
    const customerId = await stripe.customers.create({
        email: email,
        name: company,
        source: source,
    })
    .then(customer => {
      return customer.id;
    })
    .catch(err =>{
      res.status(err.statusCode).send(err.code)
      throw err
    })
    return customerId
  },

  subscribeCustomerToPlan: async (customerId, planId, res) => {
    const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{plan: planId}],
    })
    .then(subscription => {
      return subscription
    })
    .catch(err =>{
      res.status(err.statusCode).send(err.code)
      throw err
    })
    return subscription
  }
}