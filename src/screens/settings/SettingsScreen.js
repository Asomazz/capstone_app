import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Switch, TouchableOpacity } from "react-native-gesture-handler";
import { logout } from "../../apis/auth";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { removeToken } from "../../apis/storage";
import UserContext from "../../context/UserContext";

const SettingsScreen = () => {
  const [user, setUser] = useContext(UserContext);

  const navigation = useNavigation();

  const handlelogout = () => {
    removeToken;
    setUser(false);
    navigation.navigate("start");
  };

  const handleGobilling = () => {
    navigation.navigate("billing");
  };
  const handleGohelp = () => {
    navigation.navigate("helpcenter");
  };
  const handleGoSecurity = () => {
    navigation.navigate("securitypage");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          marginLeft: 10,
          justifyContent: "space-evenly",
          borderRadius: 90,
          width: "95%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 0,
            borderBottomWidth: 1,

            borderBottomColor: "#574EFA",
            paddingBottom: 10,
            paddingTop: 10,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Notification Setting
          </Text>
          <Switch value={true} />
        </View>

        <TouchableOpacity onPress={handleGobilling}>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomColor: "#574EFA",
              paddingBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Billing
            </Text>
            <AntDesign name="right" size={20} color="black" />
          </View>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            borderBottomWidth: 1,
            borderBottomColor: "#574EFA",
            paddingBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Payment
          </Text>
          <AntDesign name="right" size={20} color="black" />
        </View>
        <TouchableOpacity title="heplcenter" onPress={handleGohelp}>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomColor: "#574EFA",
              paddingBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Help Center
            </Text>
            <AntDesign name="right" size={20} color="black" />
          </View>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            borderBottomWidth: 1,
            borderBottomColor: "#574EFA",
            paddingBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Term & Condtions
          </Text>
          <AntDesign name="right" size={20} color="black" />
        </View>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            borderBottomWidth: 1,
            borderBottomColor: "#574EFA",
            paddingBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Privecy Policy
          </Text>
          <AntDesign name="right" size={20} color="black" />
        </View>

        <TouchableOpacity
          title="Security Page"
          onPress={handleGoSecurity}
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            borderBottomWidth: 1,
            borderBottomColor: "#574EFA",
            paddingBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Security
          </Text>
          <AntDesign name="right" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          onPress={handlelogout}
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            width: 350,
            height: 45,
            marginLeft: 20,
            marginBottom: 15,
            borderColor: "#574EFA",
            borderWidth: 1,
          }}
          title="Logout"
          onPress={handlelogout}
        >
          <Text
            style={{
              color: "#574EFA",
              fontSize: 18,
              marginEnd: 20,
              fontWeight: "bold",
            }}
          >
            Logout
          </Text>
          <MaterialCommunityIcons
            name="logout-variant"
            size={24}
            color="#574EFA"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
