import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Billing() {
  return (
    <View>
      <Text>Billing</Text>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 30,
          width: 300,
          height: 250,
          backgroundColor: "grey",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>Creator</Text>
          <Text>KWD/Month</Text>
        </View>
        <Text>Billed Monthly</Text>
        <Text>Your trial expires on August 30, 2024 </Text>
      </View>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({});
