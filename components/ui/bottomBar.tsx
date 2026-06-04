import { Feather } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const tabs = [
  { name: "Dashboard", icon: "grid", route: "/dashboard" },
  { name: "Histórico", icon: "rotate-ccw", route: "/listarcertificados" },
  { name: "Orientações", icon: "book-open", route: "/orientacoes" },
];

export default function BottomBar() {
  // 👈 letra maiúscula
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 10 }]}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.route;

        return (
          <TouchableOpacity
            key={tab.route}
            style={styles.tab}
            onPress={() => router.push(tab.route as any)} // 👈 as any resolve o TypeScript
          >
            <Feather
              name={tab.icon as any}
              size={22}
              color={isActive ? "#1d56ca" : "#6B7280"}
            />
            <Text style={[styles.text, isActive && styles.textActive]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingVertical: 4,
  },
  text: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
  textActive: {
    color: "#1d56ca",
    fontWeight: "700",
  },
});
