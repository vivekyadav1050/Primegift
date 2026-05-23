import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // withCredentials: true
});

// Automatically attach token
API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Auto logout if token invalid
API.interceptors.response.use(
  (response) => response,

  (error) => {

    if (error.response?.status === 401) {

      localStorage.removeItem("token");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;