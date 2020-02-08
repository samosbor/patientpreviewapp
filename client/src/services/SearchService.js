import axios from "axios"

let base = process.env.NODE_ENV === "production" ? "https://api.patientpreviewapp.com" : "http://localhost:3000"

export default {
  async getEvents() {
    let res = await axios.get(base + "/events");
    return res.data;
  },
  async getEventSingle(eventId, accessToken) {
    let res = await axios.get(base + "/events/" + eventId, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return res.data;
  },
  async testSearch(accessToken) {
    let res = await axios.post(base + "/search", {
        name: "Erika Peay",
      },
      {
      headers: {
          Authorization: `Bearer ${accessToken}`
      }
    });
    return res.data;
  }
}