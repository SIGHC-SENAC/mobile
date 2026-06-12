import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { getCategoryActivities } from "../../services/activities";
import CategoryActivitiesModal from "./CategoryActivitiesModal";

const categoryBase = [
  {
    id: "ensino",
    title: "ATIVIDADES VINCULADAS AO ENSINO",
    modalTitle: "Atividades vinculadas ao ensino",
    defaultLimitHours: 10,
    icon: "school-outline",
  },
  {
    id: "pesquisa",
    title: "ATIVIDADES VINCULADAS À PESQUISA",
    modalTitle: "Atividades vinculadas à pesquisa",
    defaultLimitHours: 90,
    icon: "magnify",
    highlighted: true,
  },
  {
    id: "extensao",
    title: "ATIVIDADES VINCULADAS À EXTENSÃO",
    modalTitle: "Atividades vinculadas à extensão",
    defaultLimitHours: 75,
    icon: "hand-heart-outline",
  },
];

function formatHours(value) {
  return `${Number(value || 0)}h`;
}

export default function ComplementaryHoursProgress({ categoriesData = [], userId }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loadingActivities, setLoadingActivities] = useState(false);

  const categories = categoryBase.map((category) => {
    const apiCategory = categoriesData.find((item) => item.id === category.id) || {};

    return {
      ...category,
      usedHours: Number(apiCategory.usedHours || 0),
      limitHours: Number(apiCategory.limitHours || category.defaultLimitHours),
      sentCount: Number(apiCategory.sentCount || 0),
    };
  });

  async function handleOpenCategory(category) {
    setSelectedCategory(category);
    setLoadingActivities(true);
    setActivities([]);

    const categoryActivities = await getCategoryActivities(category.id, userId);

    setActivities(categoryActivities);
    setLoadingActivities(false);
  }

  function handleCloseCategory() {
    setSelectedCategory(null);
    setActivities([]);
    setLoadingActivities(false);
  }

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

      {categories.map((category) => {
        const usedPercent = category.limitHours > 0
          ? Math.min(100, Math.round((category.usedHours / category.limitHours) * 100))
          : 0;

        return (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryCard,
              category.highlighted && styles.highlightedCard,
            ]}
            activeOpacity={0.86}
            onPress={() => handleOpenCategory(category)}
          >
            <Text style={styles.categoryTitle}>
              {category.title}
            </Text>

            <View style={styles.hoursRow}>
              <Text style={styles.hoursValue}>{category.usedHours}</Text>
              <Text style={styles.hoursLimit}> h / {formatHours(category.limitHours)}</Text>
            </View>

            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${usedPercent}%` }]} />
            </View>

            <Text style={styles.limitText}>{usedPercent}% do limite utilizado</Text>

            <View style={styles.footerRow}>
              <Text style={styles.sentText}>{category.sentCount} envios</Text>

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
        visible={Boolean(selectedCategory)}
        category={selectedCategory}
        activities={activities}
        loading={loadingActivities}
        onClose={handleCloseCategory}
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

  highlightedCard: {
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
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
