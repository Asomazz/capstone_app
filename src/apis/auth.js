import instance from ".";
import * as SecureStore from "expo-secure-store";
import { getId, storeId, storeToken } from "./storage";

const register = async (userInfo) => {
  try {
    const { data } = await instance.post("/creator/register", userInfo);
    storeToken(data.token);
    storeId(data._id);
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

const getProfile = async (userInfo) => {
  try {
    const { data } = await instance.get("/creator/profile", userInfo);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateProfile = async (userInfo) => {
  try {
    const id = await getId();
    const { data } = await instance.put(`/creator/profile/${id}`, userInfo);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { register, getProfile, updateProfile, login };
