import { Feather } from "@expo/vector-icons";
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PWA_URL = "https://sighc.com.br";

export default function RestrictedAccessScreen({ onBackToLogin = () => {} }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Feather name="shield-off" size={32} color="#DC2626" />
        </View>

        <Text style={styles.title}>Acesso restrito</Text>

        <Text style={styles.description}>
          Este aplicativo é exclusivo para alunos. Sua conta possui outro
          perfil de acesso — utilize o site do SIGHC para continuar.
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={() => Linking.openURL(PWA_URL)}
        >
          <Feather name="external-link" size={18} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>Acessar pelo site</Text>
        </TouchableOpacity>

        <Text style={styles.urlText}>{PWA_URL}</Text>

        <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.85} onPress={onBackToLogin}>
          <Text style={styles.secondaryButtonText}>Voltar para o login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },

  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  title: {
    color: "#111827",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 10,
  },

  description: {
    color: "#6B7280",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginBottom: 28,
  },

  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#0A4D9B",
    borderRadius: 8,
    paddingHorizontal: 24,
    height: 48,
    width: "100%",
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  urlText: {
    color: "#0A4D9B",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 10,
  },

  secondaryButton: {
    marginTop: 24,
    paddingVertical: 10,
  },

  secondaryButtonText: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "700",
  },
});
