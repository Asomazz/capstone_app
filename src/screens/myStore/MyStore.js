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
import { getAllProducts } from "../../apis/products";
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
      <ScrollView stickyHeaderIndices={[1]} contentContainerStyle={{}}>
        <View style={styles.headerContainer}>
          <Link userInfo={userInfo} />
          <Profile userInfo={userInfo} refetch={userRefetch} />
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchBarContainer}>
            <View style={styles.searchBar}>
              <SearchBar
                placeholder="Search..."
                onChangeText={handleChange}
                lightTheme
                containerStyle={styles.searchBarInputContainer}
                round={true}
                inputContainerStyle={styles.searchBarInput}
                value={query}
              />
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleGoToAddProduct}
            >
              <Text style={styles.addButtonText}>+ Add A Product</Text>
            </TouchableOpacity>
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
    justifyContent: "flex-start",
    gap: 5,
    backgroundColor: "#F7F7F7", // Light Gray
  },
  headerContainer: {
    overflow: "hidden",
    backgroundColor: "white",
  },
  searchContainer: {
    flex: 1,
  },
  searchBarContainer: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    backgroundColor: "white",
    padding: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  searchBar: {
    flex: 7,
  },
  searchBarInputContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
  },
  searchBarInput: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  addButton: {
    flex: 3,
    backgroundColor: "#403a58", // Navy Blue
    borderWidth: 0.3,
    padding: 10,
    borderRadius: 10,
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

