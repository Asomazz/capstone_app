import instance from ".";
import * as SecureStore from "expo-secure-store";
const createOneProduct = async (productInfo) => {
  try {
    const formData = new FormData();

    for (let key in productInfo) {
      if (key === "image" && productInfo[key]) {
        const localUri = productInfo[key];
        const filename = localUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        const response = await fetch(localUri);
        const blob = await response.blob();
        formData.append(key, {
          uri: localUri,
          name: filename,
          type: type,
        });
      } else {
        formData.append(key, productInfo[key]);
      }
    }

    const { data } = await instance.post("/product/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (productInfo, id) => {
  try {
    console.log(productInfo);
    const formData = new FormData();

    for (let key in productInfo) {
      if (key === "image" && productInfo[key]) {
        if (!productInfo[key].includes("media/")) {
          const localUri = productInfo[key];
          const filename = localUri.split("/").pop();
          const match = /\.(\w+)$/.exec(filename);
          const type = match ? `image/${match[1]}` : `image`;

          const response = await fetch(localUri);
          const blob = await response.blob();
          formData.append(key, {
            uri: localUri,
            name: filename,
            type: type,
          });
        }
      } else {
        formData.append(key, productInfo[key]);
      }
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
