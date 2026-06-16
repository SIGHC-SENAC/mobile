import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

export default function SubmitButton({ label, loading, onPress }) {
  return (
    <Pressable
      style={[styles.button, loading && styles.disabled]}
      onPress={onPress}
      disabled={loading}
    >
      {loading
        ? <ActivityIndicator color="#fff" />
        : <Text style={styles.label}>{label}</Text>
      }
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1a3d8c',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 24,
  },
  disabled: { opacity: 0.7 },
  label: { color: '#fff', fontWeight: '700', fontSize: 16, letterSpacing: 0.5 },
});
