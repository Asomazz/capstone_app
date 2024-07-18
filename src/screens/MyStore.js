import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Profile from "../components/Profile";

const MyStore = () => {
  return (
    <View style={{ flex: 1 }}>
      <Profile />
    </View>
  );
};

export default MyStore;

const styles = StyleSheet.create({});
