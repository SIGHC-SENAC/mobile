import { router } from "expo-router";
import { useEffect } from "react";
import { Feather } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import ActivityCard from '../components/ui/ActivityCard';
import CategoryCards from '../components/ui/CategoryCards';
import DashboardCards from "../components/ui/dashboardCards";
import Navbar from "../components/ui/navbar";
import ProgressDashboard from '../components/ui/ProgressDashboard';

const activities = [
  {
    id: '1.1',
    title: 'Participação em monitoria no curso',
    maxHours: '20h',
  },

  {
    id: '1.2',
    title: 'Comparecimento a defesa de monografias',
    maxHours: '2h',
  },

  {
    id: '1.3',
    title: 'Disciplina cursada em outro curso',
    maxHours: '20h',
  },
]

export default function DashboardScreen() {
  useEffect(() => {
    // Se precisar redirecionar para outra tela, faça aqui
    // router.push("/");
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Navbar />
        <View style={styles.stickyTop}>
          <View style={styles.leftContent}>
            <View style={styles.iconBox}>
              <Feather name="grid" size={18} color="#2B5CAB" />
            </View>

            <View>
              <Text style={styles.title}>Dashboard</Text>
              <Text style={styles.subtitle}>
                Progresso detalhado {'\n'} das suas horas
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.sendButton}>
            <Feather name="upload" size={18} color="#FFFFFF" />
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Olá, Tiago</Text>
          <Text style={styles.cardSubtitle}>
            Veja seu dashboard com o progresso das horas complementares
          </Text>
          <Text style={styles.dateTime}>
            Segunda-feira, 10 de Abril de 2023
          </Text>
        </View>
        <DashboardCards />

        <ScrollView
        style={styles.Scrollcontainer}
        showsVerticalScrollIndicator={false}>
        <ProgressDashboard />

        <CategoryCards />

        <View style={styles.activitiesContainer}>
          
          <Text style={styles.activitiesTitle}>
            Atividades vinculadas ao ensino
          </Text>

          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
            />
          ))}

        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f1f1',
  },

  stickyTop: {
    marginTop: 20,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  subtitle: {
    marginTop: 2,
    fontSize: 14,
    color: '#6B7280',
  },

  sendButton: {
    backgroundColor: '#004A99',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  cardContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#004A99',
    borderRadius: 16,
    padding: 20,
  },

  cardTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#ffffff',
  },

  cardSubtitle: {
    marginTop: 8,
    fontSize: 16,
    color: '#e0e0e0',
    lineHeight: 22,
  },

  dateTime: {
    marginTop: 16,
    fontSize: 13,
    color: '#9CA3AF',
  },

  card: {
    marginTop: 16,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  blueCard: {
    borderColor: '#2563EB',
    borderWidth: 1,
  },

  greenCard: {
    borderColor: '#16A34A',
    borderWidth: 1,
  },

  orangeCard: {
    borderColor: '#D97706',
    borderWidth: 1,
  },

  purpleCard: {
    borderColor: '#6366F1',
    borderWidth: 1,
  },

  blueIcon: {
    backgroundColor: '#DBEAFE',
  },

  greenIcon: {
    backgroundColor: '#DCFCE7',
  },

  orangeIcon: {
    backgroundColor: '#FFEDD5',
  },

  purpleIcon: {
    backgroundColor: '#EDE9FE',
  },

  number: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },

  label: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },

    activitiesContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
  },

  activitiesTitle: {
    fontSize: 20,
    fontWeight: '700',

    color: '#111827',
  },
    Scrollcontainer: {
    flex: 1,
    backgroundColor: '#f5f1f1',
  },
});