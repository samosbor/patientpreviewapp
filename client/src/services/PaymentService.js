import axios from 'axios'
import { createToken } from 'vue-stripe-elements-plus'

const base =
  process.env.NODE_ENV === 'production'
    ? 'https://api.patientpreviewapp.com'
    : 'http://localhost:3000'

export default {
  async attemptPayment() {
    const res = createToken().then(data => {
      console.log(data.token)
      axios
        .post(
          `${base}/attemptPayment`,
          {
            stripeEmail: 'stripeEmail',
            stripeToken: data.token.id,
            stripeAmt: 'total'
          },
          {
            headers: {
              Authorization: 'application/json'
            }
          }
        )
        .then(response => {
          console.log(response)
          return response
        })
        .catch(error => {
          console.log(error)
        })
    })
    return res.data
  }
}
