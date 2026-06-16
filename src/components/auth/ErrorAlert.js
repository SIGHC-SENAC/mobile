import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ErrorAlert({ message }) {
  if (!message) return null;
  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle-outline" size={16} color="#c0392b" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff5f5',
    borderWidth: 1,
    borderColor: '#ffd0d0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 6,
  },
  text: { color: '#c0392b', fontSize: 13, fontWeight: '500', flex: 1 },
});
