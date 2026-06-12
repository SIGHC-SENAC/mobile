import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DashboardWelcomeBanner({ studentName = "TIAGO", dateText = "Domingo, 7 De Junho De 2026" }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, {studentName}!</Text>

      <Text style={styles.description}>
        Veja seu dashboard com o progresso das horas complementares
      </Text>

      <Text style={styles.date}>
        {dateText}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1767B7",
    borderRadius: 9,
    marginHorizontal: 16,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: "#0F172A",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    lineHeight: 28,
  },

  description: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 22,
    marginTop: 8,
  },

  date: {
    color: "#BBDCF8",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },
});
