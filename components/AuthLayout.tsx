import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ReactNode } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  showBackButton?: boolean;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
  showBackButton = false,
}: AuthLayoutProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardContainer}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {showBackButton && (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color="#003D82"
              />
            </TouchableOpacity>
          )}

          <Image
            source={require("../assets/images/senaclogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.title}>
            <Text>
              Sistema Integrado de Gestão de Horas Complementares - SIGHC
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>{title}</Text>
              <Text style={styles.headerSubtitle}>{subtitle}</Text>
            </View>

            {children}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    flex: 1,
    justifyContent: "center",
    gap: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  title: {
    alignItems: "center",
    color: "#dfdfdf",
    fontSize: 50,
    fontWeight: "700",
    marginBottom: 30,
    justifyContent: "center",
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 50,
  },
  formContainer: {
    width: "100%",
    gap: 15,
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 25,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#000000",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#B0B0B0",
    textAlign: "center",
  },
});
