import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import HeroBanner from '../../components/auth/HeroBanner';
import FormField from '../../components/auth/FormField';
import SubmitButton from '../../components/auth/SubmitButton';
import ErrorAlert from '../../components/auth/ErrorAlert';
import { resetPassword } from '../../services/auth';

const RESET_ERRORS = {
  'auth/invalid-email': 'E-mail inválido.',
  'auth/user-not-found': 'Usuário não encontrado.',
  'auth/network-request-failed': 'Sem conexão com a internet.',
  'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
};

export default function ForgotPasswordScreen({ onBack }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const clearError = () => setError('');

  const handleResetPassword = async () => {
    setError('');
    if (!email.trim()) {
      setError('Informe seu e-mail.');
      return;
    }
    setLoading(true);
    try {
      await resetPassword(email.trim());
      setSuccess(true);
      setEmail('');
      setTimeout(() => onBack(), 3000);
    } catch (e) {
      setError(RESET_ERRORS[e.code] ?? 'Erro ao enviar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <HeroBanner />

        <View style={styles.body}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Redefinir Senha</Text>
            <Text style={styles.cardSubtitle}>
              Informe seu e-mail para receber um link de redefinição
            </Text>

            {success ? (
              <View style={styles.successBox}>
                <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
                <Text style={styles.successText}>
                  Um link de redefinição foi enviado para seu e-mail. Verifique sua caixa de entrada.
                </Text>
              </View>
            ) : (
              <>
                <ErrorAlert message={error} />

                <FormField
                  label="E-mail"
                  icon="mail-outline"
                  placeholder="seu@email.com"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="send"
                  onSubmitEditing={handleResetPassword}
                  value={email}
                  onChangeText={(t) => { setEmail(t); clearError(); }}
                />

                <SubmitButton label="Enviar Link" loading={loading} onPress={handleResetPassword} />
              </>
            )}

            <Pressable style={styles.backLink} onPress={onBack}>
              <Text style={styles.backLinkText}>← Voltar para Login</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#1a3d8c' },
  scroll: { flexGrow: 1 },
  body: {
    flex: 1,
    backgroundColor: '#eef1f6',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 32,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 28,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a2e',
    textAlign: 'center',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#8892a4',
    textAlign: 'center',
    marginBottom: 24,
  },
  successBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#bbf7d0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    gap: 12,
  },
  successText: { color: '#15803d', fontSize: 14, flex: 1 },
  backLink: { alignItems: 'center', marginTop: 24 },
  backLinkText: { color: '#1a3d8c', fontWeight: '600', fontSize: 14 },
});
