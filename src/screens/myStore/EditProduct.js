import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteProduct, getProduct, updateProduct } from "../../apis/products";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ImagePickerComp from "../../components/ImagePicker";

const EditProduct = () => {
  const route = useRoute();
  const { id } = route.params;
  const [productInfo, setProductInfo] = useState({
    title: "",
    price: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const navigation = useNavigation();

  const { data, isLoading } = useQuery({
    queryKey: ["getProduct", id],
    queryFn: () => getProduct(id),
  });

  const { mutate: updateProductMutate } = useMutation({
    mutationKey: ["updateProduct"],
    mutationFn: () => {
      updateProduct({ ...productInfo, image: image || data?.image }, id);
    },

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
      console.log(`I am useeffect , ${data.price}`);
      setProductInfo({
        title: data.title,
        price: data.price,
        description: data.description,
      });
      setImage(data.image);
    }
  }, [data]);

  const handleChange = (key, value) => {
    console.log("first");
    setProductInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdate = () => {
    if (!productInfo.price) return Alert.alert("please add a price");
    updateProductMutate();
  };

  const handleDelete = () => {
    setDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    deleteProductMutate(id);
    setDeleteModalVisible(false);
  };

  const cancelDelete = () => {
    setDeleteModalVisible(false);
  };

  if (isLoading) return <Text>Loading...</Text>;

  console.log(data);
  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{alertMessage}</Text>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to delete this product?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={cancelDelete}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonConfirm]}
                onPress={confirmDelete}
              >
                <Text style={styles.textStyle}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.innerContainer}>
        <View style={styles.imagePickerContainer}>
          <ImagePickerComp setImage={setImage} image={image} />
        </View>
        <KeyboardAwareScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Product Title</Text>
            <TextInput
              style={styles.input}
              value={productInfo?.title}
              onChangeText={(text) => handleChange("title", text)}
              defaultValue={data?.title}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Product Price</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => handleChange("price", text)}
              value={`${productInfo?.price}`}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Product Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              defaultValue={data?.description}
              onChangeText={(text) => handleChange("description", text)}
              value={productInfo?.description}
              multiline={true}
              blurOnSubmit={true}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.updateButton}
              onPress={handleUpdate}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default EditProduct;

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
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonConfirm: {
    backgroundColor: "#FF0000",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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
    backgroundColor: "blue",
    flex: 4,
    width: 300,
    height: 300,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 50,
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
    borderRadius: 7,
    width: "100%",
    borderColor: "lightgray",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  buttonsContainer: {
    flex: 2.5,
    paddingTop: 12,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  updateButton: {
    backgroundColor: "#574EFA",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: 300,
    height: 45,
  },
  deleteButton: {
    backgroundColor: "#FF6F6F",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: 300,
    height: 45,
  },
  buttonText: {
    color: "white",
  },
});
