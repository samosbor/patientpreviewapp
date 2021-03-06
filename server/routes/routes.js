const search = require('../controllers/searchController')
const lawsuit = require('../controllers/lawsuitController')
const user = require('../controllers/userController')
const account = require('../controllers/accountController')
const payment = require('../controllers/paymentController')

const userMiddleware = require('../middleware/users.js');

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.send(`Hi! Server is listening`);
  })

  app.post("/search", (req, res) => {
    search.searchPatient(req, res)
  })

  app.get("/lawsuit/:id", (req, res) => {
    lawsuit.getLawsuitById(req, res)
  })

  app.post("/getuserdata", userMiddleware.isLoggedIn, (req, res) => {
    user.getUserData(req, res)
  })

  app.post("/getcompanyusers", userMiddleware.isLoggedIn, (req, res) => {
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
      const userId = await user.createUser(name, email)
      await user.createLogin(userId, email, password)
      const accountId = await account.createAccount(company, customerId)
      const membershipId = await user.createMembership(userId, accountId, "Administrator")

      res.send(email)
    } catch(err) {
      console.log(err)
      res.status(err.status).send(err)
    }
  })

  app.post('/login', (req, res) => {
    user.login(req, res)
    .catch(err => {
      
    })
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

  app.post("/getPlan", async (req, res) => {
    payment.getPlan(req, res)
  })

  app.post("/getProduct", async (req, res) => {
    payment.getProduct(req, res)
  })

}