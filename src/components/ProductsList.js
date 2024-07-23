import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../apis/products";
import ProductCard from "./ProductCard";
import { useFocusEffect } from "@react-navigation/native";

const ProductsList = () => {
  const { data, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
  });
  console.log(data);
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        borderColor: "gray",
        elevation: 50,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 10,
        }}
      >
        {data?.map((product) => {
          return (
            <ProductCard
              key={product._id}
              _id={product._id}
              title={product.title}
              price={product.price}
              link={product.image}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ProductsList;
