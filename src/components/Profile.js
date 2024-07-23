import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useCallback, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../apis/auth";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome"; //pencil
import AntDesign from "react-native-vector-icons/AntDesign"; //instagram //twitter
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; //snapchat
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"; //x-twitter
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../apis";

const Profile = () => {
  const navigation = useNavigation();

  const { data: userInfo, refetch } = useQuery({
    queryKey: ["getMyProfile"],
    queryFn: getProfile,
  });

  const handleGoToEdit = () => {
    navigation.navigate("editProfile");
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  return (
    <View
      style={{
        height: 210,
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
        padding: 10,
        borderColor: "gray",
        gap: 5,
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
          <Image
            style={{
              backgroundColor: "lightgray",
              width: "100%",
              height: "100%",
            }}
            source={{ uri: `${BASE_URL}/${userInfo?.image}` }}
          />
        </View>
        <View
          style={{
            backgroundColor: "white",
            flex: 3,
            width: "100%",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            {userInfo?.name}
          </Text>
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
            onPress={handleGoToEdit}
          >
            <Text style={{ fontSize: 10, color: "#574EFA" }}>Edit Profile</Text>
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
          flex: 7,
          backgroundColor: "white",
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "flex-start",
          paddingLeft: 20,
        }}
      >
        <Text>{userInfo?.bio}</Text>
      </View>
      <View
        style={{
          flex: 4,
          backgroundColor: "white",
          overflow: "hidden",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {userInfo?.instagram && (
          <AntDesign
            name="instagram"
            size={25}
            color="#342B7F"
            style={{ marginLeft: 7 }}
          />
        )}
        {userInfo?.snapchat && (
          <MaterialIcons
            name="snapchat"
            size={25}
            color="#342B7F"
            style={{ marginLeft: 7 }}
          />
        )}
        {userInfo?.twitter && (
          <FontAwesome6
            name="x-twitter"
            size={25}
            color="#342B7F"
            style={{ marginLeft: 7 }}
          />
        )}
      </View>
    </View>
  );
};

export default Profile;

{
  /* <AntDesign
name="instagram"
size={25}
color="#342B7F"
style={{ marginLeft: 7 }}
/>
<MaterialIcons
name="snapchat"
size={25}
color="#342B7F"
style={{ marginLeft: 7 }}
/>
<FontAwesome6
name="x-twitter"
size={25}
color="#342B7F"
style={{ marginLeft: 7 }}
/> */
}
