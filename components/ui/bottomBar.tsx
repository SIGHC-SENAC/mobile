import React from "react";
import {Dimensions, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const { width: screenWidth } = Dimensions.get("window");

export default function bottomBar() {
  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.tabActive}>
        <Feather name="grid" size={22} color="#0056D2" />
        <Text style={styles.activeText}>
          Dashboard
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab}>
        <Feather name="rotate-ccw" size={22} color="#6B7280" />
        <Text style={styles.text}>
          Histórico
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab}>
        <Feather name="book-open" size={22} color="#6B7280" />
        <Text style={styles.text}>
          Orientações
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 78,
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingBottom: 10,
    paddingTop: 8,
  },

  tab: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  tabActive: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  text: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },

  activeText: {
    fontSize: 13,
    color: "#0056D2",
    fontWeight: "700",
  },
});