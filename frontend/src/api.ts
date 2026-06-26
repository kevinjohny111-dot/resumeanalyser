import axios from "axios";

const api = axios.create({
  baseURL: "http://13.220.97.216:8000",
});

export default api;