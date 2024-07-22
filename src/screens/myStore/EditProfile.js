import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getProfile, updateProfile } from "../../apis/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";

const EditProfile = () => {
  const [userInfo, setUserInfo] = useState({ image: "", name: "", bio: "" });
  const [modalVisible, setModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigation = useNavigation();

  const { data } = useQuery({
    queryKey: ["getMyProfile2"],
    queryFn: getProfile,
  });

  const { mutate } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: () => updateProfile(userInfo),
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
    },
  });

  useEffect(() => {
    if (data) {
      setUserInfo(data);
    }

    const requestPermission = async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    };

    requestPermission();
  }, [data]);

  const handleChange = (key, value) => {
    setUserInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleChooseImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUserInfo((prev) => ({ ...prev, image: result.uri }));
    }
  };

  const handleSubmit = () => {
    mutate(userInfo);
  };

  return (
    <View style={{ flex: 1, borderRadius: 10, padding: 5 }}>
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
            <Text style={{ marginBottom: 15, textAlign: "center" }}>
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
            flex: 2,
            width: 100,
            height: 100,
            borderRadius: 50,
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
            source={{ uri: userInfo.image || "default-image-uri" }}
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
          <TouchableOpacity onPress={handleChooseImage}>
            <Text style={{ fontSize: 12, color: "#574EFA" }}>
              Change picture
            </Text>
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
            value={userInfo.name}
            onChangeText={(text) => handleChange("name", text)}
            placeholder="Enter your name"
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
            value={userInfo.bio}
            onChangeText={(text) => handleChange("bio", text)}
            placeholder="Enter your bio"
          />
        </View>
        <View
          style={{
            flex: 2,
            backgroundColor: "white",
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
            paddingTop: 12,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Social Media??
          </Text>
        </View>
        <View
          style={{
            flex: 2.5,
            backgroundColor: "white",
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
