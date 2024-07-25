import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity as RNTouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { Switch, TouchableOpacity } from "react-native-gesture-handler";
import { logout } from "../../apis/auth";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { removeToken } from "../../apis/storage";
import UserContext from "../../context/UserContext";

const SettingsScreen = () => {
  const [user, setUser] = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const handleLogoutConfirmation = () => {
    removeToken();
    setUser(false);
    setModalVisible(false);
  };

  const handleLogoutCancel = () => {
    setModalVisible(false);
  };

  const handleLogout = () => {
    setModalVisible(true);
  };

  const handleGoBilling = () => {

    navigation.navigate("billing");
  };

  const handleGoHelp = () => {
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

        <TouchableOpacity onPress={handleGoBilling}>
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
        <TouchableOpacity title="helpcenter" onPress={handleGoHelp}>
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
            Term & Conditions
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
            Privacy Policy
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
          onPress={handleLogout}
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

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.modalButtons}>
              <RNTouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={handleLogoutCancel}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </RNTouchableOpacity>
              <RNTouchableOpacity
                style={[styles.button, styles.buttonConfirm]}
                onPress={handleLogoutConfirmation}
              >
                <Text style={styles.textStyle}>Logout</Text>
              </RNTouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonConfirm: {
    backgroundColor: "#FF0000",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
