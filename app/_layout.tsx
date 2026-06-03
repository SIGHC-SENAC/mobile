import { Stack } from "expo-router";
<<<<<<< Updated upstream

export default function RootLayout() {
  return <Stack />;
=======
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor="#003D82" translucent={false} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="login" />
        <Stack.Screen name="recuperarsenha" />
        <Stack.Screen name="formsubmissao" />
        <Stack.Screen name="listarcertificados" />
      </Stack>
    </SafeAreaView>
  );
>>>>>>> Stashed changes
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#003D82",
  },
});
