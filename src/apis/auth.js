import instance from ".";
import { storeToken } from "./storage";

const register = async (userInfo) => {
  try {
    const { data } = await instance.post("/register", userInfo);
    storeToken(data.token);
    return data;
  } catch (error) {
    console.log(error);
  }
};
const login = async (userInfo) => {
  try {
    const { data } = await instance.post("/creator/login", userInfo);
    if (data.token) {
      storeToken(data.token);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
export { register, login };
