import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/senaclogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>SIGHC</Text>
      <Text style={styles.subtitle}>
        Sistema Integrado de Gestão de Horas Complementares
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    gap: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 200,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    marginBottom: 80,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
