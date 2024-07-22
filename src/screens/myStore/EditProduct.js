import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteProduct, getProduct, updateProduct } from "../../apis/products";

const EditProduct = () => {
  const route = useRoute();
  const { id } = route.params;
  const [productInfo, setProductInfo] = useState({
    title: "",
    price: "",
  });
  const [image, setImage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigation = useNavigation();

  const { data } = useQuery({
    queryKey: ["getProduct", id],
    queryFn: () => getProduct(id),
  });

  const { mutate: updateProductMutate } = useMutation({
    mutationKey: ["updateProduct"],
    mutationFn: ({ productInfo, id, image }) =>
      updateProduct(productInfo, id, image),

    onSuccess: () => {
      setAlertMessage("Product Updated!");
      setModalVisible(true);
      setTimeout(() => {
        navigation.navigate("myStore");
      }, 500);
    },
    onError: () => {
      setAlertMessage("There was an error updating your product");
      setModalVisible(true);
    },
  });

  const { mutate: deleteProductMutate } = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      setAlertMessage("Product deleted!");
      setModalVisible(true);
      setTimeout(() => {
        navigation.navigate("myStore");
      }, 500);
    },
    onError: () => {
      setAlertMessage("There was an error deleting your product");
      setModalVisible(true);
    },
  });

  useEffect(() => {
    if (data) {
      setProductInfo({
        title: data.title,
        price: data.price,
        image: data.image,
      });
      setImage(data.image);
    }
  }, [data]);

  const handleChange = (key, value) => {
    setProductInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdate = () => {
    // Ensure image is only passed if it's valid
    const updateData = {
      productInfo,
      id,
      image: image && image !== "undefined" ? image : null, // Pass null if image is not valid
    };
    updateProductMutate(updateData);
  };

  const handleDelete = () => {
    deleteProductMutate(id);
  };

  return (
    <View
      style={{
        flex: 1,
        borderRadius: 10,
        padding: 5,
      }}
    >
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              margin: 20,
              width: 250,
              backgroundColor: "white",
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text
              style={{
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              {alertMessage}
            </Text>
          </View>
        </View>
      </Modal>

      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          borderRadius: 10,
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          padding: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "blue",
            flex: 6,
            width: 300,
            height: 300,
            borderRadius: 10,
            overflow: "hidden",
            elevation: 50,
          }}
        >
          <Image
            style={{
              backgroundColor: "gray",
              width: "100%",
              height: "100%",
            }}
            source={productInfo?.image}
          />
        </View>
        <View
          style={{
            backgroundColor: "white",
            flex: 0.5,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity>
            <Text style={{ fontSize: 12, color: "#574EFA" }}>Change image</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: 30,
            gap: 5,
          }}
        >
          <Text style={{ fontWeight: "500" }}>Product Title</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 7,
              width: "100%",
              borderColor: "lightgray",
              paddingVertical: 10,
              paddingHorizontal: 5,
            }}
            value={productInfo?.title}
            onChangeText={(text) => handleChange("title", text)}
            defaultValue={data?.title}
          />
        </View>
        <View
          style={{
            backgroundColor: "white",
            flex: 2,
            justifyContent: "center",
            width: "100%",
            alignItems: "flex-start",
            padding: 30,
            gap: 5,
          }}
        >
          <Text style={{ fontWeight: "500" }}>Product Price</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderRadius: 7,
              width: "100%",
              borderColor: "lightgray",
              paddingVertical: 10,
              paddingHorizontal: 5,
            }}
            defaultValue={data?.price}
            onChangeText={(text) => handleChange("price", text)}
            value={productInfo?.price}
          />
        </View>
        <View
          style={{
            flex: 2.5,
            backgroundColor: "white",
            paddingTop: 12,
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
            gap: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#574EFA",
              borderRadius: 7,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              width: 300,
              height: 45,
            }}
            onPress={handleUpdate}
          >
            <Text style={{ color: "white" }}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#FF6F6F",
              borderRadius: 7,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              width: 300,
              height: 45,
            }}
            onPress={handleDelete}
          >
            <Text style={{ color: "white" }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EditProduct;