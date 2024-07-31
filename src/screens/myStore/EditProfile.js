import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getProfile, updateProfile } from "../../apis/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import AntDesign from "react-native-vector-icons/AntDesign"; //instagram
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; //snapchat
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"; //x-twitter
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ImagePickerComp from "../../components/ImagePicker";
import Header from "../../components/Header";

const EditProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    bio: "",
    instagram: "",
    snapchat: "",
    twitter: "",
    tiktok: "",
  });
  const [image, setImage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigation = useNavigation();

  const { data } = useQuery({
    queryKey: ["getMyProfile2"],
    queryFn: getProfile,
  });

  const { mutate } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: () =>
      updateProfile({
        ...userInfo,
        image: image.includes("file") ? image : "",
      }),
    onSuccess: () => {
      setAlertMessage("Profile Updated");
      setModalVisible(true);
      setTimeout(() => {
        navigation.navigate("myStore");
      }, 500);
    },
    onError: () => {
      setAlertMessage("There was an error updating your profile.");
      setModalVisible(true);
      setTimeout(() => {
        navigation.navigate("myStore");
      }, 500);
    },
  });

  useEffect(() => {
    if (data) {
      setUserInfo({
        name: data.name,
        bio: data.bio,
        instagram: data.instagram,
        snapchat: data.snapchat,
        twitter: data.twitter,
        tiktok: data.tiktok,
      });
      setImage(data.image);
    }
  }, [data]);

  const handleChange = (key, value) => {
    setUserInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    mutate();
  };

  return (
    <View style={styles.container}>
      <Header />
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{alertMessage}</Text>
          </View>
        </View>
      </Modal>

      <View style={styles.content}>
        <View style={styles.imagePickerContainer}>
          <ImagePickerComp setImage={setImage} image={image} />
        </View>

        <KeyboardAwareScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={userInfo?.name}
              onChangeText={(text) => handleChange("name", text)}
              placeholder="Enter your name"
            />
          </View>
          <View style={[styles.inputGroup, styles.bioGroup]}>
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, styles.bioInput]}
              multiline={true}
              blurOnSubmit={true}
              value={userInfo?.bio}
              onChangeText={(text) => handleChange("bio", text)}
              placeholder="Who are you? Talk about yourself briefly"
            />
          </View>

          <View style={styles.socialMediaGroup}>
            <Text style={styles.label}>Social Media Accounts</Text>
            <View style={styles.socialInputGroup}>
              <AntDesign
                name="instagram"
                size={25}
                color="#342B7F"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                value={userInfo?.instagram}
                onChangeText={(text) => handleChange("instagram", text)}
                placeholder="Paste URL here"
              />
            </View>
            <View style={styles.socialInputGroup}>
              <MaterialIcons
                name="snapchat"
                size={25}
                color="#342B7F"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                value={userInfo?.snapchat}
                onChangeText={(text) => handleChange("snapchat", text)}
                placeholder="Paste URL here"
              />
            </View>
            <View style={styles.socialInputGroup}>
              <FontAwesome6
                name="x-twitter"
                size={25}
                color="#342B7F"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                value={userInfo?.twitter}
                onChangeText={(text) => handleChange("twitter", text)}
                placeholder="Paste URL here"
              />
            </View>
            <View style={styles.socialInputGroup}>
              <MaterialIcons
                name="tiktok"
                size={25}
                color="#342B7F"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                value={userInfo?.tiktok}
                onChangeText={(text) => handleChange("tiktok", text)}
                placeholder="Paste URL here"
              />
            </View>
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    margin: 20,
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
  },
  content: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  imagePickerContainer: {
    width: 115,
    aspectRatio: 1,
    borderRadius: 100,
    overflow: "hidden",
    elevation: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    borderTopEndRadius: 10,
    width: "100%",
  },
  scrollContent: {
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  inputGroup: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 5,
    gap: 5,
  },
  bioGroup: {
    flex: 2.5,
  },
  label: {
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderRadius: 25,
    width: "100%",
    borderColor: "lightgray",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  bioInput: {
    height: 100,
    textAlignVertical: "top",
  },
  socialMediaGroup: {
    flex: 3,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingVertical: 5,
    gap: 5,
  },
  socialInputGroup: {
    flex: 2.5,
    justifyContent: "flex-end",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 30,
    gap: 5,
    flexDirection: "row",
  },
  icon: {
    marginLeft: 7,
  },
  submitButton: {
    backgroundColor: "#FC533E", // Coral color
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
    marginTop: 20, // Add some space between the social media inputs and the button
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EditProfile;
