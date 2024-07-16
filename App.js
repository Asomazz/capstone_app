import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContext from "./context/UserContext";
import { StyleSheet, Text, View } from "react-native";

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
    <View>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={[user, setUser]}>
          <Text>Helli fluid</Text>
        </UserContext.Provider>
      </QueryClientProvider>
    </View>
  );
}
