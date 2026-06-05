import { router } from "expo-router";
import { Button, Image, StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/senaclogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>
        Sistema Integrado de Gestão de Horas Complementares - SIGHC
      </Text>

      <Button
      title="Entrar"
      onPress={() => router.push("/tabs/dashboard")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    flex: 1,
    justifyContent: "center",
    gap: 20,
  },
  title: {
  textAlign: "center",
  color: "#000000",
  fontSize: 24,
  fontWeight: "700",
  marginBottom: 40,
},
  logo: {
    width: 250,
    height: 250,
    marginBottom: 50,
  },
});