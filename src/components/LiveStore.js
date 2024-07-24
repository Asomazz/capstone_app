import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import supabase from "../apis/supabaseClient";

const LiveStore = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: fetchedData, error } = await supabase
      .from("Products")
      .select("*");

    if (error) {
      console.error("Error:", error);
    } else {
      setData(fetchedData);
    }
  };

  return (
    <View>
      {data.map((product) => (
        <Text key={product.id}>{product.title}</Text>
      ))}
    </View>
  );
};

export default LiveStore;

const styles = StyleSheet.create({});
