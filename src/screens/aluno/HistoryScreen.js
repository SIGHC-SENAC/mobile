import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import AppHeader from "../../components/components-Aluno/AppHeader";
import HistoryCertificateCard from "../../components/components-Aluno/HistoryCertificateCard";
import HistoryFilters from "../../components/components-Aluno/HistoryFilters";
import {
  fallbackCertificates,
  getStudentCertificates,
} from "../../services/certificates";

function getCounts(certificates) {
  return certificates.reduce(
    (acc, certificate) => {
      acc.all += 1;
      acc[certificate.status] += 1;
      return acc;
    },
    { all: 0, pending: 0, approved: 0, rejected: 0 }
  );
}

export default function HistoryScreen({ user, onMenuPress = () => {}, onSendPress = () => {} }) {
  const [certificates, setCertificates] = useState(fallbackCertificates);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loadingCertificates, setLoadingCertificates] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadCertificates() {
      setLoadingCertificates(true);

      const data = await getStudentCertificates(user?.uid);

      if (active) {
        setCertificates(data);
        setLoadingCertificates(false);
      }
    }

    loadCertificates();

    return () => {
      active = false;
    };
  }, [user?.uid]);

  const counts = useMemo(() => getCounts(certificates), [certificates]);
  const visibleCertificates = activeFilter === "all"
    ? certificates
    : certificates.filter((certificate) => certificate.status === activeFilter);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={onMenuPress}
          activeOpacity={0.8}
        >
          <Feather name="menu" size={21} color="#4B5563" />
        </TouchableOpacity>

        <Image
          style={styles.logo}
          source={require("../../../assets/senac-logo.png")}
        />

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="bell-off" size={18} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileText}>TF</Text>
            <Feather name="user" size={15} color="#0A4D9B" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.topBorder} />

      <AppHeader
        icon="history"
        title="Histórico"
        subtitle="Seus certificados enviados"
        onSendPress={onSendPress}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <HistoryFilters
          counts={counts}
          activeFilter={activeFilter}
          onChange={setActiveFilter}
        />

        {loadingCertificates && (
          <View style={styles.loadingRow}>
            <ActivityIndicator
              color="#0A4D9B"
              size="small"
            />
            <Text style={styles.loadingText}>Atualizando histórico...</Text>
          </View>
        )}

        {visibleCertificates.map((certificate) => (
          <HistoryCertificateCard
            key={certificate.id}
            certificate={certificate}
          />
        ))}
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
    paddingBottom: 24,
  },

  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 8,
  },

  loadingText: {
    color: "#52627A",
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 8,
  },
});
