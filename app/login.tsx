<<<<<<< Updated upstream
import { Image, StyleSheet, Text, View } from "react-native";
=======
// Imprtando ícones e hooks necessários
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import AuthLayout from "../components/AuthLayout";
import IconInput from "../components/IconInput";
import PrimaryButton from "../components/PrimaryButton";
import TextLink from "../components/TextLink";
>>>>>>> Stashed changes

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
<<<<<<< Updated upstream
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
=======
    <AuthLayout
      title="Acesso ao Sistema"
      subtitle="Entre com suas credenciais"
      showBackButton={false}
    >
      <IconInput
        iconName="email"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <IconInput
        iconName="lock"
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <PrimaryButton title="Entrar" onPress={() => {}} />

      <TextLink
        text="Esqueceu a senha?"
        onPress={() => router.push("/recuperarsenha")}
        showArrow={false}
        color="#003D82"
      />

      <Text style={styles.firstAccessText}>
        Primeiro acesso? Defina sua senha
      </Text>
    </AuthLayout>
>>>>>>> Stashed changes
  );
}

const styles = StyleSheet.create({
<<<<<<< Updated upstream
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
=======
  firstAccessText: {
    fontSize: 13,
    color: "#A0A0A0",
    textAlign: "center",
    marginTop: 0,
>>>>>>> Stashed changes
  },
});
