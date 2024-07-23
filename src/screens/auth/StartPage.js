import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import logo from "../../../assets/logo.png";

const StartPage = () => {
  const navigation = useNavigation();

  const handleGoToLogin = () => {
    navigation.navigate("login");
  };

  const handleGoToRegister = () => {
    navigation.navigate("register");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.subtitle}>Empower Your Creativity</Text>

        <TouchableOpacity
          style={[styles.button, styles.registerButton]}
          onPress={handleGoToRegister}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={handleGoToLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  logo: {
    width: 200,
    height: 200,
  },
  content: {
    flex: 2,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 30,
  },
  button: {
    width: "80%",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  registerButton: {
    backgroundColor: "#574EFA",
  },
  loginButton: {
    backgroundColor: "#50D2C2",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default StartPage;
