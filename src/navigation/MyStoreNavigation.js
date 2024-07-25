import { createStackNavigator } from "@react-navigation/stack";

import MyStore from "../screens/myStore/MyStore";
import EditProfile from "../screens/myStore/EditProfile";
import AddProduct from "../screens/myStore/AddProduct";
import EditProduct from "../screens/myStore/EditProduct";

const Stack = createStackNavigator();

const MyStoreNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="myStore" component={MyStore} />
      <Stack.Screen name="editProfile" component={EditProfile} />
      <Stack.Screen name="addProduct" component={AddProduct} />
      <Stack.Screen name="editProduct" component={EditProduct} />
    </Stack.Navigator>
  );    
};

export default MyStoreNavigation;
