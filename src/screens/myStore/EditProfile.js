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

const EditProfile = () => {
  const [userInfo, setUserInfo] = useState({
    image: "",
    name: "",
    bio: "",
    instagram: "",
    snapchat: "",
    twitter: "",
  });
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
  }, [data]);

  const handleChange = (key, value) => {
    setUserInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    mutate(userInfo);
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
            width: 115,
            height: 150,
            borderRadius: 100,
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
            // source={userInfo?.image}
          />
        </View>
        <View
          style={{
            flex: 0.5,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity>
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
            paddingHorizontal: 30,
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
            placeholder={userInfo.name}
          />
        </View>
        <View
          style={{
            flex: 2.5,
            justifyContent: "center",
            width: "100%",
            alignItems: "flex-start",
            paddingHorizontal: 30,
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
            gap: 5,
          }}
        >
          <Text style={{ fontWeight: "500" }}>Social Media Accounts</Text>
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
