const auth = require('../auth')
const search = require('../controllers/searchController')
const lawsuit = require('../controllers/lawsuitController')
const user = require('../controllers/userController')

let events = [
  {
    id: 1,
    name: "Charity Ball",
    category: "Fundraising",
    description:
      "Spend an elegant night of dinner and dancing with us as we raise money for our new rescue farm.",
    featuredImage: "https://placekitten.com/500/500",
    images: [
      "https://placekitten.com/500/500",
      "https://placekitten.com/500/500",
      "https://placekitten.com/500/500"
    ],
    location: "1234 Fancy Ave",
    date: "12-25-2019",
    time: "11:30"
  },
  {
    id: 2,
    name: "Rescue Center Goods Drive",
    category: "Adoptions",
    description:
      "Come to our donation drive to help us replenish our stock of pet food, toys, bedding, etc. We will have live bands, games, food trucks, and much more.",
    featuredImage: "https://placekitten.com/500/500",
    images: ["https://placekitten.com/500/500"],
    location: "1234 Dog Alley",
    date: "11-21-2019",
    time: "12:00"
  }
];

module.exports = function(app) {
  app.get("/events", (req, res) => {
    res.send(events);
  })

  app.get("/events/:id", auth.checkJwt, (req, res) => {
    const id = Number(req.params.id)
    const event = events.find(event => event.id === id)
    res.json(event)
  })

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
}