import { createStackNavigator } from "@react-navigation/stack";
import Analytics from "../screens/analytics/Analytics";

const Stack = createStackNavigator();

const AnalyticsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        options={{
          headerTitle: "Analytics",
        }}
        name="analytics"
        component={Analytics}
      />
    </Stack.Navigator>
  );
};

export default AnalyticsNavigation;
