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
      <SafeAreaView style={{ flex: 1, backgroundColor: "#f4f4f9" }}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            Security
            <MaterialIcons
              name="drive-file-rename-outline"
              size={30}
              color="white"
            />
          </Text>
        </View>
        <KeyboardAwareScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          enableOnAndroid={true}
          extraScrollHeight={20}
        >
          <View style={styles.formContainer}>
            <Text style={styles.label}>Change Your Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Your New Username"
              placeholderTextColor="#999"
              onChangeText={(text) => {
                setuserInfo({ ...userInfo, username: text });
              }}
            />
            <Text style={styles.label}>Change Your Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="Enter Your New Password"
              placeholderTextColor="#999"
              onChangeText={(text) => {
                setuserInfo({ ...userInfo, password: text });
              }}
            />
            <Text style={styles.label}>Reenter Your Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="Reenter Your Password"
              placeholderTextColor="#999"
              onChangeText={(text) => {
                setuserInfo({ ...userInfo, reenterPassword: text });
              }}
            />
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleGoSetting}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default Security;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 32,
    backgroundColor: "#574EFA",
    height: "60%",
  },
  headerText: {
    fontSize: 28,
    marginLeft: 5,
    color: "white",
    fontWeight: "bold",
  },
  scrollView: {
    borderTopEndRadius: 10,
    width: "100%",
  },
  scrollViewContent: {
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  formContainer: {
    borderRadius: 15,
    backgroundColor: "#fff",
    padding: 35,
    width: "90%",
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginTop: 20,
    color: "#333",
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginTop: 5,
    color: "#333",
    backgroundColor: "#f9f9f9",
    width: "100%",
  },
  submitButton: {
    backgroundColor: "#574EFA",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    marginTop: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "grey",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    marginTop: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  cancelButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
