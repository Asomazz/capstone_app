import { createStackNavigator } from "@react-navigation/stack";
import Analytics from "../screens/analytics/Analytics";

const Stack = createStackNavigator();

const AnalyticsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="analytics" component={Analytics} />
    </Stack.Navigator>
  );
};

export default AnalyticsNavigation;