    
import { Feather } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function DashboardCards() {
  return (
    <View style={styles.grid}>

        <View style={[styles.card, styles.blueCard]}>
            <View style={[styles.iconBox, styles.blueIcon]}>
            <Feather name="file-text" size={22} color="#2563EB" />
            </View>

            <View>
            <Text style={styles.number}>1</Text>
            <Text style={styles.label}>Certificados</Text>
            </View>
        </View>

        <View style={[styles.card, styles.orangeCard]}>
            <View style={[styles.iconBox, styles.orangeIcon]}>
            <Feather name="clock" size={22} color="#F59E0B" />
            </View>

            <View>
            <Text style={styles.number}>1</Text>
            <Text style={styles.label}>Pendentes</Text>
            </View>
        </View>

        <View style={[styles.card, styles.greenCard]}>
            <View style={[styles.iconBox, styles.greenIcon]}>
            <Feather name="clock" size={22} color="#16A34A" />
            </View>

            <View>
            <Text style={styles.number}>0</Text>
            <Text style={styles.label}>Aprovados</Text>
            </View>
            </View>

        <View style={[styles.card, styles.purpleCard]}>
            <View style={[styles.iconBox, styles.purpleIcon]}>
            <Feather name="award" size={22} color="#6366F1" />
            </View>

            <View>
            <Text style={styles.number}>0h</Text>
            <Text style={styles.label}>Horas aprovadas</Text>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  grid: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    gap: 10,
  },

  card: {
    width: '47%',
    minHeight: 100,
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  number: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },

  label: {
    marginTop: 4,
    fontSize: 14,
    color: '#4B5563',
    width: 90,
  },

  blueCard: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },

  blueIcon: {
    backgroundColor: '#DBEAFE',
  },

  orangeCard: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
  },

  orangeIcon: {
    backgroundColor: '#FFEDD5',
  },

  greenCard: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },

  greenIcon: {
    backgroundColor: '#DCFCE7',
  },

  purpleCard: {
    backgroundColor: '#F5F3FF',
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },

  purpleIcon: {
    backgroundColor: '#EDE9FE',
  },
})