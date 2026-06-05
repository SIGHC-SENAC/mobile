import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import SendModal from "./sendModal";

interface PageHeaderProps {
  icon: React.ComponentProps<typeof Feather>["name"];
  title: string;
  subtitle: string;
}

export default function PageHeader({
  icon,
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <View style={styles.iconBox}>
          <Feather
            name={icon}
            size={18}
            color="#2B5CAB"
          />
        </View>

        <View>
          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.subtitle}>
            {subtitle}
            
          </Text>
        </View>
      </View>
      <SendModal/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    marginTop: 2,
    fontSize: 14,
    color: "#6B7280",
    justifyContent: "space-between",
  },
});