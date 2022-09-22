import { StyleSheet, Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./src/Components/Dashboard/Dashboard";
import SplashScreen from "./src/Components/SplashScreen/SplashScreen";
import Players from "./src/Components/Players/Players";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="Players"
            component={Players}
            options={{
              headerShown: false,
              gestureEnabled: false,
              animationEnabled: false,
              animation: "none",
            }}
          />
        </Stack.Navigator>
        <StatusBar backgroundColor="orange" />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 0 : 40,
  },
});
