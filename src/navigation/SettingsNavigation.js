import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../screens/settings/SettingsScreen";
import Notification from "../screens/settings/Notification";
import HelpCenter from "../screens/settings/HelpCenter";
import Billing from "../screens/settings/Billing";
import Security from "../screens/settings/Security";
import Payment from "../screens/settings/Payment";

const Stack = createStackNavigator();

const SettingsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        options={{
          headerTitle: "Settings",
        }}
        name="settings"
        component={SettingsScreen}
      />
      <Stack.Screen name="notification" component={Notification} />
      <Stack.Screen name="billing" component={Billing} />
      <Stack.Screen name="helpcenter" component={HelpCenter} />
      <Stack.Screen name="securitypage" component={Security} />
      <Stack.Screen name="payment" component={Payment} />
    </Stack.Navigator>
  );
};

export default SettingsNavigation;
