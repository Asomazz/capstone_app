import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { AntDesign2 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function HelpCenter() {
  const navigation = useNavigation();
  const handleGoSetting = () => {
    navigation.navigate("settings");
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: "#574EFA" }}>
      <Text
        style={{
          fontSize: 30,
          margin: 30,
          color: "white",
        }}
      >
        Customer Support
      </Text>
      <View
        style={{
          borderRadius: 10,
          backgroundColor: "white",
          marginLeft: 20,
          alignItems: "center",
          height: 150,
          width: 350,
        }}
      >
        <Text style={{ fontSize: 20, marginTop: 35 }}>Phone Number</Text>
        <AntDesign name="phone" size={24} color="black" />
        <Text style={{ fontSize: 20 }}>1888666</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            margin: 10,
            color: "white",
          }}
        >
          OR
        </Text>
      </View>
      <View
        style={{
          borderRadius: 10,
          backgroundColor: "white",
          marginLeft: 20,
          height: 350,
          width: 350,
        }}
      >
        <View style={{ marginLeft: 15, padding: 10 }}>
          <Text>
            Message Us <AntDesign name="message1" size={24} color="black" />
          </Text>

          <Text>Enter Your Name : </Text>
          <TextInput
            style={{
              borderWidth: 1,
              width: 300,
              borderColor: "#574EFA",
              paddingVertical: 10,
            }}
            placeholder="Enter Your Name"
          ></TextInput>

          <Text> Your Message:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#574EFA",
              paddingVertical: 10,
              width: 300,
              height: 150,
            }}
            placeholder="Enter Your message"
          ></TextInput>
          <TouchableOpacity
            style={{
              backgroundColor: "#574EFA",
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              width: 180,
              height: 45,
              marginTop: 10,
              marginLeft: 55,
            }}
            onPress={handleGoSetting}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
