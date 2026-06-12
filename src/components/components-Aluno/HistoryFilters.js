import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const filterConfig = [
  { id: "all", label: "Todos", color: "#111827" },
  { id: "pending", label: "Pendentes", color: "#F59E0B" },
  { id: "approved", label: "Aprovados", color: "#10B981" },
  { id: "rejected", label: "Não aprovados", color: "#EF4444" },
];

export default function HistoryFilters({ counts, activeFilter, onChange }) {
  return (
    <View style={styles.container}>
      {filterConfig.map((filter) => {
        const active = activeFilter === filter.id;

        return (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.chip,
              active && styles.activeChip,
            ]}
            activeOpacity={0.8}
            onPress={() => onChange?.(filter.id)}
          >
            {!active && (
              <View
                style={[
                  styles.dot,
                  { backgroundColor: filter.color },
                ]}
              />
            )}

            <Text
              style={[
                styles.chipText,
                active && styles.activeChipText,
              ]}
            >
              {filter.label}
            </Text>

            <View
              style={[
                styles.countBadge,
                active && styles.activeCountBadge,
              ]}
            >
              <Text
                style={[
                  styles.countText,
                  active && styles.activeCountText,
                ]}
              >
                {counts?.[filter.id] || 0}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },

  chip: {
    minHeight: 30,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#D7E0EA",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  activeChip: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },

  chipText: {
    color: "#52627A",
    fontSize: 13,
    fontWeight: "700",
  },

  activeChipText: {
    color: "#FFFFFF",
  },

  countBadge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#EEF2F6",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 6,
    paddingHorizontal: 5,
  },

  activeCountBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.18)",
  },

  countText: {
    color: "#6B7280",
    fontSize: 11,
    fontWeight: "900",
  },

  activeCountText: {
    color: "#FFFFFF",
  },
});
