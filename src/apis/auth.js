import instance from ".";
import { storeToken } from "./storage";

const register = async (userInfo) => {
  try {
    const { data } = await instance.post("/creator/register", userInfo);
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
  } catch (error) {
    console.log(error);
  }
};

const getProfile = async (userInfo) => {
  try {
    const { data } = await instance.get("/creator/profile", userInfo);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateProfile = async (userInfo, image) => {
  try {
    if (image) {
      const formData = new FormData();

      for (let key in userInfo) {
        formData.append(key, userInfo[key]);
      }

      const { data } = await instance.put("/creator/profile/", formData);
      return data;
    } else {
      const { data } = await instance.put("/creator/profile/", userInfo);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export { register, getProfile, updateProfile, login };
