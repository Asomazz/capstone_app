import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { login } from "../../apis/auth";
import { useNavigation } from "@react-navigation/native";
import UserContext from "../../context/UserContext";
import { useMutation } from "@tanstack/react-query";
import { TextInput } from "react-native-gesture-handler";

const Login = () => {
  const navigation = useNavigation();
  const [user, setUser] = useContext(UserContext);

  const [userInfo, setuserInfo] = useState({
    email: "",
    password: "",
  });
  const { mutate, isSuccess } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => login(userInfo),
    onSuccess: (data) => {
      setUser(true);
      navigation.navigate("mainNavigation");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(userInfo);
  };
  const handlechange = (key, value) => {
    navigation.navigate(); //toDashboardPage
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
        <Text style={{ fontSize: 30, color: "white" }}>
          Login To Your Account
        </Text>
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
            placeholder="Enter Your Email"
            onChangeText={(text) => {
              setuserInfo({ ...userInfo, email: text });
            }}
          />
          <Text style={{ paddingTop: 20, fontWeight: "500" }}>Password</Text>
          <TextInput
            secureTextEntry
            placeholder="Enter Your Password"
            onChangeText={(text) => {
              setuserInfo({ ...userInfo, password: text });
            }}
          />
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
            <Text style={{ color: "white" }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
