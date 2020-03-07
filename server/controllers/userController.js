const conn = require('../db/db')
const auth = require('../auth')
const axios = require('axios')

module.exports = {

  getUserData: (req, res) => { 
    let sql = `SELECT account.name as "companyName",
      account.planLevel as "planLevel",
      membership.role as "role"
      FROM account JOIN user JOIN membership
      WHERE user.id = ?;`

    conn.query(sql, [req.body.id],
      (err, results, fields) => {
        if (err) res.status(400);
        res.send(results);
      }
    )
  },
  getCompanyUsers: (req, res) => {
    let sql = `SELECT user.id as 'userId',
      user.name as 'name',
      user.email as 'email',
      membership.role as 'role'
      FROM account INNER JOIN membership JOIN user
      WHERE account.name = ?;`
    
    conn.query(sql, [req.body.companyName],
      (err, results, fields) => {
        if (err) res.status(400);
        res.send(results);
      }
    )
  },
  createUser: async (email, name, password, res) => { //creates user in Auth0
    //get management token to 
    const user_id = await axios.post('https://' + auth.authConfig.domain + '/oauth/token',
    {
      client_id: auth.authConfig.client_id,
      client_secret: auth.authConfig.client_secret,
      audience: auth.authConfig.management_audience,
      grant_type: "client_credentials"
    },
    {
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(authResponse => {
      const accessToken = authResponse.data.access_token
      return axios.post('https://' + auth.authConfig.domain + '/api/v2/users',
      {
        email: email,
        name: name,
        password: password,
        connection: "Username-Password-Authentication"
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(userResponse => {
        return userResponse.data.user_id
      })
      .catch(err =>{
        throw err
      })
    })
    .catch(err => {
      res.status(err.response.data.statusCode).send(err.response.data)
      throw err
    })
    return user_id
  }
}