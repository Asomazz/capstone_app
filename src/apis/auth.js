import instance from ".";
import { storeToken } from "./storage";

const register = async (userInfo) => {
  try {
    const { data } = await instance.post("/creator/register/", userInfo);
    storeToken(data.token);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const login = async (userInfo) => {
  try {
    const { data } = await instance.post("/creator/login/", userInfo);
    if (data.token) {
      storeToken(data.token);
    }
    return data.token;
  } catch (error) {
    console.log(error);
  }
};

const getProfile = async () => {
  try {
    const { data } = await instance.get("/creator/profile/");
    return data;
  } catch (error) {
    console.log(error);
  }
};
const updateProfile = async (userInfo) => {
  try {
    const formData = new FormData();

    for (let key in userInfo) {
      if (key === "image" && userInfo[key]) {
        formData.append(key, {
          uri: userInfo[key],
          name: "image",
          type: "png",
        });
      } else {
        formData.append(key, userInfo[key]);
      }
    }

    const { data } = await instance.put("/creator/profile/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

const logout = () => {
  localStorage.removeItem("token");
};

export { getProfile, login, register, logout, updateProfile };
