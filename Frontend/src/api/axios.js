import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP__URL,
  withCredentials: true,
});

export default api;
