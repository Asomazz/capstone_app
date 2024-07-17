import Login from "../screens/auth/Login";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="register" component={register} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
