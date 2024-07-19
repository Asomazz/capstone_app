import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../apis/auth";
import { removeToken } from "../apis/storage";
import UserContext from "../context/UserContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

const Profile = () => {
  const { data: userInfo } = useQuery({
    queryKey: ["getProfile"],
    queryFn: getProfile,
  });

  return (
    <View
      style={{
        height: 200,
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
        padding: 10,
        borderColor: "gray",
        borderWidth: 0.5,
      }}
    >
      <View
        style={{
          flex: 9,
          backgroundColor: "white",
          borderRadius: 22,
          overflow: "hidden",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          padding: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "blue",
            flex: 2,
            width: 100,
            height: 90,
            borderRadius: 50,
            overflow: "hidden",
            elevation: 50,
          }}
        >
          {/* <Image
            style={{
              backgroundColor: "green",
              width: "100%",
              height: "100%",
            }}
            source={userInfo?.image}
          /> */}
        </View>
        <View
          style={{
            backgroundColor: "pink",
            flex: 3,
            width: "100%",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            {userInfo?.name}name
          </Text>
          <Text>{userInfo?.username}</Text>
        </View>
        <View
          style={{
            flex: 2.5,
            width: "100%",
            height: "100%",
            paddingTop: 12,
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            title="Edit Profile"
          >
            <Text style={{ fontSize: 12, color: "#574EFA" }}>Edit Profile</Text>
            <Icon
              name="pencil"
              size={12}
              color="#000"
              style={{ marginLeft: 7 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 2,
          backgroundColor: "yellow",
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Here will show the social media links</Text>
      </View>
      <View
        style={{
          flex: 2,
          backgroundColor: "green",
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Here will show the social media links</Text>
      </View>
    </View>
  );
};

export default Profile;
