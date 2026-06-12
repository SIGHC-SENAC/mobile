import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function GuideAlert() {
  return (
    <View style={styles.container}>
      <Feather
        name="alert-triangle"
        size={19}
        color="#F59E0B"
      />

      <View style={styles.textGroup}>
        <Text style={styles.title}>Atenção antes de enviar</Text>

        <Text style={styles.description}>
          Certifique-se de que o documento é original, legível e pertence a uma
          atividade elegível ao seu curso. Envios inválidos são descartados
          automaticamente.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFBEA",
    borderWidth: 1,
    borderColor: "#FACC15",
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 20,
    padding: 16,
  },

  textGroup: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    color: "#A14200",
    fontSize: 14,
    fontWeight: "900",
    lineHeight: 20,
  },

  description: {
    color: "#B45309",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 2,
  },
});
