import { createStackNavigator } from "@react-navigation/stack";

import MyStore from "../screens/myStore/MyStore";
import EditProfile from "../screens/myStore/EditProfile";
import AddProduct from "../screens/myStore/AddProduct";
import EditProduct from "../screens/myStore/EditProduct";

const Stack = createStackNavigator();

const MyStoreNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        options={{
          headerTitle: "My Store",
        }}
        name="myStore"
        component={MyStore}
      />
      <Stack.Screen
        options={{
          headerTitle: "Update Profile",
        }}
        name="editProfile"
        component={EditProfile}
      />
      <Stack.Screen
        options={{
          headerTitle: "Add Product",
        }}
        name="addProduct"
        component={AddProduct}
      />
      <Stack.Screen
        options={{
          headerTitle: "Update Product",
        }}
        name="editProduct"
        component={EditProduct}
      />
    </Stack.Navigator>
  );
};

export default MyStoreNavigation;
