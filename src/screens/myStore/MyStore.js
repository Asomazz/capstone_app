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
  console.log(query);
  const navigation = useNavigation();

  const { data: products, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const handleGoToAddProduct = () => {
    navigation.navigate("addProduct");
  };

  const handleChange = (text) => {
    setQuery(text);
  };

  const filteredProducts = products?.filter((product) => {
    return product.title.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <ScrollView stickyHeaderIndices={[2]}>
        <Link />
        <Profile />
        <View style={styles.addButtonContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleGoToAddProduct}
          >
            <Text style={styles.addButtonText}>+ Add A Product</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Search For Your Product Here..."
            onChangeText={handleChange}
            lightTheme
            round
            value={query}
          />
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
  addButtonContainer: {
    flex: 1,
  },
  addButton: {
    height: 50,
    width: 370,
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
  searchContainer: {
    flex: 1,
  },
});

export default MyStore;
