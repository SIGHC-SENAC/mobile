import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { auth } from '../../constants/firebase'
import { getCategoryStats } from '../../services/categoryStats'

export default function CategoryCards() {

  const [stats, setStats] = useState({
    ensino: {
      horas: 0,
      envios: 0,
    },
    pesquisa: {
      horas: 0,
      envios: 0,
    },
    extensao: {
      horas: 0,
      envios: 0,
    },
  })

  useEffect(() => {
    async function loadData() {
      try {
        const uid = auth.currentUser?.uid

        if (!uid) return

        const data = await getCategoryStats(uid)

        setStats(data)
      } catch (error) {
        console.log('Erro ao carregar categorias:', error)
      }
    }

    loadData()
  }, [])

  const categories = [
    {
      title: 'ENSINO',
      data: stats.ensino,
    },
    {
      title: 'PESQUISA',
      data: stats.pesquisa,
    },
    {
      title: 'EXTENSÃO',
      data: stats.extensao,
    },
  ]

  return (
    <View style={styles.categoryGrid}>
      {categories.map((category) => (
        <View
          key={category.title}
          style={styles.categoryCard}
        >
          <Text style={styles.categoryTitle}>
            {category.title}
          </Text>

          <Text style={styles.categoryHours}>
            {category.data.horas}h
          </Text>

          <Text style={styles.categoryInfo}>
            {category.data.envios} envio(s)
          </Text>
        </View>
      ))}
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