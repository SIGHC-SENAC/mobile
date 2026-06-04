import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { auth } from "../../constants/firebase";
import { getActivityStats } from "../../services/activityStats";

type Props = {
  activity: {
    id: string;
    title: string;
    maxHours: string;
  };
};

export default function ActivityCard({ activity }: Props) {

const [stats, setStats] = useState({
  envios: 0,
  pendentes: 0,
  aprovados: 0,
  horasAprovadas: 0,
});

  useEffect(() => {
  async function loadData() {
    try {
      // support both firebase auth default export or firebase app instance
      const uid = auth.currentUser?.uid;

      if (!uid) return;

      const data = await getActivityStats(
        uid,
        activity.id
      );

      setStats(data);
    } catch (error) {
      console.log(error);
    }
  }

  loadData();
}, [activity.id]);

  return (
    <View style={styles.activityCard}>
      <Text style={styles.badge}>{activity?.id}</Text>

      <Text style={styles.activityTitle}>{activity?.title}</Text>

      <Text style={styles.activityDescription}>Aproveitamento máximo: {activity?.maxHours}</Text>

      <View style={styles.miniStats}>
        <View style={styles.miniCard}>
          <Text style={styles.miniLabel}>Horas</Text>
          <Text style={styles.miniValue}>{stats.horasAprovadas}</Text>
        </View>

        <View style={styles.miniCard}>
          <Text style={styles.miniLabel}>Aprovados</Text>
          <Text style={styles.miniValue}>{stats.aprovados}</Text>
        </View>

        <View style={styles.miniCard}>
          <Text style={styles.miniLabel}>Pendentes</Text>
          <Text style={styles.miniValue}>{stats.pendentes}</Text>
        </View>

        <View style={styles.miniCard}>
          <Text style={styles.miniLabel}>Envios</Text>
          <Text style={styles.miniValue}>{stats.envios}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  activityCard: {
    marginTop: 20,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 18,
  },

  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E7EB',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
  },

  activityTitle: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 26,
    color: '#111827',
  },

  activityDescription: {
    marginTop: 8,
    fontSize: 13,
    color: '#6B7280',
  },

  miniStats: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 10,
  },

  miniCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
  },

  miniLabel: {
    fontSize: 11,
    color: '#6B7280',
  },

  miniValue: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
})