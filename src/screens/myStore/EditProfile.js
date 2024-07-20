import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getProfile, updateProfile } from "../../apis/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import Foundation from "react-native-vector-icons/Foundation"; //social-snapchat
import Entypo from "react-native-vector-icons/Entypo"; //instagram //twitter

const EditProfile = () => {
  const [userInfo, setUserInfo] = useState({ image: "", name: "", bio: "" });
  const navigation = useNavigation();

  const { data } = useQuery({
    queryKey: ["getProfile"],
    queryFn: getProfile,
  });

  const { mutate } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: () => updateProfile(userInfo),
    onSuccess: () => {
      Alert.alert(
        "Profile Updated",
        "Your profile has been updated successfully!"
      );
      navigation.navigate("myStore");
    },
    onError: () => {
      Alert.alert("Error", "There was an error updating your profile.");
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
            // source={userInfo?.image}
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
            value={userInfo?.name}
            onChangeText={(text) => handleChange("name", text)}
            placeholder={userInfo.name}
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
            value={userInfo?.bio}
            onChangeText={(text) => handleChange("bio", text)}
            placeholder={userInfo.bio}
          />
        </View>
        <View
          style={{
            backgroundColor: "white",
            flex: 2,
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            social media??
          </Text>
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
            <Text style={{ color: "white" }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EditProfile;
