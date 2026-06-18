import React from "react";
import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

function ActivityItem({ item }) {
  return (
    <View style={styles.activityCard}>
      <Text style={styles.activityCode}>{item.code}</Text>

      <View style={styles.activityTextBox}>
        <Text
          style={styles.activityTitle}
          numberOfLines={1}
        >
          {item.title}
        </Text>

        <Text
          style={styles.activityStatus}
          numberOfLines={1}
        >
          {item.status || "Nenhum envio registrado"}
        </Text>
      </View>

      <View style={styles.maxBadge}>
        <Text style={styles.maxBadgeText}>máx. {item.maxHours}</Text>
      </View>
    </View>
  );
}

export default function CategoryActivitiesModal({
  visible,
  category,
  activities = [],
  loading = false,
  onClose,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <SafeAreaView
          edges={["top", "bottom"]}
          style={styles.safeArea}
          pointerEvents="box-none"
        >
          <View style={styles.card}>
            <View style={styles.header}>
              <View style={styles.headerIconBox}>
                <MaterialCommunityIcons
                  name={category?.icon || "school-outline"}
                  size={25}
                  color="#0A66C2"
                />
              </View>

              <Text
                style={styles.title}
                numberOfLines={1}
              >
                {category?.label || "Atividades"}
              </Text>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={onClose}
                activeOpacity={0.8}
              >
                <Feather
                  name="x"
                  size={22}
                  color="#5B6575"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <ScrollView
              style={styles.list}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            >
              {loading ? (
                <View style={styles.loadingBox}>
                  <ActivityIndicator
                    color="#0A4D9B"
                    size="large"
                  />
                  <Text style={styles.loadingText}>Carregando atividades...</Text>
                </View>
              ) : (
                activities.map((item) => (
                  <ActivityItem
                    key={`${item.code}-${item.title}`}
                    item={item}
                  />
                ))
              )}
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.76)",
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },

  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  card: {
    width: "92%",
    maxWidth: 342,
    height: 740,
    maxHeight: "84%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderTopWidth: 3,
    borderTopColor: "#0A4D9B",
    overflow: "hidden",
  },

  header: {
    minHeight: 78,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
  },

  headerIconBox: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: "#EAF1F8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  title: {
    flex: 1,
    color: "#111827",
    fontSize: 17,
    fontWeight: "900",
  },

  closeButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  divider: {
    height: 1,
    backgroundColor: "#D7E0EA",
  },

  list: {
    flex: 1,
    backgroundColor: "#F6F8FB",
  },

  listContent: {
    padding: 16,
    paddingBottom: 18,
  },

  activityCard: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D7E0EA",
    borderLeftWidth: 3,
    borderLeftColor: "#D7E0EA",
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
  },

  activityCode: {
    width: 28,
    color: "#6B7280",
    fontSize: 11,
    fontWeight: "700",
    marginRight: 8,
  },

  activityTextBox: {
    flex: 1,
    minWidth: 0,
  },

  activityTitle: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "900",
  },

  activityStatus: {
    color: "#A2ADBA",
    fontSize: 10,
    marginTop: 5,
  },

  maxBadge: {
    borderWidth: 1,
    borderColor: "#D7E0EA",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
    backgroundColor: "#FAFCFF",
  },

  maxBadgeText: {
    color: "#6B7280",
    fontSize: 10,
    fontWeight: "700",
  },

  loadingBox: {
    minHeight: 260,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    color: "#52627A",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 12,
  },
});
