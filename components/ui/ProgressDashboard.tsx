import React, { useEffect, useState,} from "react";

import { ActivityIndicator, StyleSheet, Text, View,} from "react-native";

import { auth } from "../../constants/firebase";
import { getProgressStats, ProgressStats } from "../../services/progressStats";

export default function ProgressDashboard() {

  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] =
    useState<ProgressStats>({
      horasAprovadas: 0,
      metaCurso: 100,
      horasRestantes: 100,
      progresso: 0,
    });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {

      const uid =
        auth.currentUser?.uid;

      if (!uid) {
        return;
      }

      const data =
        await getProgressStats(uid);

      setStats(data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color="#0056D2"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.badge}>
        DASHBOARD
      </Text>

      <Text style={styles.title}>
        ANÁLISE E DESENVOLVIMENTO DE SISTEMAS
      </Text>

      <Text style={styles.info}>
        <Text style={styles.bold}>
          {stats.horasAprovadas}h
        </Text>
        {" "}de{" "}
        <Text style={styles.bold}>
          {stats.metaCurso}h
        </Text>
        {" "}concluídas
      </Text>

      <Text style={styles.info}>
        Faltam{" "}
        <Text style={styles.bold}>
          {stats.horasRestantes}h
        </Text>
        {" "}para completar
      </Text>

      <View style={styles.cardsRow}>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>
            Progresso geral
          </Text>

          <Text style={styles.cardValue}>
            {stats.progresso.toFixed(0)}%
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>
            Meta do curso
          </Text>

          <Text style={styles.cardValue}>
            {stats.metaCurso}h
          </Text>
        </View>

      </View>

      <View style={styles.progressHeader}>
        <Text style={styles.progressLabel}>
          Progresso
        </Text>

        <Text style={styles.progressValue}>
          {stats.progresso.toFixed(0)}%
        </Text>
      </View>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${stats.progresso}%`,
            },
          ]}
        />
      </View>

      <View style={styles.legend}>

        <Text style={styles.legendText}>
          • Horas aprovadas
        </Text>

        <Text style={styles.legendText}>
          ◎ Meta do curso:
          {" "}
          {stats.metaCurso}h
        </Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 20,
  },

  loading: {
    marginTop: 30,
  },

  badge: {
    color: "#2B5CAB",
    fontWeight: "700",
    letterSpacing: 2,
    fontSize: 12,
  },

  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  info: {
    marginTop: 10,
    fontSize: 16,
    color: "#6B7280",
  },

  bold: {
    fontWeight: "700",
    color: "#111827",
  },

  cardsRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },

  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 16,
  },

  cardLabel: {
    color: "#6B7280",
    fontSize: 14,
  },

  cardValue: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
  },

  progressHeader: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  progressLabel: {
    fontSize: 15,
    color: "#374151",
  },

  progressValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0056D2",
  },

  progressBar: {
    marginTop: 10,
    height: 14,
    backgroundColor: "#E5E7EB",
    borderRadius: 999,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#0056D2",
  },

  legend: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  legendText: {
    color: "#6B7280",
    fontSize: 13,
  },
});