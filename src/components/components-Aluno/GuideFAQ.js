import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const questions = [
  "Quanto tempo leva a análise?",
  "Posso reenviar um documento rejeitado?",
  "Como saber quantas horas já foram aprovadas?",
  "Posso enviar certificados de cursos externos?",
];

export default function GuideFAQ() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Feather
          name="help-circle"
          size={15}
          color="#0A4D9B"
        />
        <Text style={styles.headerTitle}>Dúvidas frequentes</Text>
      </View>

      {questions.map((question, index) => (
        <View
          key={question}
          style={[
            styles.questionRow,
            index > 0 && styles.questionBorder,
          ]}
        >
          <Text style={styles.questionText}>{question}</Text>
          <Feather
            name="chevron-down"
            size={16}
            color="#52627A"
          />
        </View>
      ))}
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

  questionRow: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  questionBorder: {
    borderTopWidth: 1,
    borderTopColor: "#D7E0EA",
  },

  questionText: {
    flex: 1,
    color: "#071525",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 19,
    marginRight: 12,
  },
});
