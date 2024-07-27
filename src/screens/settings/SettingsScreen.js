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

  const handleGopayment = () => {
    navigation.navigate("payment");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Notification Setting</Text>
          <Switch value={true} />
        </View>

        <TouchableOpacity onPress={handleGoBilling}>
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Billing</Text>
            <AntDesign name="right" size={20} color="#574EFA" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleGopayment}>
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Payment</Text>
            <AntDesign name="right" size={20} color="#574EFA" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleGoHelp}>
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Help Center</Text>
            <AntDesign name="right" size={20} color="#574EFA" />
          </View>
        </TouchableOpacity>

        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Term & Conditions</Text>
          <AntDesign name="right" size={20} color="#574EFA" />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Privacy Policy</Text>
          <AntDesign name="right" size={20} color="#574EFA" />
        </View>

        <TouchableOpacity onPress={handleGoSecurity}>
          <View style={styles.settingRow}>
            <Text style={styles.settingText}>Security</Text>
            <AntDesign name="right" size={20} color="#574EFA" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
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
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    flex: 1,
    margin: 10,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "space-between",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
  },
  settingText: {
    fontSize: 16,
    fontWeight: "500",
  },
  logoutContainer: {
    padding: 10,
    alignItems: "center",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#574EFA",
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 200,
    justifyContent: "center",
  },
  logoutText: {
    color: "#574EFA",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
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
    shadowOffset: { width: 0, height: 2 },
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
