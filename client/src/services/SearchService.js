import axios from "axios"

let base = process.env.NODE_ENV === "production" ? "https://api.patientpreviewapp.com" : "http://localhost:3000"

export default {
  async search(accessToken, name) {
    let res = await axios.post(base + "/search", {
        name: name,
      },
      {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return res.data;
  },
  async getLawsuit(accessToken, id) {
    let res = await axios.get(base + "/lawsuit/" + id,
      {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return res.data[0];
  }
}