import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../apis/auth";

const Link = () => {
  const { data: userInfo } = useQuery({
    queryKey: ["getProfile"],
    queryFn: getProfile,
  });

  return (
    <View
      style={{
        height: 100,
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderColor: "gray",
        borderWidth: 0.5,
      }}
    >
      <TouchableOpacity
        style={{
          width: 360,
          borderColor: "gray",
          borderWidth: 1,
          padding: 5,
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <Text>https://fluid.link/{userInfo?.username}</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 10 }}>
        This is your unique link! copy it and use it in your bio
      </Text>
    </View>
  );
};

export default Link;
