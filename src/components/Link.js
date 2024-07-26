import { View, Text, TouchableOpacity, Modal, Pressable } from "react-native";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../apis/auth";
import * as Clipboard from "expo-clipboard";

const Link = () => {
  const { data: userInfo } = useQuery({
    queryKey: ["getCreatorLink"],
    queryFn: getProfile,
  });

  const [modalVisible, setModalVisible] = useState(false);

  const handleCopy = async (text) => {
    await Clipboard.setStringAsync(text);
    setModalVisible(true);
  };

  return (
    <View
      style={{
        height: 75,
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        gap: 20,
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

      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{
            height: 30,
            width: 360,
            borderColor: "gray",
            backgroundColor: "#A8A3FF",
            borderWidth: 0.3,
            padding: 5,
            borderRadius: 10,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "flex-start",
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
          alignItems: "flex-start",
          flex: 1,
          height: 30,
          width: 360,
          padding: 5,
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
