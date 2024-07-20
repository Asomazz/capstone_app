import * as SecureStore from "expo-secure-store";

const storeToken = async (token) => {
  await SecureStore.setItemAsync("token", token);
};

const storeId = async (id) => {
  await SecureStore.setItemAsync("id", id);
};

const getId = async () => {
  const id = await SecureStore.getItemAsync("id");
  return id;
};

const getToken = async () => {
  const token = await SecureStore.getItemAsync("token");
  return token;
};

const removeToken = async (token) => {
  await SecureStore.deleteItemAsync("token");
};

export { storeToken, getToken, removeToken, storeId, getId };
