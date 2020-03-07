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
        stripeEmail: 'stripeEmail',
        stripeToken: token,
        stripeAmt: 'total'
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
