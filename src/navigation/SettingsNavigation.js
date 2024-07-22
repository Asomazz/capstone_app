import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../screens/settings/SettingsScreen";
import Notification from "../screens/settings/Notification";
import HelpCenter from "../screens/settings/HelpCenter";
import Billing from "../screens/settings/Billing";

const Stack = createStackNavigator();

const SettingsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="settings" component={SettingsScreen} />
      <Stack.Screen name="notification" component={Notification} />
      <Stack.Screen name="billing" component={Billing} />
      <Stack.Screen name="helpcenter" component={HelpCenter} />
    </Stack.Navigator>
  );
};

export default SettingsNavigation;
