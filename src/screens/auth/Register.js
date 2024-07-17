import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Login from "./Login";

const Register = () => {
  const navigation = useNavigation();
  const handleGoToLogin = () => {
    navigation.navigate("login");
  };

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Button onPress={handleGoToLogin} />
      <Text>Register</Text>
    </View>
  );
};

export default Register;
