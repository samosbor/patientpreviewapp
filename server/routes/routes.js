const auth = require('../auth')
const search = require('../controllers/searchController')
const lawsuit = require('../controllers/lawsuitController')
const user = require('../controllers/userController')
const account = require('../controllers/accountController')
const payment = require('../controllers/paymentController')

const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const userMiddleware = require('../middleware/users.js');

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.send(`Hi! Server is listening`);
  })

  app.post("/search", auth.checkJwt, (req, res) => {
    search.searchPatient(req, res)
  })

  app.get("/lawsuit/:id", auth.checkJwt, (req, res) => {
    lawsuit.getLawsuitById(req, res)
  })

  app.post("/getuserdata", auth.checkJwt, (req, res) => {
    user.getUserData(req, res)
  })

  app.post("/getcompanyusers", auth.checkJwt, (req, res) => {
    user.getCompanyUsers(req, res)
  })

  app.post("/attemptSignup", userMiddleware.validateRegister, async (req, res) => {
    const email = req.body.email
    const name = req.body.name
    const company = req.body.company
    const password = req.body.password
    const source = req.body.source
    const planId = req.body.planId

    try{
      const customerId = await payment.createCustomer(email, source, company, res)
      const subscription = await payment.subscribeCustomerToPlan(customerId, planId, res)
      const auth0Id = await user.createAuth0User(email, name, password, res)
      await user.giveAuth0Access(auth0Id)
      const userId = await user.createUser(name, email, auth0Id)
      await user.createLogin(userId, email, password)
      const accountId = await account.createAccount(company, customerId)
      const membershipId = await user.createMembership(userId, accountId, "Administrator")

      res.send(email)
    } catch(err) {
      console.log(err)
      res.status(400).send(err)
    }
  })

  app.post('/login', (req, res) => {
    user.login(req, res)
  })

  app.post("/createCompanyUser", userMiddleware.validateRegister, async (req, res) => {
    const email = req.body.email
    const name = req.body.name
    const accountId = req.body.accountId
    const password = req.body.password
    const role = req.body.role

    try {
      const userId = await user.createUser(name, email)
      await user.createLogin(userId, email, password)
      const membershipId = await user.createMembership(userId, accountId, role)
      res.send(userId)
    } catch(err) {
      console.log(err)
      res.status(400).send(err)
    }
  })

  app.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
    console.log(req.userData);
    res.send('This is the secret content. Only logged in users can see that!');
  })

}