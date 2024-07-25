import axios from "axios";

import { getToken } from "./storage";

// const BASE_URL = "http://192.168.0.4:8000";
const BASE_URL = "http://192.168.0.104:8000";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { BASE_URL };
export default instance;
