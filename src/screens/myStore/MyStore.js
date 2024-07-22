import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Profile from "../../components/Profile";
import Link from "../../components/Link";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../apis/auth";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import ProductsList from "../../components/ProductsList";

const MyStore = () => {
  const navigation = useNavigation();

  const handleGoToAddProduct = () => {
    navigation.navigate("addProduct");
  };
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
      <ScrollView stickyHeaderIndices={[2]}>
        <Link />
        <Profile />
        <View style={{}}>
          <TouchableOpacity
            style={{
              height: 40,
              borderColor: "gray",
              backgroundColor: "#342B7F",
              borderWidth: 0.3,
              padding: 5,
              borderRadius: 10,
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleGoToAddProduct}
          >
            <Text style={{ fontSize: 15, fontWeight: 500, color: "white" }}>
              + Add A Product
            </Text>
          </TouchableOpacity>
        </View>
        <ProductsList />
      </ScrollView>
    </View>
  );
};

export default MyStore;
