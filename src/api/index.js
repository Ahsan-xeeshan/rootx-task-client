import axios from "axios";

const baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8080/api/v1"
    : "https://rootx-task-manager.onrender.com/api/v1";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
