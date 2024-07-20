import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../apis/auth";
import * as Clipboard from "expo-clipboard";

const Link = () => {
  const { data: userInfo } = useQuery({
    queryKey: ["getProfile"],
    queryFn: getProfile,
  });

  const handleCopy = async (text) => {
    await Clipboard.setStringAsync(text);
    Alert.alert("Link Copied to Clipboard");
  };

  return (
    <View
      style={{
        height: 75,
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        gap: 20,
      }}
    >
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{
            height: 30,
            width: 360,
            borderColor: "gray",
            backgroundColor: "#A8A3FF",
            borderWidth: 0.3,
            padding: 5,
            borderRadius: 10,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "start",
          }}
          onPress={() => handleCopy(`https://fluid.link/${userInfo?.username}`)}
        >
          <Text style={{ fontSize: 15, fontWeight: 500, color: "white" }}>
            https://fluid.link/{userInfo?.username}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: "start",
          flex: 1,
          height: 30,
          width: 360,
          padding: 5,
        }}
      >
        <Text style={{ fontSize: 10 }}>
          This is your unique link! click on it to copy and use it in your bio
        </Text>
      </View>
    </View>
  );
};

export default Link;
