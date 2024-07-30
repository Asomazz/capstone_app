import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../screens/settings/SettingsScreen";
import HelpCenter from "../screens/settings/HelpCenter";
import Billing from "../screens/settings/Billing";
import Security from "../screens/settings/Security";
import Payment from "../screens/settings/Payment";
import TermsConditions from "../screens/settings/TermsConditions";
import PrivacyPolicy from "../screens/settings/PrivacyPolicy";

const Stack = createStackNavigator();

const SettingsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="settings" component={SettingsScreen} />
      <Stack.Screen name="billing" component={Billing} />
      <Stack.Screen name="helpcenter" component={HelpCenter} />
      <Stack.Screen name="securitypage" component={Security} />
      <Stack.Screen name="payment" component={Payment} />
      <Stack.Screen name="TermConditions" component={TermsConditions} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
};

export default SettingsNavigation;
