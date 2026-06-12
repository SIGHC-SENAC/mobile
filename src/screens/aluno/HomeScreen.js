import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import AppHeader from "../../components/components-Aluno/AppHeader";
import ComplementaryHoursProgress from "../../components/components-Aluno/ComplementaryHoursProgress";
import DashboardSummaryCards from "../../components/components-Aluno/DashboardSummaryCards";
import DashboardWelcomeBanner from "../../components/components-Aluno/DashboardWelcomeBanner";
import { fallbackDashboard, getStudentDashboard } from "../../services/dashboard";

function getTodayText() {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

export default function Dashboard({ user, onMenuPress = () => {}, onSendPress = () => {} }) {
  const [dashboardData, setDashboardData] = useState(fallbackDashboard);
  const [loadingDashboard, setLoadingDashboard] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      setLoadingDashboard(true);

      const data = await getStudentDashboard(user?.uid);

      if (active) {
        setDashboardData(data);
        setLoadingDashboard(false);
      }
    }

    loadDashboard();

    return () => {
      active = false;
    };
  }, [user?.uid]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={onMenuPress}
          activeOpacity={0.8}
        >
          <Feather
            name="menu"
            size={21}
            color="#4B5563"
          />
        </TouchableOpacity>

        <Image
          style={styles.logo}
          source={require("../../../assets/senac-logo.png")}
        />

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather
              name="bell-off"
              size={18}
              color="#6B7280"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileText}>TF</Text>

            <Feather
              name="user"
              size={15}
              color="#0A4D9B"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.topBorder} />

      <AppHeader
        icon="view-dashboard-outline"
        title="Dashboard"
        subtitle="Progresso detalhado das suas horas"
        onSendPress={onSendPress}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <DashboardWelcomeBanner
          studentName={dashboardData.studentName}
          dateText={getTodayText()}
        />

        {loadingDashboard && (
          <View style={styles.loadingRow}>
            <ActivityIndicator
              color="#0A4D9B"
              size="small"
            />
            <Text style={styles.loadingText}>Atualizando dados...</Text>
          </View>
        )}

        <DashboardSummaryCards data={dashboardData} />

        <ComplementaryHoursProgress
          userId={user?.uid}
          categoriesData={dashboardData.categories}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  menuButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#D7E0EA",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },

  logo: {
    width: 94,
    height: 38,
    resizeMode: "contain",
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconButton: {
    marginRight: 10,
    padding: 8,
  },

  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#D7E0EA",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 9,
  },

  profileText: {
    color: "#0A4D9B",
    fontSize: 13,
    fontWeight: "700",
    marginRight: 8,
  },

  topBorder: {
    height: 2,
    backgroundColor: "#0A4D9B",
  },

  scrollContent: {
    paddingBottom: 30,
  },

  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 14,
  },

  loadingText: {
    color: "#52627A",
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 8,
  },

});
