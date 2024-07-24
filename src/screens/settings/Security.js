import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Security = () => {
  const navigation = useNavigation();
  const handleGoSetting = () => {
    navigation.navigate("settings");
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#574EFA" }} />
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-start",
            padding: 32,
            backgroundColor: "#574EFA",
            overflow: "hidden",
            height: "60%",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              marginLeft: 5,
              color: "white",
            }}
          >
            Security
            <MaterialIcons
              name="drive-file-rename-outline"
              size={30}
              color="white"
            />
          </Text>
        </View>
        <KeyboardAwareScrollView
          style={{
            borderTopEndRadius: 10,
            width: "100%",
          }}
          contentContainerStyle={{
            // flex: 10,
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 10,
              borderRadius: 90,
              width: "100%",
              alignItems: "center",
            }}
          >
            <View style={{ padding: 35, width: 380, marginTop: 30 }}>
              <Text style={{ fontWeight: "500" }}>Change Your User Name </Text>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: "lightgray",
                  paddingVertical: 10,
                }}
                placeholder="Enter Your New User Name"
                onChangeText={(text) => {
                  setuserInfo({ ...userInfo, email: text });
                }}
              />
              <Text style={{ paddingTop: 20, fontWeight: "500" }}>
                Change Your Password
              </Text>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: "lightgray",
                  paddingVertical: 10,
                }}
                secureTextEntry
                placeholder="Enter Your New Password"
                onChangeText={(text) => {
                  setuserInfo({ ...userInfo, password: text });
                }}
              />
              <Text style={{ paddingTop: 20, fontWeight: "500" }}>
                Reenter Your Password
              </Text>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: "lightgray",
                  paddingVertical: 10,
                }}
                secureTextEntry
                placeholder="Renter Your Password"
                onChangeText={(text) => {
                  setuserInfo({ ...userInfo, password: text });
                }}
              />
              <View style={{ padding: 20 }}></View>
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
              >
                <Text style={{ color: "white" }}>Submit</Text>
              </TouchableOpacity>
              <View style={{ padding: 20 }}></View>
              <TouchableOpacity title="settingpage" onPress={handleGoSetting}>
                <View
                  style={{
                    backgroundColor: "grey",
                    borderRadius: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                    width: 300,
                    height: 45,
                  }}
                >
                  <Text style={{ color: "white" }}>Cancel</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default Security;

const styles = StyleSheet.create({});
