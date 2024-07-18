import { createStackNavigator } from "@react-navigation/stack";
import MyStore from "../screens/MyStore";

const Stack = createStackNavigator();

const MyStoreNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="myStore" component={MyStore} />
    </Stack.Navigator>
  );
};

export default MyStoreNavigation;
