import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function ListarCertificadosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listar Certificados</Text>
      <View style={styles.buttonContainer}>
        <Button title="Voltar para Dashboard" onPress={() => router.push('/dashboard')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="In�cio" onPress={() => router.push('/')} />
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
