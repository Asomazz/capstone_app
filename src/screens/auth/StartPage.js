import { Image, StyleSheet, Text, View, ViewComponent } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
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
    <View style={{ flex: 1 }}>
      <Image
        source={require("../../../assets/logo.png")}
        style={{ width: "100%", position: "absolute" }}
      />
      <View
        style={{
          flex: 3,
          justifyContent: "center",
          alignItems: "flex-start",
          padding: 20,

          overflow: "hidden",
        }}
      >
        <View style={{ fontSize: 30, color: "#574EFA" }}>
          <Text style={{}}>Our Mission</Text>
          <Text>
            to empower every single Creator to make a living working for
            themselves
          </Text>
        </View>

        <View></View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#574EFA",
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              width: 180,
              height: 45,
            }}
            onPress={handleGoToRegister}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Register Page</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#574EFA",
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              width: 180,
              height: 45,
            }}
            title="Go to Login"
            onPress={handleGoToLogin}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Login Page</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default StartPage;

const styles = StyleSheet.create({});
