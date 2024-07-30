import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../apis/auth";
import UserContext from "../../context/UserContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import registerForPushNotificationsAsync from "../../utils/GetUserNotification";

const Register = () => {
  const [userInfo, setUserInfo] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [notificationToken, setNotificationToken] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const getNotificationToken = async () => {
      const notificationToken = await registerForPushNotificationsAsync();
      setNotificationToken(notificationToken);
    };
    getNotificationToken();
  }, []);

  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: () => register(userInfo, notificationToken),
    onSuccess: () => {
      setUser(true);
      navigation.navigate("dashboard");
    },
    onError: () => {
      Alert.alert("Registration Failed", "Please try again later.");
    },
  });

  const handleChange = (key, value) => {
    setUserInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
  };

  const handleSubmit = () => {
    if (userInfo.password !== confirmPassword) {
      Alert.alert("Passwords do not match!");
      return;
    }
    mutate(userInfo);
  };

  const handleGoToLogin = () => {
    navigation.navigate("login");
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea} />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Create Account</Text>
        </View>
        <KeyboardAwareScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.formContainer}>
            <Text style={styles.welcomeText}>Welcome to Fluid</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#B0B0B0"
                onChangeText={(text) => handleChange("email", text)}
                value={userInfo.email}
              />
              <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="Password"
                placeholderTextColor="#B0B0B0"
                onChangeText={(text) => handleChange("password", text)}
                value={userInfo.password}
              />
              <TextInput
                style={styles.input}
                secureTextEntry
                placeholder="Confirm Password"
                placeholderTextColor="#B0B0B0"
                onChangeText={handleConfirmPasswordChange}
                value={confirmPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#B0B0B0"
                onChangeText={(text) => handleChange("username", text)}
                value={userInfo.username}
              />
              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleSubmit}
              >
                <Text style={styles.registerButtonText}>Create Account</Text>
              </TouchableOpacity>
              <View style={styles.loginRedirect}>
                <Text style={styles.registerPrompt}>
                  Already have an account?{" "}
                </Text>
                <TouchableOpacity onPress={handleGoToLogin}>
                  <Text style={styles.loginLink}>Login here</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default Register;

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
    color: "", // Navy Blue
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
  registerButton: {
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
  registerButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginRedirect: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  registerPrompt: {
    color: "#333",
  },
  loginLink: {
    color: "#FB543C", // Coral color
    fontWeight: "bold",
  },
});
