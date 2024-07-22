import instance from ".";
import * as SecureStore from "expo-secure-store";

const createOneProduct = async (productInfo) => {
  try {
    const formData = new FormData();
    for (let key in productInfo) {
      formData.append(key, productInfo[key]);
    }
    const { data } = await instance.post("/product/", formData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (productInfo, id) => {
  try {
    const formData = new FormData();
    for (let key in productInfo) {
      formData.append(key, productInfo[key]);
    }

    const { data } = await instance.put(`/product/${id}`, formData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getAllProducts = async () => {
  try {
    const { data } = await instance.get("/product/");
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getProduct = async (id) => {
  try {
    const { data } = await instance.get(`/product/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (id) => {
  try {
    const { data } = await instance.delete(`/product/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export {
  createOneProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
