const conn = require('../db/db')
const dotenv = require('dotenv')
dotenv.config()
const stripeKey = process.env.NODE_ENV === 'production' ? process.env.STRIPE_KEY : process.env.STRIPE_TEST_KEY
const stripe = require("stripe")(stripeKey)


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
  },

  getPlan: async (req, res) => {
    stripe.plans.retrieve(req.body.planId)
      .then(response => {
        res.send(response)
      })
      .catch(err => {
        res.status(400).send(err)
      })
  },

  getProduct: async (req, res) => {
    stripe.products.retrieve(req.body.productId)
      .then(response => {
        res.send(response)
      })
      .catch(err => {
        res.status(400).send(err)
      })
  }
}