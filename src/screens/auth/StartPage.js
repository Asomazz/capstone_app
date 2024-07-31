import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
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
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Welcome to Fluid Store</Text>
          <Text style={styles.subtitle}>Sell smart, grow fast.</Text>

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

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            All rights reserved to Fluid Store, 2024
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#403a58", // Navy Blue
  },
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7", // Light Gray
    justifyContent: "space-between", // Align items vertically
  },
  header: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#403a58", // Navy Blue
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  logo: {
    width: 120,
    height: 120,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // Center buttons vertically
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#403a58", // Navy Blue
    marginTop: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#403a58",
    marginTop: 5,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    width: "80%",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  registerButton: {
    backgroundColor: "#FC533E", // Coral color
  },
  loginButton: {
    backgroundColor: "#403a58", // Navy Blue
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#F7F7F7", // Light Gray, same as the container background
  },
  footerText: {
    color: "#666",
    fontSize: 14,
  },
});

export default StartPage;
