import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Profile from "../../components/Profile";
import Link from "../../components/Link";

import { getProfile } from "../../apis/auth";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import ProductsList from "../../components/ProductsList";
import { SearchBar } from "react-native-elements";
import { getAllProducts, getProduct } from "../../apis/products";
import { useQuery } from "@tanstack/react-query";

const MyStore = () => {
  const [query, setQuery] = useState("");

  const navigation = useNavigation();

  const { data: products, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const { data: userInfo, refetch: userRefetch } = useQuery({
    queryKey: ["getCreatorLink"],
    queryFn: getProfile,
  });

  const handleGoToAddProduct = () => {
    navigation.navigate("addProduct");
  };

  const handleChange = (text) => {
    setQuery(text);
  };

  const filteredProducts = products
    ?.sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    })
    .filter((product) => {
      return product.title.toLowerCase().includes(query.toLowerCase());
    });

  return (
    <View style={styles.container}>
      <ScrollView stickyHeaderIndices={[1]} contentContainerStyle={{ gap: 8 }}>
        <View style={{ borderRadius: 12, overflow: "hidden" }}>
          <Link userInfo={userInfo} />
          <Profile userInfo={userInfo} refetch={userRefetch} />
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              paddingHorizontal: 20,
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 6,
            }}
          >
            <View style={{ flex: 7 }}>
              <SearchBar
                placeholder="Search..."
                onChangeText={handleChange}
                lightTheme
                containerStyle={{
                  backgroundColor: "transparent",
                  borderWidth: 0,
                  padding: 0,
                }}
                round={true}
                inputContainerStyle={{
                  borderRadius: 10,
                }}
                value={query}
              />
            </View>
            <View style={{ flex: 3 }}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleGoToAddProduct}
              >
                <Text style={styles.addButtonText}>+ Add A Product</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ProductsList data={filteredProducts} refetch={refetch} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
    justifyContent: "flex-start",
    gap: 5,
  },

  addButton: {
    borderColor: "gray",
    backgroundColor: "#342B7F",
    borderWidth: 0.3,
    padding: 5,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: "500",
    color: "white",
  },
});

export default MyStore;
