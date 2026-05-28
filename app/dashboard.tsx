import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function DashboardScreen() {
  useEffect(() => {
    // Se precisar redirecionar para outra tela, faça aqui
    // router.push("/");
  }, []);

  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  );
}
