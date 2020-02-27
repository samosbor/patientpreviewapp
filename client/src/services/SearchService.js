import axios from 'axios'

const base =
  process.env.NODE_ENV === 'production'
    ? 'https://api.patientpreviewapp.com'
    : 'http://localhost:3000'

export default {
  async search(accessToken, name) {
    const res = await axios.post(
      `${base}/search`,
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
  async getLawsuit(accessToken, id) {
    const res = await axios.get(`${base}/lawsuit/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return res.data[0]
  }
}
