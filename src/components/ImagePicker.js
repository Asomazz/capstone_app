import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BASE_URL } from "../apis";

export default function ImagePickerComp({
  image,
  setImage,
  buttonTitle = "اختر صورة",
}) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity
      style={{
        alignItems: "flex-end",
        justifyContent: "flex-end",
        backgroundColor: "red",
        width: "100%",
        height: "100%",
      }}
      onPress={pickImage}
    >
      <View
        style={{
          //   backgroundColor: COLORS.behindButton,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
        }}
      >
        {image && (
          <Image
            source={{
              uri: image.includes("media/") ? BASE_URL + "/" + image : image,
            }}
            style={{
              //   resizeMode: "contain",
              width: "100%",
              height: "100%",
            }}
          />
        )}
      </View>

      <View
        style={{
          position: "absolute",
          paddingHorizontal: 12,
          paddingVertical: 8,
          backgroundColor: "#00000050",
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", fontWeight: "700" }}>{buttonTitle}</Text>
      </View>
    </TouchableOpacity>
  );
}
