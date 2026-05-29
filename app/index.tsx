import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao SIGHC</Text>
      <View style={styles.buttonContainer}>
        <Button title="Ir para Dashboard" onPress={() => router.push('/dashboard')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Ir para Login" onPress={() => router.push('/login')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Formulário de Submissão" onPress={() => router.push('/formsubmissao')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Listar Certificados" onPress={() => router.push('/listarcertificados')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    color: "#000000",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 12,
  },
});
