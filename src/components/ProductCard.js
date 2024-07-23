import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../apis";
import Icon from "react-native-vector-icons/FontAwesome";

const ProductCard = ({ _id, title, link, price }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("editProduct", { id: _id });
  };
  console.log(link);
  return (
    <View
      style={{
        width: "100%",
        height: 170,
      }}
    >
      <TouchableOpacity
        onPress={handlePress}
        style={{
          flex: 1,
          borderRadius: 15,
          backgroundColor: "#C9C7FA",
          overflow: "hidden",
        }}
      >
        {/* <Icon
        name="pencil"
        size={20}
        color="#000"
        style={{
          marginLeft: 30,
          marginBottom: 30,
          overflow: "hidden",
        }}
      /> */}
        <View style={{ flex: 6 }}>
          <Image
            source={{ uri: BASE_URL + "/" + link }}
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "lightgray",
            }}
          />
        </View>
        <View
          style={{
            flex: 2,
            paddingHorizontal: 10,
            paddingVertical: 10,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: 700, color: "white" }}>
            {title}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: 900, color: "white" }}>
            {price} KD
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;
