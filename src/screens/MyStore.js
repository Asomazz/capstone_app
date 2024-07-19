import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Profile from "../components/Profile";
import Link from "../components/Link";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../apis/auth";

const MyStore = () => {
  const { data: profile } = useQuery({
    queryKey: ["getProfile"],
    queryFn: getProfile,
  });

  return (
    <View style={{ flex: 1 }}>
      <Link username={profile.username} />
      <Profile profile={profile} />
    </View>
  );
};

export default MyStore;

const styles = StyleSheet.create({});
