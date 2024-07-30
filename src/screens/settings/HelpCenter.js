import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const HelpCenter = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleSendPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    navigation.navigate("settings");
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea} />
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Customer Support</Text>
          <AntDesign name="customerservice" size={30} color="white" />
        </View>
        <KeyboardAwareScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          enableOnAndroid={true}
          extraScrollHeight={20}
        >
          <View style={styles.formContainer}>
            <View style={styles.contactContainer}>
              <Text style={styles.contactText}>Phone Number</Text>
              <AntDesign name="phone" size={24} color="#333" />
              <Text style={styles.phoneNumber}>1888666</Text>
            </View>
            <Text style={styles.orText}>OR</Text>
            <View style={styles.messageContainer}>
              <Text style={styles.messageHeader}>
                Message Us <AntDesign name="message1" size={24} color="#333" />
              </Text>
              <Text style={styles.label}>Enter Your Name:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Your Name"
                placeholderTextColor="#999"
              />
              <Text style={styles.label}>Your Message:</Text>
              <TextInput
                style={[styles.input, styles.messageInput]}
                placeholder="Enter Your Message"
                placeholderTextColor="#999"
                multiline
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleSendPress}
              >
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Thank You!</Text>
            <Text style={styles.modalSubText}>
              Our team will contact you shortly.
            </Text>
            <Pressable style={styles.modalButton} onPress={handleCloseModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default HelpCenter;

const styles = StyleSheet.create({
  safeArea: {
    flex: 0,
    backgroundColor: "#403a58",
  },
  container: {
    flex: 1,
    backgroundColor: "#403a58",
  },
  headerContainer: {
    backgroundColor: "#403a58",
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  headerText: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
    marginTop: -10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: "#ffffff",
  },
  scrollViewContent: {
    padding: 20,
    alignItems: "center",
  },
  formContainer: {
    flex: 1,
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
  contactContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  contactText: {
    fontSize: 20,
    color: "#333",
    marginBottom: 10,
  },
  phoneNumber: {
    fontSize: 20,
    color: "#333",
    marginTop: 10,
  },
  orText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 20,
  },
  messageContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "100%",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  messageHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: "#333",
    alignSelf: "flex-start",
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
  messageInput: {
    height: 150,
    textAlignVertical: "top",
  },
  sendButton: {
    backgroundColor: "#FB543C",
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
  sendButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  modalSubText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#574EFA",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  modalButtonText: {
    color: "white",
    fontSize: 18,
  },
});
