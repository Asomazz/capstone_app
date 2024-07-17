import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./src/navigation/AuthNavigation";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StyleSheet, Text, View } from "react-native";
import UserContext from "./src/context/UserContext";
import { getToken } from "./src/apis/storage";

export default function App() {
  const [user, setUser] = useState(false);

  const checkToken = async () => {
    const token = await getToken();
    if (!token) {
      setUser(false);
    } else {
      setUser(true);
    }
  };

  useEffect(() => {
    checkToken();
  });

  const queryClient = new QueryClient();

  return (
    <View style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={[user, setUser]}>
          <NavigationContainer>
            <AuthNavigation />
          </NavigationContainer>
        </UserContext.Provider>
      </QueryClientProvider>
    </View>
  );
}
