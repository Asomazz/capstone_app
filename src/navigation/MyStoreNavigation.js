import { createStackNavigator } from "@react-navigation/stack";

import MyStore from "../screens/myStore/MyStore";
import EditProfile from "../screens/myStore/EditProfile";

const Stack = createStackNavigator();

const MyStoreNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="myStore" component={MyStore} />
      <Stack.Screen name="editProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default MyStoreNavigation;
