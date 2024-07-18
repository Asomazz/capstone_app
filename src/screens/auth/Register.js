import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Login from "./Login";
import logo from "../../../assets/logo.png";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../apis/auth";
import UserContext from "../../context/UserContext";

const Register = () => {
  const [userInfo, setUserInfo] = useState({});
  const [user, setUser] = useContext(UserContext);

  const navigation = useNavigation();

  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: () => register(userInfo),
    onSuccess: () => {
      setUser(true);
      navigation.navigate("mainNavigation");
    },
  });

  const handleChange = (key, value) => {
    setUserInfo((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(userInfo);
  };

  const handleGoToLogin = () => {
    navigation.navigate("login");
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 3,
          justifyContent: "center",
          alignItems: "flex-start",
          padding: 20,
          backgroundColor: "#574EFA",
          overflow: "hidden",
        }}
      >
        {/* <Image
          style={{ width: "50%", height: "50%" }}
          source={require("../../../assets/logo.png")}
        /> */}
        <Text style={{ fontSize: 30, color: "white" }}>Create Account</Text>
      </View>
      <View
        style={{
          flex: 10,
          justifyContent: "space-evenly",
          borderRadius: 90,
          width: "100%",
          alignItems: "center",
        }}
      >
        <View style={{ padding: 45, width: 380 }}>
          <Text style={{ fontWeight: "500" }}>Email</Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: "lightgray",
              paddingVertical: 10,
            }}
            value={userInfo.email}
            onChangeText={(text) => handleChange("email", text)}
            placeholder="Enter your email"
          />
          <Text style={{ paddingTop: 20, fontWeight: "500" }}>Password</Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: "lightgray",
              paddingVertical: 10,
            }}
            secureTextEntry
            onChangeText={(text) => handleChange("password", text)}
            value={userInfo.password}
            placeholder="Enter your password"
          />
          <Text style={{ paddingTop: 20, fontWeight: "500" }}>
            Confirm your password
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: "lightgray",
              paddingVertical: 10,
            }}
            secureTextEntry
            onChangeText={(text) => handleChange("password", text)}
            value={userInfo.password}
            placeholder="Re-Enter your password"
          />
          <Text style={{ paddingTop: 20, fontWeight: "500" }}>
            Now choose your username
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: "lightgray",
              paddingVertical: 10,
            }}
            onChangeText={(text) => handleChange("username", text)}
            value={userInfo.username}
            placeholder="This will be shown in your link"
          />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#574EFA",
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              width: 300,
              height: 45,
            }}
            onPress={handleSubmit}
          >
            <Text style={{ color: "white" }}>Create Account</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", paddingTop: 20 }}>
            <Text>Already have an account? </Text>
            <TouchableOpacity title="Go to Login" onPress={handleGoToLogin}>
              <Text style={{ color: "#574EFA" }}>Login here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Register;
