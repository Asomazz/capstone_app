import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Header({
  title = "Back",
  backgroundColor = "transparent",
  isDark = false,
}) {
  const navigation = useNavigation();
  return (
    <View style={[styles.header, { backgroundColor: backgroundColor }]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color={isDark ? "#fff" : "#574EFA"} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: isDark ? "#fff" : "#333" }]}>
        {title}
      </Text>
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
    marginLeft: 10,
  },
});
