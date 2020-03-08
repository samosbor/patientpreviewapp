const auth = require('../auth')
const search = require('../controllers/searchController')
const lawsuit = require('../controllers/lawsuitController')
const user = require('../controllers/userController')
const account = require('../controllers/accountController')
const payment = require('../controllers/paymentController')

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

  app.post("/attemptSignup", async (req, res) => {
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
      const userId = await user.createUser(name, email, auth0Id)
      const accountId = await account.createAccount(company, customerId)
      const membershipId = await user.createMembership(userId, accountId, "Administrator")

      res.send(email)
    } catch(err) {
      console.log(err)
      res.status(400).send(err)
    }
  })
}