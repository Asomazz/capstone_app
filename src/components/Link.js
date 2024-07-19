import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const Link = (username) => {
  return (
    <View>
      <View
        style={{
          flex: 3,
          backgroundColor: "pink",
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
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
          <Text>https://fluid.link/{username}</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 10 }}>
          This is your unique link! copy it and use it in your bio
        </Text>
      </View>
    </View>
  );
};

export default Link;
