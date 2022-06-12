import { StyleSheet, Platform, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Dashboard from "./Components/Dashboard/Dashboard";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Dashboard />
      <StatusBar backgroundColor="orange" />
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
