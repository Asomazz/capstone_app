import * as Clipboard from "expo-clipboard";
import React, { useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View, StyleSheet } from "react-native";

const Link = ({ userInfo }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleCopy = async (text) => {
    await Clipboard.setStringAsync(text);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Link Copied to Clipboard</Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.linkContainer}>
        <TouchableOpacity
          style={styles.copyButton}
          onPress={() => handleCopy(`https://fluidstore.link/${userInfo?.username}`)}
        >
          <Text style={styles.copyButtonText}>
            https://fluidstore.link/{userInfo?.username}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          This is your unique link! Click on it to copy and use it in your bio
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
    overflow: "hidden",
    justifyContent: "center",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 250,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  closeButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: "#403a58", // Navy Blue
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  linkContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  copyButton: {
    width: "100%",
    padding: 10,
    backgroundColor: "#403a58", // Navy Blue
    borderWidth: 0.3,
    borderRadius: 8,
    justifyContent: "center",
  },
  copyButtonText: {
    fontSize: 15,
    fontWeight: "500",
    color: "white",
  },
  descriptionContainer: {
    alignItems: "center",
    flex: 1,
    padding: 5,
    textAlign: "center",
  },
  descriptionText: {
    fontSize: 10,
  },
});

export default Link;
