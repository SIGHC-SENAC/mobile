import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View,} from "react-native";

import { getCertificadosStats } from "../../services/certificadosStats";

type CardProps = {
  icon: React.ComponentProps<typeof Feather>["name"];
  iconColor: string;
  iconBg: string;
  cardStyle: any;
  value: string;
  label: string;
};

function Card({
  icon,
  iconColor,
  iconBg,
  cardStyle,
  value,
  label,
}: CardProps) {
  return (
    <View style={[styles.card, cardStyle]}>
      <View
        style={[
          styles.iconBox,
          { backgroundColor: iconBg },
        ]}
      >
        <Feather
          name={icon}
          size={22}
          color={iconColor}
        />
      </View>

      <View>
        <Text style={styles.number}>
          {value}
        </Text>

        <Text style={styles.label}>
          {label}
        </Text>
      </View>
    </View>
  );
}

export default function DashboardCards() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total: 0,
    pendentes: 0,
    aprovados: 0,
    horasAprovadas: 0,
  });

  // Troque depois pelo UID do Firebase Auth
  const uid = "";

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCertificadosStats(uid);
        setStats(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color="#2563EB"
        />
      </View>
    );
  }

  return (
    <View style={styles.grid}>
      <Card
        icon="file-text"
        iconColor="#2563EB"
        iconBg="#DBEAFE"
        cardStyle={styles.blueCard}
        value={String(stats.total)}
        label="Certificados"
      />

      <Card
        icon="clock"
        iconColor="#F59E0B"
        iconBg="#FFEDD5"
        cardStyle={styles.orangeCard}
        value={String(stats.pendentes)}
        label="Pendentes"
      />

      <Card
        icon="check-circle"
        iconColor="#16A34A"
        iconBg="#DCFCE7"
        cardStyle={styles.greenCard}
        value={String(stats.aprovados)}
        label="Aprovados"
      />

      <Card
        icon="award"
        iconColor="#6366F1"
        iconBg="#EDE9FE"
        cardStyle={styles.purpleCard}
        value={`${stats.horasAprovadas}h`}
        label="Horas aprovadas"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 15,
  },

  loading: {
    marginTop: 20,
    alignItems: "center",
  },

  card: {
    width: "47%",
    minHeight: 100,
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  number: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  label: {
    marginTop: 4,
    fontSize: 14,
    color: "#4B5563",
    width: 90,
  },

  blueCard: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },

  orangeCard: {
    backgroundColor: "#FFF7ED",
    borderWidth: 1,
    borderColor: "#FED7AA",
  },

  greenCard: {
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },

  purpleCard: {
    backgroundColor: "#F5F3FF",
    borderWidth: 1,
    borderColor: "#DDD6FE",
  },
});