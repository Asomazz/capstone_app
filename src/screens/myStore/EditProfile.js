import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getProfile, updateProfile } from "../../apis/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import AntDesign from "react-native-vector-icons/AntDesign"; //instagram //twitter
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; //snapchat
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"; //x-twitter
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ImagePickerComp from "../../components/ImagePicker";

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
            width: 115,
            aspectRatio: 1,
            borderRadius: 100,
            overflow: "hidden",
            elevation: 50,
            justifyContent: "center",
            alignItems: "center",
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
              paddingHorizontal: 30,
              paddingVertical: 5,
              gap: 5,
            }}
          >
            <Text style={{ fontWeight: "500" }}>Name</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 7,
                width: "100%",
                borderColor: "lightgray",
                paddingVertical: 10,
                paddingHorizontal: 5,
              }}
              value={userInfo?.name}
              onChangeText={(text) => handleChange("name", text)}
              placeholder="Enter your name"
            />
          </View>
          <View
            style={{
              flex: 2.5,
              justifyContent: "center",
              width: "100%",
              alignItems: "flex-start",
              paddingHorizontal: 30,
              paddingVertical: 5,
              gap: 5,
            }}
          >
            <Text style={{ fontWeight: "500" }}>Bio</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 7,
                width: "100%",
                height: 100,
                borderColor: "lightgray",
                paddingVertical: 10,
                paddingHorizontal: 5,
                textAlignVertical: "top",
              }}
              multiline={true}
              blurOnSubmit={true}
              value={userInfo?.bio}
              onChangeText={(text) => handleChange("bio", text)}
              placeholder="Who are you? talk about yourself briefly"
            />
          </View>
          <View
            style={{
              flex: 3,
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "center",
              paddingHorizontal: 30,
              paddingVertical: 5,
              gap: 5,
            }}
          >
            <Text style={{ fontWeight: "500" }}>Social Media Accounts</Text>
            <View
              style={{
                flex: 2.5,
                justifyContent: "flex-end",
                width: 333,
                alignItems: "center",
                paddingHorizontal: 30,
                gap: 5,
                flexDirection: "row",
              }}
            >
              <AntDesign
                name="instagram"
                size={25}
                color="#342B7F"
                style={{ marginLeft: 7 }}
              />
              <TextInput
                style={{
                  borderWidth: 1,
                  borderRadius: 7,
                  width: "100%",
                  borderColor: "lightgray",
                  paddingVertical: 10,
                  paddingHorizontal: 5,
                }}
                value={userInfo?.instagram}
                onChangeText={(text) => handleChange("instagram", text)}
                placeholder="Paste URL here"
              />
            </View>
            <View
              style={{
                flex: 2.5,
                justifyContent: "flex-end",
                width: 333,
                alignItems: "center",
                paddingHorizontal: 30,
                gap: 5,
                flexDirection: "row",
              }}
            >
              <MaterialIcons
                name="snapchat"
                size={25}
                color="#342B7F"
                style={{ marginLeft: 7 }}
              />
              <TextInput
                style={{
                  borderWidth: 1,
                  borderRadius: 7,
                  width: "100%",
                  borderColor: "lightgray",
                  paddingVertical: 10,
                  paddingHorizontal: 5,
                }}
                value={userInfo?.snapchat}
                onChangeText={(text) => handleChange("snapchat", text)}
                placeholder="Paste URL here"
              />
            </View>
            <View
              style={{
                flex: 2.5,
                justifyContent: "flex-end",
                width: 333,
                alignItems: "center",
                paddingHorizontal: 30,
                gap: 5,
                flexDirection: "row",
              }}
            >
              <FontAwesome6
                name="x-twitter"
                size={25}
                color="#342B7F"
                style={{ marginLeft: 7 }}
              />
              <TextInput
                style={{
                  borderWidth: 1,
                  borderRadius: 7,
                  width: "100%",
                  borderColor: "lightgray",
                  paddingVertical: 10,
                  paddingHorizontal: 5,
                }}
                value={userInfo?.twitter}
                onChangeText={(text) => handleChange("twitter", text)}
                placeholder="Paste URL here"
              />
            </View>
            <View
              style={{
                flex: 2.5,
                justifyContent: "flex-end",
                width: 333,
                alignItems: "center",
                paddingHorizontal: 30,
                gap: 5,
                flexDirection: "row",
              }}
            >
              <MaterialIcons
                name="tiktok"
                size={25}
                color="#342B7F"
                style={{ marginLeft: 7 }}
              />
              <TextInput
                style={{
                  borderWidth: 1,
                  borderRadius: 7,
                  width: "100%",
                  borderColor: "lightgray",
                  paddingVertical: 10,
                  paddingHorizontal: 5,
                }}
                value={userInfo?.tiktok}
                onChangeText={(text) => handleChange("tiktok", text)}
                placeholder="Paste URL here"
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View
          style={{
            flex: 1,
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
            <Text style={{ color: "white" }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EditProfile;
