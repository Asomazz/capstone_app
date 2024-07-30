import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardNavigation from "./DashboardNavigation";
import MyStoreNavigation from "./MyStoreNavigation";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; //analytics
import AntDesign from "react-native-vector-icons/AntDesign"; //dashboard
import Ionicons from "react-native-vector-icons/Ionicons"; //storefront-outline
import Feather from "react-native-vector-icons/Feather"; //settings
import AnalyticsNavigation from "./AnalyticsNavigation";
import SettingsNavigation from "./SettingsNavigation";

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarActiveTintColor: "#574EFA", headerShown: false }}
    >
      <Tab.Screen
        name="dashboardIndex"
        component={DashboardNavigation}
        options={{
          headerTitle: "Dashboard", //the title of the page on top
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ size, focused }) => (
            <AntDesign
              name="dashboard"
              color={focused ? "#574EFA" : "gray"}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="myStoreNavigation"
        component={MyStoreNavigation}
        options={{
          headerTitle: "My Store",
          tabBarLabel: "My Store",
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name="storefront-outline"
              color={focused ? "#574EFA" : "gray"}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="analyticsNavigation"
        component={AnalyticsNavigation}
        options={{
          headerTitle: "Analytics",
          tabBarLabel: "Analytics",
          tabBarIcon: ({ size, focused }) => (
            <MaterialIcons
              name="analytics"
              color={focused ? "#574EFA" : "gray"}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsNavigation}
        options={{
          headerTitle: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: ({ size, focused }) => (
            <Feather
              name="settings"
              color={focused ? "#574EFA" : "gray"}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;
