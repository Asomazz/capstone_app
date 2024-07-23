import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { createOneProduct } from "../../apis/products";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import ImagePickerComp from "../../components/ImagePicker";

const AddProduct = () => {
  const [productInfo, setProductInfo] = useState({
    title: "",
    price: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigation = useNavigation();

  const { mutate } = useMutation({
    mutationKey: ["createOneProduct"],
    mutationFn: () => createOneProduct({ ...productInfo, image }),
    onSuccess: () => {
      setAlertMessage("Product Added!");
      setModalVisible(true);
      setTimeout(() => {
        navigation.navigate("myStore");
      }, 500);
    },
    onError: () => {
      setAlertMessage("There was an error adding your product");
      setModalVisible(true);
    },
  });

  const handleChange = (key, value) => {
    setProductInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    mutate();
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
            flex: 4,
            width: "85%",
            // height: 300,
            borderRadius: 10,
            overflow: "hidden",
            elevation: 50,
          }}
        >
          <ImagePickerComp setImage={setImage} image={image} />
        </View>
        <KeyboardAwareScrollView
          style={{
            borderTopEndRadius: 10,
            width: "100%",
          }}
          contentContainerStyle={{
            // flex: 10,
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
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
              placeholder={productInfo.title}
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
              value={productInfo?.price}
              onChangeText={(text) => handleChange("price", text)}
              placeholder={productInfo.price}
            />
          </View>
          <View
            style={{
              backgroundColor: "white",
              flex: 1,
              justifyContent: "center",
              width: "100%",
              alignItems: "flex-start",
              padding: 30,
            }}
          >
            <Text style={{ fontWeight: "500" }}>Product Description</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 7,
                width: "100%",
                height: 80,
                borderColor: "lightgray",
                paddingVertical: 10,
                paddingHorizontal: 5,
                textAlignVertical: "top",
              }}
              onChangeText={(text) => handleChange("description", text)}
              value={productInfo?.description}
              multiline={true}
              blurOnSubmit={true}
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
              onPress={handleSubmit}
            >
              <Text style={{ color: "white" }}>Add Product</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default AddProduct;
