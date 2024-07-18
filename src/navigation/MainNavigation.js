import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardNavigation from "./DashboardNavigation";

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="dashboardNavigation" component={DashboardNavigation} />
    </Tab.Navigator>
  );
};

export default MainNavigation;
