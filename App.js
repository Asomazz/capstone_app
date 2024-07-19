import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./src/navigation/AuthNavigation";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import UserContext from "./src/context/UserContext";
import { getToken, removeToken } from "./src/apis/storage";
import * as Font from "expo-font";
import MainNavigation from "./src/navigation/MainNavigation";

export default function App() {
  const [user, setUser] = useState(false);

  const checkToken = async () => {
    const token = await getToken();

    if (!token) {
      setUser(false);
    } else {
      if (token) {
        setUser(true);
      }
    }

    useEffect(() => {
      checkToken();
    }, []);

    const queryClient = new QueryClient();

    return (
      <View style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <UserContext.Provider value={[user, setUser]}>
            <NavigationContainer>
              {user ? <MainNavigation /> : <AuthNavigation />}
            </NavigationContainer>
          </UserContext.Provider>
        </QueryClientProvider>
      </View>
    );
  };
}
