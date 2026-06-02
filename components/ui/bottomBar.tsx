import { Feather } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, } from "react-native";


export default function bottomBar() {

const pathname = usePathname();

const isActive = pathname === "/tabs/listarcertificados";
const isActive2 = pathname === "/tabs/orientacoes";
const isActive3 = pathname === "/tabs/dashboard";


  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.tabActive} onPress={() => router.replace("/tabs/dashboard")}>
        <Feather name="grid" size={22} color={isActive3 ? "#0056D2" : "#6B7280"} />
        <Text style={{color: isActive3 ? "#0056D2" : "#6B7280", fontWeight: isActive3 ? "700" : "400", }}>
          Dashboard
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => router.replace("/tabs/listarcertificados")}>
        <Feather name="rotate-ccw" size={22} color={isActive ? "#0056D2" : "#6B7280"} />
        <Text style={{color: isActive ? "#0056D2" : "#6B7280", fontWeight: isActive ? "700" : "400", }}>
          Histórico
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => router.replace("/tabs/orientacoes")}>
        <Feather name="book-open" size={22} color={isActive2 ? "#0056D2" : "#6B7280"} />
        <Text style={{color: isActive2 ? "#0056D2" : "#6B7280", fontWeight: isActive2 ? "700" : "400", }}>
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
});