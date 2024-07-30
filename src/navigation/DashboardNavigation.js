import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../screens/dashboard/Dashboard";
import Orders from "../screens/dashboard/Orders";

const Stack = createStackNavigator();

const DashboardNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        options={{ headerTitle: "Dashboard" }}
        name="dashboard"
        component={Dashboard}
      />
      <Stack.Screen name="Orders" component={Orders} />
    </Stack.Navigator>
  );
};

export default DashboardNavigation;
