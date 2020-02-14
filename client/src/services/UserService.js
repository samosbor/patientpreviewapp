import axios from "axios"

let base = process.env.NODE_ENV === "production" ? "https://api.patientpreviewapp.com" : "http://localhost:3000"

export default {
  async getUserData(accessToken, id) {
    let res = await axios.post(base + "/getuserdata", {
        id: id,
      },
      {
      headers: {
          Authorization: `Bearer ${accessToken}`
      }
    });
    // Assuming only one company per user. Start here if we ever change that.
    return res.data[0];
  }
}