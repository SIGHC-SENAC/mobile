import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FormField({ label, icon, ...inputProps }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <Ionicons name={icon} size={18} color="#b0b8c9" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholderTextColor="#c0c8d8"
          {...inputProps}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginTop: 14 },
  label: { fontSize: 13, fontWeight: '600', color: '#2c3449', marginBottom: 6 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dde2ec',
    borderRadius: 8,
    backgroundColor: '#fafbfc',
    paddingHorizontal: 12,
  },
  icon: { marginRight: 8 },
  input: { flex: 1, paddingVertical: 14, fontSize: 15, color: '#1a1a2e' },
});
