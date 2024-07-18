import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../apis/auth";
import { removeToken } from "../apis/storage";
import UserContext from "../context/UserContext";

const Profile = () => {
  const { data: profile } = useQuery({
    queryKey: ["getProfile"],
    queryFn: getProfile,
  });

  console.log(profile);
  const [user, setUser] = useContext(UserContext);
  return (
    <View
      style={{
        flex: 10,
        padding: 10,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          height: 500,
          backgroundColor: "white",
          borderRadius: 22,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            flex: 4,
            backgroundColor: "red",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "green",
              width: "100%",
              height: "100%",
            }}
          ></View>
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
              width: "100%",
              height: "100%",
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {/* {profile.name} */}
              </Text>
            </View>
            <Text>{profile?.username}</Text>

            <Pressable
              onPress={() => {
                setUser(false);
                removeToken();
              }}
            >
              <Text>Log out</Text>
            </Pressable>
          </View>
          <View
            style={{
              width: 100,
              height: 100,
              position: "absolute",
              borderRadius: 50,
              overflow: "hidden",
              elevation: 50,
            }}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
              }}
              source={profile?.image}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;
