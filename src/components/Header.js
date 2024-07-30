import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Header({
  title = "Back",
  backgroundColor = "transparent",
}) {
  const navigation = useNavigation();
  return (
    <View style={[styles.header, { backgroundColor: backgroundColor }]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#574EFA" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}> {title} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
});
