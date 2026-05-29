import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function ProgressDashboard() {
  return (
    <View style={styles.mainCard}>
      
      <Text style={styles.smallLabel}>
        DASHBOARD
      </Text>

      <Text style={styles.courseTitle}>
        ANÁLISE E DESENVOLVIMENTO DE SISTEMAS
      </Text>

      <View style={styles.statusRow}>
        <Text style={styles.statusText}>
          0h de <Text style={styles.bold}>100h</Text> concluídas
        </Text>

        <Text style={styles.statusText}>
          Faltam <Text style={styles.bold}>100h</Text> para completar
        </Text>
      </View>

      <View style={styles.statsGrid}>
        
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>
            Progresso geral
          </Text>

          <Text style={styles.statValueBlue}>
            0%
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>
            Meta do curso
          </Text>

          <Text style={styles.statValue}>
            100h
          </Text>
        </View>

      </View>

      <View style={styles.progressContainer}>
        
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>
            Progresso
          </Text>

          <Text style={styles.progressPercent}>
            0%
          </Text>
        </View>

        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainCard: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
  },

  smallLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#60A5FA',
  },

  courseTitle: {
    marginTop: 10,
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 34,
    color: '#111827',
  },

  statusRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
  },

  statusText: {
    fontSize: 14,
    color: '#6B7280',
  },

  bold: {
    fontWeight: '700',
    color: '#111827',
  },

  statsGrid: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 14,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 14,
    padding: 18,
  },

  statLabel: {
    fontSize: 13,
    color: '#6B7280',
  },

  statValue: {
    marginTop: 8,
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
  },

  statValueBlue: {
    marginTop: 8,
    fontSize: 32,
    fontWeight: '700',
    color: '#2563EB',
  },

  progressContainer: {
    marginTop: 24,
  },

  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  progressLabel: {
    fontSize: 14,
    color: '#6B7280',
  },

  progressPercent: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2563EB',
  },

  progressBar: {
    marginTop: 10,
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 99,
    overflow: 'hidden',
  },

  progressFill: {
    width: '0%',
    height: '100%',
    backgroundColor: '#2563EB',
  },
})