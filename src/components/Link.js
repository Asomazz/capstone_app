import * as Clipboard from "expo-clipboard";
import React, { useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

const Link = ({ userInfo }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleCopy = async (text) => {
    await Clipboard.setStringAsync(text);
    setModalVisible(true);
  };

  return (
    <View
      style={{
        padding: 10,
        backgroundColor: "white",
        overflow: "hidden",
        justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: "white",
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              width: 250,
            }}
          >
            <Text
              style={{
                marginBottom: 15,
                textAlign: "center",
              }}
            >
              Link Copied to Clipboard
            </Text>
            <Pressable
              style={{
                borderRadius: 10,
                padding: 10,
                elevation: 2,
                backgroundColor: "#342B7F",
              }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 24,
        }}
      >
        <TouchableOpacity
          style={{
            width: "100%",
            padding: 10,
            borderColor: "gray",
            backgroundColor: "#A8A3FF",
            borderWidth: 0.3,
            padding: 5,
            borderRadius: 8,
            overflow: "hidden",
            justifyContent: "center",
          }}
          onPress={() =>
            handleCopy(`https://fluidstore.link/${userInfo?.username}`)
          }
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              color: "white",
            }}
          >
            https://fluidstore.link/{userInfo?.username}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: "center",
          flex: 1,
          padding: 5,
          textAlign: "center",
        }}
      >
        <Text style={{ fontSize: 10 }}>
          This is your unique link! Click on it to copy and use it in your bio
        </Text>
      </View>
    </View>
  );
};

export default Link;
