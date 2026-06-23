import axios from "axios";

const api = axios.create({
  baseURL: "http://13.222.155.100:8000",
});

export default api;