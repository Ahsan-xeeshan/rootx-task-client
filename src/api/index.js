import axios from "axios";

const baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8080"
    : "https://rootx-task-backend.onrender.com";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
