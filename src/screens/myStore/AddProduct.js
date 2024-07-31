import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { createOneProduct } from "../../apis/products";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as DocumentPicker from "expo-document-picker";
import ImagePickerComp from "../../components/ImagePicker";
import Header from "../../components/Header";

const AddProduct = () => {
  const [productInfo, setProductInfo] = useState({
    title: "",
    price: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigation = useNavigation();

  const { mutate } = useMutation({
    mutationKey: ["createOneProduct"],
    mutationFn: () => createOneProduct({ ...productInfo, image, pdf }),
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

  console.log(pdf);

  const handleChange = (key, value) => {
    setProductInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handlePickPdf = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPdf(result.assets[0]);
    }
  };

  const handleSubmit = () => {
    mutate();
  };

  return (
    <View style={styles.container}>
      <Header title="Back to store" />
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{alertMessage}</Text>
          </View>
        </View>
      </Modal>

      <View style={styles.innerContainer}>
        <KeyboardAwareScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.imagePickerContainer}>
            <ImagePickerComp setImage={setImage} image={image} />
          </View>
          <TouchableOpacity
            style={styles.pickFileButton}
            onPress={handlePickPdf}
          >
            <Text style={styles.buttonText}>Pick PDF</Text>
          </TouchableOpacity>
          {pdf && <Text style={styles.pdfText}>Picked PDF: {pdf.name}</Text>}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Product Title</Text>
            <TextInput
              style={styles.input}
              value={productInfo?.title}
              onChangeText={(text) => handleChange("title", text)}
              placeholder="Enter product title"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Product Price</Text>
            <TextInput
              style={styles.input}
              value={productInfo?.price}
              onChangeText={(text) => handleChange("price", text)}
              placeholder="Enter product price"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Product Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={productInfo?.description}
              onChangeText={(text) => handleChange("description", text)}
              placeholder="Enter product description"
              multiline={true}
              blurOnSubmit={true}
            />
          </View>
          <TouchableOpacity
            style={[styles.pickFileButton, styles.addButton]}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Add Product</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
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
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  imagePickerContainer: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  scrollView: {
    borderTopEndRadius: 10,
    width: "100%",
  },
  scrollViewContent: {
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 30,
  },
  label: {
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 25,
    width: "100%",
    borderColor: "lightgray",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  pickFileButton: {
    backgroundColor: "#403a58", // Navy Blue
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  pdfText: {
    marginBottom: 10,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#FC533E", // Coral color
  },
});
