import { Image, StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/senaclogo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.title}>
        <Text>Sistema Integrado de Gestão de Horas Complementares - SIGHC</Text>
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
    gap: 20,
  },
  title: {
    alignItems: "center",
    color: "#000000",
    fontSize: 40,
    fontWeight: "700",
    marginBottom: 400,
    justifyContent: "center",
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 50,
  },
});
