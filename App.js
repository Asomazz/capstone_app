import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import { getToken } from "./src/apis/storage";
import UserContext from "./src/context/UserContext";
import AuthNavigation from "./src/navigation/AuthNavigation";
import MainNavigation from "./src/navigation/MainNavigation";
import * as Updates from "expo-updates";
// RN >= 0.63
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Warning: ...", "Remote debugger"]);

async function onFetchUpdateAsync() {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  } catch (error) {
    console.log(`Error fetching latest Expo update: ${error}`);
  }
}

StatusBar.setBarStyle("auto");

export default function App() {
  const [user, setUser] = useState(false);

  const checkToken = async () => {
    const token = await getToken();
    if (token) {
      setUser(true);
    } else {
      setUser(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (!__DEV__) {
      onFetchUpdateAsync();
    }
  }, []);

  const queryClient = new QueryClient();

  return (
    <View style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={[user, setUser]}>
          <NavigationContainer>
            <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F7F7" }}>
              <View
                style={{
                  position: "absolute",
                  top: -30,
                  backgroundColor: "#403a58",
                  height: 100,
                  width: "100%",
                }}
              />
              {user ? <MainNavigation /> : <AuthNavigation />}
            </SafeAreaView>
          </NavigationContainer>
        </UserContext.Provider>
      </QueryClientProvider>
    </View>
  );
}
