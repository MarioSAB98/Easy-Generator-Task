import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const signup = (data: { email: string; name: string; password: string }) =>
  API.post("/auth/signup", data);

export const login = (data: { email: string; password: string }) =>
  API.post("/auth/login", data);

export const logout = () => API.post("/auth/logout");