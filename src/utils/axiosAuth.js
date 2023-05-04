import axios from "axios";

const authAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const regularAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export { authAxios, regularAxios };
