import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardNavigation from "./DashboardNavigation";
import MyStoreNavigation from "./MyStoreNavigation";

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="dashboardIndex" component={DashboardNavigation} />
      <Tab.Screen name="myStoreNavigation" component={MyStoreNavigation} />
    </Tab.Navigator>
  );
};

export default MainNavigation;
