import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { login } from "../../apis/auth";
import { useNavigation } from "@react-navigation/native";
import UserContext from "../../context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { TextInput } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Login = () => {
  const navigation = useNavigation();
  const [user, setUser] = useContext(UserContext);

  const [userInfo, setuserInfo] = useState({
    email: "",
    password: "",
  });

  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => login(userInfo),
    onSuccess: (data) => {

      if (!data || data.error) {
        Alert.alert("Login Failed", "The username or password is incorrect");
        return;
      }

      setUser(true);
      navigation.navigate("dashboard");
    },
    onError: () => {
      Alert.alert("Login Failed", "The username or password is incorrect");
    },
  });

  const handleSubmit = () => {
    mutate(userInfo);
  };

  const handleGoToRegister = () => {
    navigation.navigate("register");
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea} />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome Back!</Text>
        </View>
        <KeyboardAwareScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.formContainer}>
            <Text style={styles.welcomeText}>Sign in to continue</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#B0B0B0"
                onChangeText={(text) => {
                  setuserInfo({ ...userInfo, email: text });
                }}
              />
              <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="Password"
                placeholderTextColor="#B0B0B0"
                onChangeText={(text) => {
                  setuserInfo({ ...userInfo, password: text });
                }}
              />
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleSubmit}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
              <View style={styles.registerContainer}>
                <Text style={styles.registerPrompt}>
                  Don't have an account?{" "}
                </Text>
                <TouchableOpacity onPress={handleGoToRegister}>
                  <Text style={styles.registerText}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeArea: {
    flex: 0,
    backgroundColor: "#403a58", // Navy Blue
  },
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7", // Light Gray
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
  headerText: {
    fontSize: 34,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
  },
  formContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#403a58", // Navy Blue
  },
  inputContainer: {
    width: "100%",
    maxWidth: 400,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,
    color: "#333",
    backgroundColor: "#F9F9F9",
  },
  loginButton: {
    backgroundColor: "#403a58", // Coral color
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  registerPrompt: {
    color: "#333",
  },
  registerText: {
    color: "#FB543C", // Coral color
    fontWeight: "bold",
  },
});
