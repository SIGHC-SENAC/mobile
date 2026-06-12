import React from "react";
import { View, Text, StyleSheet } from "react-native";

function formatHours(value) {
  return `${Number(value || 0)}h`;
}

export default function DashboardSummaryCards({ data = {} }) {
  const courseName = data.courseName || "Curso não informado";
  const targetHours = Number(data.targetHours || 0);
  const completedHours = Number(data.completedHours || 0);
  const approvedHours = Number(data.approvedHours || 0);
  const sentCount = Number(data.sentCount || 0);
  const pendingCount = Number(data.pendingCount || 0);
  const approvedCount = Number(data.approvedCount || 0);
  const percentage = targetHours > 0
    ? Math.min(100, Math.round((completedHours / targetHours) * 100))
    : 0;
  const remainingHours = Math.max(0, targetHours - completedHours);

  const stats = [
    { value: String(sentCount), label: "Enviados" },
    { value: String(pendingCount), label: "Pendentes", color: "#F59E0B" },
    { value: String(approvedCount), label: "Aprovados", color: "#10B981" },
    { value: formatHours(approvedHours), label: "Horas" },
  ];

  return (
    <View style={styles.card}>
      <Text
        style={styles.courseTitle}
        numberOfLines={1}
      >
        {courseName}
      </Text>

      <View style={styles.percentRow}>
        <Text style={styles.percentValue}>{percentage}</Text>
        <Text style={styles.percentSymbol}>%</Text>
      </View>

      <Text style={styles.summary}>
        <Text style={styles.summaryStrong}>{formatHours(completedHours)}</Text>
        <Text> de </Text>
        <Text style={styles.summaryStrong}>{formatHours(targetHours)}</Text>
        <Text> concluídas</Text>
      </Text>

      <Text style={styles.remaining}>Faltam {formatHours(remainingHours)}</Text>

      <View style={styles.progressTrack}>
        <View style={[styles.progressBlue, { width: `${percentage}%` }]} />
        <View style={styles.progressOrange} />
      </View>

      <View style={styles.legendRow}>
        <Text style={styles.legendText}>Horas aprovadas</Text>
        <Text style={styles.legendText}>Meta: {formatHours(targetHours)}</Text>
      </View>

      <View style={styles.statsRow}>
        {stats.map((stat, index) => (
          <View
            key={stat.label}
            style={[
              styles.statItem,
              index > 0 && styles.statDivider,
            ]}
          >
            <Text
              style={[
                styles.statValue,
                stat.color && { color: stat.color },
              ]}
            >
              {stat.value}
            </Text>

            <Text style={styles.statLabel}>{stat.label}</Text>
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
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 20,
    padding: 20,
    shadowColor: "#0F172A",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  courseTitle: {
    color: "#071525",
    fontSize: 18,
    fontWeight: "900",
    lineHeight: 24,
  },

  percentRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 18,
  },

  percentValue: {
    color: "#0A4D9B",
    fontSize: 60,
    fontWeight: "900",
    lineHeight: 66,
  },

  percentSymbol: {
    color: "#6FA0D4",
    fontSize: 30,
    fontWeight: "900",
    lineHeight: 44,
    marginLeft: 2,
  },

  summary: {
    color: "#4B6079",
    fontSize: 14,
    marginTop: 4,
  },

  summaryStrong: {
    color: "#071525",
    fontWeight: "900",
  },

  remaining: {
    color: "#4B6079",
    fontSize: 13,
    marginTop: 4,
  },

  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: "#EEF2F6",
    flexDirection: "row",
    overflow: "hidden",
    marginTop: 18,
  },

  progressBlue: {
    backgroundColor: "#0A4D9B",
  },

  progressOrange: {
    flex: 1,
    backgroundColor: "#FF9518",
  },

  legendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  legendText: {
    color: "#52627A",
    fontSize: 12,
  },

  statsRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#D7E0EA",
    borderRadius: 10,
    marginTop: 24,
    overflow: "hidden",
  },

  statItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },

  statDivider: {
    borderLeftWidth: 1,
    borderLeftColor: "#D7E0EA",
  },

  statValue: {
    color: "#0A4D9B",
    fontSize: 17,
    fontWeight: "900",
  },

  statLabel: {
    color: "#52627A",
    fontSize: 10,
    marginTop: 2,
  },
});
