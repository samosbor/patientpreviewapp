import axios from 'axios'

const base =
  process.env.NODE_ENV === 'production'
    ? 'https://api.patientpreviewapp.com'
    : 'http://localhost:3000'

export default {
  async attemptPayment(token) {
    let res = axios
      .post(
        `${base}/attemptPayment`,
        {
          stripeToken: token
        },
        {
          headers: {
            Authorization: 'application/json'
          }
        }
      )
    return res.data
  },
  async getPlan(planId) {
    let res = axios
      .post(`${base}/getPlan`,
        {
          planId
        }
      )
    return res
  },
  async getProduct(productId) {
    let res = axios
      .post(`${base}/getProduct`,
        {
          productId
        }
      )
    return res
  }
}
