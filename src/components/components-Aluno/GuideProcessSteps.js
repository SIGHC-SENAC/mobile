import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const steps = [
  {
    title: "Envio",
    description: "Você seleciona a categoria e envia o PDF pelo botão flutuante.",
  },
  {
    title: "Validação automática",
    description: "O sistema verifica a segurança e elegibilidade do documento em segundos.",
  },
  {
    title: "Análise da Coordenação",
    description: "Um coordenador avalia o conteúdo e registra as horas aprovadas.",
  },
  {
    title: "Resultado",
    description: "Você recebe uma notificação com o status final: aprovado ou rejeitado.",
  },
];

export default function GuideProcessSteps() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Feather
          name="clock"
          size={15}
          color="#0A4D9B"
        />
        <Text style={styles.headerTitle}>Como funciona o processo</Text>
      </View>

      <View style={styles.timeline}>
        <View style={styles.line} />

        {steps.map((step, index) => (
          <View key={step.title} style={styles.stepRow}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>

            <View style={styles.stepText}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D7E0EA",
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 24,
    overflow: "hidden",
  },

  header: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#D7E0EA",
  },

  headerTitle: {
    color: "#071525",
    fontSize: 15,
    fontWeight: "900",
    marginLeft: 10,
  },

  timeline: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 6,
    position: "relative",
  },

  line: {
    position: "absolute",
    left: 30,
    top: 22,
    bottom: 20,
    width: 1,
    backgroundColor: "#BFD1E4",
  },

  stepRow: {
    flexDirection: "row",
    marginBottom: 24,
  },

  stepNumber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#0A4D9B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    zIndex: 1,
  },

  stepNumberText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "900",
  },

  stepText: {
    flex: 1,
  },

  stepTitle: {
    color: "#071525",
    fontSize: 14,
    fontWeight: "900",
    lineHeight: 18,
  },

  stepDescription: {
    color: "#52627A",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 2,
  },
});
