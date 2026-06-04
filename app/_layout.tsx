import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context"; // 👈 adicione

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="login" />
        <Stack.Screen name="formsubmissao" />
        <Stack.Screen name="listarcertificados" />
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
