import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

export default function AppHeader({
  icon = "view-dashboard-outline",
  IconComponent = MaterialCommunityIcons,
  title,
  subtitle,
  onSendPress = () => {},
}) {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View style={styles.iconContainer}>
          <IconComponent
            name={icon}
            size={20}
            color="#0A4D9B"
          />
        </View>

        <View style={styles.textContainer}>
          <Text
            style={styles.title}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.85}
          >
            {title}
          </Text>

          <Text
            style={styles.subtitle}
            numberOfLines={2}
          >
            {subtitle}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.sendButton}
        activeOpacity={0.85}
        onPress={onSendPress}
      >
        <Feather
          name="upload"
          size={18}
          color="#FFFFFF"
        />

        <Text style={styles.sendButtonText}>
          Enviar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },

  info: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },

  iconContainer: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "#EAF1F8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 20,
  },

  subtitle: {
    color: "#6B7280",
    fontSize: 13,
    lineHeight: 17,
    marginTop: 2,
  },

  sendButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A4D9B",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },

  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    marginLeft: 8,
  },
});
