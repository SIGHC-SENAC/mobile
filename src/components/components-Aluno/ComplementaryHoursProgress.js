import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import CategoryActivitiesModal from "./CategoryActivitiesModal";
import { mapAtividadeToListItem } from "../../services/progress";

export default function ComplementaryHoursProgress({ grupos = [] }) {
  const [selectedGrupo, setSelectedGrupo] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.sectionTitleRow}>
        <Feather
          name="trending-up"
          size={15}
          color="#52627A"
        />

        <Text style={styles.sectionTitle}>
          Atividades por categoria
        </Text>
      </View>

      {grupos.map((grupo) => {
        const usedPercent = grupo.horasMax > 0
          ? Math.min(100, Math.round((grupo.horasAprovadas / grupo.horasMax) * 100))
          : 0;

        return (
          <TouchableOpacity
            key={grupo.id}
            style={styles.categoryCard}
            activeOpacity={0.86}
            onPress={() => setSelectedGrupo(grupo)}
          >
            <Text style={styles.categoryTitle}>
              {grupo.label}
            </Text>

            <View style={styles.hoursRow}>
              <Text style={styles.hoursValue}>{grupo.horasAprovadas}</Text>
              <Text style={styles.hoursLimit}> h / {grupo.horasMax}h</Text>
            </View>

            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${usedPercent}%` }]} />
            </View>

            <Text style={styles.limitText}>{usedPercent}% do limite utilizado</Text>

            <View style={styles.footerRow}>
              <Text style={styles.sentText}>{grupo.envios} envios</Text>

              <View style={styles.linkButton}>
                <Text style={styles.linkText}>Ver detalhes</Text>
                <Feather
                  name="chevron-right"
                  size={16}
                  color="#0A4D9B"
                />
              </View>
            </View>
          </TouchableOpacity>
        );
      })}

      <CategoryActivitiesModal
        visible={Boolean(selectedGrupo)}
        category={selectedGrupo}
        activities={(selectedGrupo?.atividades || []).map(mapAtividadeToListItem)}
        onClose={() => setSelectedGrupo(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },

  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    color: "#071525",
    fontSize: 15,
    fontWeight: "900",
    marginLeft: 8,
  },

  categoryCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D7E0EA",
    borderRadius: 14,
    padding: 20,
    marginBottom: 14,
  },

  categoryTitle: {
    color: "#52627A",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.6,
    lineHeight: 18,
  },

  hoursRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 22,
  },

  hoursValue: {
    color: "#071525",
    fontSize: 40,
    fontWeight: "900",
    lineHeight: 44,
  },

  hoursLimit: {
    color: "#52627A",
    fontSize: 16,
    lineHeight: 28,
  },

  progressTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: "#EEF2F6",
    overflow: "hidden",
    marginTop: 14,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#FF9518",
  },

  limitText: {
    color: "#52627A",
    fontSize: 12,
    marginTop: 8,
  },

  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 18,
  },

  sentText: {
    color: "#52627A",
    fontSize: 13,
  },

  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 34,
  },

  linkText: {
    color: "#0A4D9B",
    fontSize: 13,
    fontWeight: "900",
    marginRight: 4,
  },
});
