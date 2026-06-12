import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

const statusConfig = {
  rejected: {
    label: "Não aprovado",
    color: "#EF4444",
    light: "#FFF5F5",
    border: "#FFB4B4",
    side: "#EF4444",
    details: "Detalhes da rejeição",
  },
  pending: {
    label: "Pendente",
    color: "#D97706",
    light: "#FFF9E8",
    border: "#F6D56E",
    side: "#F59E0B",
    details: "Aguardando análise do administrador",
  },
  approved: {
    label: "Aprovado",
    color: "#059669",
    light: "#ECFDF5",
    border: "#A6E8C8",
    side: "#10B981",
    details: "Detalhes da aprovação",
  },
};

function getStatusIcon(status) {
  if (status === "pending") {
    return "clock";
  }

  if (status === "approved") {
    return "check-circle";
  }

  return "x-circle";
}

export default function HistoryCertificateCard({ certificate }) {
  const status = certificate?.status || "pending";
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.sideBar,
          { backgroundColor: config.side },
        ]}
      />

      <View style={styles.card}>
        <View style={styles.topRow}>
          <View style={styles.fileIcon}>
            <Ionicons
              name="document-text-outline"
              size={23}
              color="#52627A"
            />
          </View>

          <View style={styles.info}>
            <Text
              style={styles.title}
              numberOfLines={1}
            >
              {certificate?.title || "Certificado.pdf"}
            </Text>

            <View style={styles.dateRow}>
              <Feather
                name="calendar"
                size={12}
                color="#6B7280"
              />
              <Text style={styles.dateText}>
                {certificate?.date || "Sem data"}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.statusPill,
              {
                backgroundColor: config.light,
                borderColor: config.border,
              },
            ]}
          >
            <Feather
              name={getStatusIcon(status)}
              size={12}
              color={config.color}
            />

            <Text
              style={[
                styles.statusText,
                { color: config.color },
              ]}
            >
              {config.label}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.detailBox,
            {
              backgroundColor: config.light,
              borderColor: config.border,
            },
          ]}
        >
          <View style={styles.detailLeft}>
            <Feather
              name={getStatusIcon(status)}
              size={14}
              color={config.color}
            />

            <Text
              style={[
                styles.detailText,
                { color: config.color },
              ]}
              numberOfLines={1}
            >
              {certificate?.details || config.details}
            </Text>
          </View>

          {status !== "pending" && (
            <Feather
              name="chevron-down"
              size={16}
              color={config.color}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 12,
    overflow: "hidden",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D7E0EA",
  },

  sideBar: {
    width: 4,
  },

  card: {
    flex: 1,
    padding: 18,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  fileIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#EEF2F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  info: {
    flex: 1,
    marginRight: 8,
  },

  title: {
    color: "#071525",
    fontSize: 15,
    fontWeight: "900",
    lineHeight: 20,
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  dateText: {
    color: "#52627A",
    fontSize: 13,
    marginLeft: 5,
  },

  statusPill: {
    minHeight: 24,
    borderWidth: 1,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "800",
    marginLeft: 4,
  },

  detailBox: {
    minHeight: 38,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 18,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  detailLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  detailText: {
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 7,
  },
});
