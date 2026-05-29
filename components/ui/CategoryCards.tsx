import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function CategoryCards() {
  return (
    <View style={styles.categoryGrid}>

      <View style={styles.categoryCard}>
        <Text style={styles.categoryTitle}>
          ENSINO
        </Text>

        <Text style={styles.categoryHours}>
          0h
        </Text>

        <Text style={styles.categoryInfo}>
          0 envio(s)
        </Text>
      </View>

      <View style={styles.categoryCard}>
        <Text style={styles.categoryTitle}>
          PESQUISA
        </Text>

        <Text style={styles.categoryHours}>
          0h
        </Text>

        <Text style={styles.categoryInfo}>
          0 envio(s)
        </Text>
      </View>

      <View style={styles.categoryCard}>
        <Text style={styles.categoryTitle}>
          EXTENSÃO
        </Text>

        <Text style={styles.categoryHours}>
          0h
        </Text>

        <Text style={styles.categoryInfo}>
          0 envio(s)
        </Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  categoryGrid: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    gap: 14,
  },

  categoryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },

  categoryTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#6B7280',
  },

  categoryHours: {
    marginTop: 16,
    fontSize: 34,
    fontWeight: '700',
    color: '#111827',
  },

  categoryInfo: {
    marginTop: 10,
    fontSize: 12,
    color: '#6B7280',
  },
})