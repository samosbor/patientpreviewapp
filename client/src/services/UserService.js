import axios from 'axios'

const base =
  process.env.NODE_ENV === 'production'
    ? 'https://api.patientpreviewapp.com'
    : 'http://localhost:3000'

export default {
  async getUserData(accessToken, id) {
    const res = await axios.post(
      `${base}/getuserdata`,
      {
        id
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
    // Assuming only one company per user. Start here if we ever change that.
    return res.data[0]
  },
  async updateUserName(accessToken, name) {
    const res = await axios.post(
      'fix this please/getuserdata',
      {
        name
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
    return res.data
  },
  async getCompanyUsers(accessToken, companyName) {
    const res = await axios.post(
      `${base}/getcompanyusers`,
      {
        companyName
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
    return res.data
  },
  async attemptSignup(email, name, company, password, source, planId) {
    const res = await axios.post(
      `${base}/attemptSignup`,
      {
        email: email,
        name: name,
        company: company,
        password: password,
        source: source,
        planId: planId
      },
      {
        headers: {
          Authorization: 'application/json'
        }
      }
    )
    return res.data
  }
}
