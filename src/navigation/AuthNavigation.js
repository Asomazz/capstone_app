import Login from "../screens/auth/Login";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "../screens/auth/Register";
import MainNavigation from "./MainNavigation";

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="register" component={Register} />
      <Stack.Screen name="login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
