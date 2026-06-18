import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppHeader from "../../components/components-Aluno/AppHeader";
import ComplementaryHoursProgress from "../../components/components-Aluno/ComplementaryHoursProgress";
import DashboardSummaryCards from "../../components/components-Aluno/DashboardSummaryCards";
import DashboardWelcomeBanner from "../../components/components-Aluno/DashboardWelcomeBanner";

import { fetchCertificados } from "../../services/certificates";
import { fetchCursosByIds } from "../../services/cursoService";
import { buildDashboardSummary, buildGruposDetalhados } from "../../services/progress";

const EMPTY_DASHBOARD = {
  studentName: "Aluno",
  courseName: "Curso não informado",
  completedHours: 0,
  targetHours: 0,
  sentCount: 0,
  pendingCount: 0,
  approvedCount: 0,
  approvedHours: 0,
};

function getTodayText() {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

export default function HomeScreen({
  user,
  userData,
  refreshToken,
  onMenuPress = () => {},
  onSendPress = () => {},
}) {
  const [dashboardData, setDashboardData] = useState(EMPTY_DASHBOARD);
  const [grupos, setGrupos] = useState([]);
  const [loadingDashboard, setLoadingDashboard] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      if (!user?.uid) {
        return;
      }

      try {
        setLoadingDashboard(true);

        const cursoIds = userData?.cursoIds?.length
          ? userData.cursoIds
          : userData?.cursoId
          ? [userData.cursoId]
          : [];

        const [cursos, certificados] = await Promise.all([
          fetchCursosByIds(cursoIds),
          fetchCertificados(user.uid),
        ]);

        const curso = cursos[0] || null;
        const cursoId = curso?.id;

        if (active) {
          setDashboardData(
            buildDashboardSummary({
              curso,
              certificados,
              cursoId,
              studentName: user.displayName || userData?.nome,
            })
          );
          setGrupos(buildGruposDetalhados({ curso, certificados, cursoId }));
        }
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      } finally {
        if (active) {
          setLoadingDashboard(false);
        }
      }
    }

    loadDashboard();

    return () => {
      active = false;
    };
  }, [user?.uid, user?.displayName, userData?.nome, userData?.cursoId, userData?.cursoIds, refreshToken]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={onMenuPress}
        >
          <Feather
            name="menu"
            size={20}
            color="#0A4D9B"
          />
        </TouchableOpacity>

        <Image
          style={styles.logo}
          source={require("../../../assets/images/senaclogo.png")}
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
              size="small"
              color="#0A4D9B"
            />

            <Text style={styles.loadingText}>
              Atualizando dados...
            </Text>
          </View>
        )}

        <DashboardSummaryCards data={dashboardData} />

        <ComplementaryHoursProgress grupos={grupos} />
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