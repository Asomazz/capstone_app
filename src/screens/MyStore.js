import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Profile from "../components/Profile";
import Link from "../components/Link";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../apis/auth";
import Products from "../components/Products";

const MyStore = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 5,
        paddingVertical: 5,
        justifyContent: "flex-start",
        gap: 5,
      }}
    >
      <Link />
      <Profile />
      <Products />
    </View>
  );
};

export default MyStore;
