import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../apis/products";
import ProductCard from "./ProductCard";
import { useFocusEffect } from "@react-navigation/native";

const ProductsList = ({ data, refetch }) => {
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  return (
    <View
      style={{
        flex: 1,
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
              product={product}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ProductsList;
