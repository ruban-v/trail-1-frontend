import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getAllUsers = () => API.get("/users");
export const getProfile = () => API.get("/user/profile");
export const deleteUser = (id) => API.delete(`/user/${id}`);
export const updateUser = (id, data) => API.put(`/user/${id}`, data);
