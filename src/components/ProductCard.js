import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  I18nManager,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../apis";
import Icon from "react-native-vector-icons/FontAwesome";

const isArabic = (text) => {
  const arabicPattern = /[\u0600-\u06FF]/;
  return arabicPattern.test(text);
};

const ProductCard = ({ _id, title, link, price, product }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("editProduct", { id: _id });
  };

  const isTitleArabic = isArabic(title);
  const isDescriptionArabic =
    product?.description && isArabic(product.description);
  const shouldFlipCard = isTitleArabic || isDescriptionArabic;

  return (
    <View
      style={{
        width: "100%",
        height: 180,
        padding: 10,
        paddingVertical: 2,
      }}
    >
      <TouchableOpacity
        onPress={handlePress}
        style={{
          flex: 35,
          borderRadius: 15,
          backgroundColor: "#fff",
          overflow: "hidden",
          flexDirection: shouldFlipCard ? "row-reverse" : "row",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          padding: 10,
        }}
      >
        <View
          style={{
            flex: 45,
            padding: 12,
          }}
        >
          <View
            style={{
              borderRadius: 8,
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: BASE_URL + "/" + link }}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "lightgray",
                resizeMode: "cover",
              }}
            />
          </View>
        </View>
        <View
          style={{
            flex: 65,
            padding: 10,
          }}
        >
          <View style={{ flex: 8, gap: 8 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "black",
                textAlign: shouldFlipCard ? "right" : "left",
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: "black",
                textAlign: shouldFlipCard ? "right" : "left",
              }}
            >
              {product?.description?.length > 30
                ? product?.description?.slice(0, 44) + "..."
                : product?.description}
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              alignItems: shouldFlipCard ? "flex-start" : "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "700", color: "gray" }}>
              {price} {shouldFlipCard ? "دك" : "KD"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;
