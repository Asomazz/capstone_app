import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../screens/settings/SettingsScreen";

const Stack = createStackNavigator();

const SettingsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default SettingsNavigation;
