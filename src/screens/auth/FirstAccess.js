import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import HeroBanner from '../../components/auth/HeroBanner';
import FormField from '../../components/auth/FormField';
import SubmitButton from '../../components/auth/SubmitButton';
import ErrorAlert from '../../components/auth/ErrorAlert';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function FirstAccess({ onBackToLogin }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const clearError = () => setError('');

  const handleSendLink = async () => {
    setError('');
    if (!email.trim()) {
      setError('Por favor, informe seu e-mail.');
      return;
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      setError('Por favor, informe um e-mail válido.');
      return;
    }
    setLoading(true);
    try {
      // TODO: Implementar lógica de envio de link de acesso
      // await sendAccessLink(email.trim());
      setSuccess(true);
      setEmail('');
    } catch (e) {
      setError('Erro ao enviar link. Tente novamente.');
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
            <View style={styles.iconWrapper}>
              <View style={styles.iconCircle}>
                <Ionicons name="key" size={24} color="#1a3d8c" />
              </View>
            </View>

            <Text style={styles.cardTitle}>Primeiro Acesso</Text>

            <Text style={styles.cardSubtitle}>
              Informe o e-mail cadastrado pelo administrador para definir sua senha e acessar o sistema.
            </Text>

            {error ? <ErrorAlert message={error} /> : null}

            {success ? (
              <View style={styles.successWrapper}>
                <View style={styles.successCircle}>
                  <Ionicons name="checkmark" size={24} color="#27ae60" />
                </View>
                <Text style={styles.successTitle}>Link de acesso enviado com sucesso!</Text>
                <Text style={styles.successSub}>
                  Verifique seu e-mail para o link de primeiro acesso.
                </Text>
                <Pressable
                  onPress={() => { setSuccess(false); setEmail(''); }}
                  style={styles.retryButton}
                >
                  <Text style={styles.retryText}>Enviar para outro e-mail</Text>
                </Pressable>
              </View>
            ) : (
              <>
                <FormField
                  label="E-mail institucional"
                  icon="mail"
                  placeholder="seu@email.com"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="done"
                  value={email}
                  onChangeText={(t) => { setEmail(t); clearError(); }}
                  onSubmitEditing={handleSendLink}
                />

                <SubmitButton
                  label="Enviar link de acesso"
                  loading={loading}
                  onPress={handleSendLink}
                />

                <Pressable onPress={onBackToLogin} style={styles.backLink}>
                  <Ionicons name="arrow-back" size={16} color="#1a3d8c" style={{ marginRight: 4 }} />
                  <Text style={styles.backLinkText}>Voltar para login</Text>
                </Pressable>
              </>
            )}
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
  iconWrapper: { alignItems: 'center', marginBottom: 20 },
  iconCircle: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8f1ff',
    borderRadius: 24,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1a1a2e',
    textAlign: 'center',
    marginBottom: 12,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  successWrapper: { alignItems: 'center', paddingVertical: 24 },
  successCircle: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8f8f5',
    borderRadius: 24,
    marginBottom: 16,
  },
  successTitle: {
    textAlign: 'center',
    color: '#27ae60',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 8,
  },
  successSub: { textAlign: 'center', color: '#666', fontSize: 12, marginBottom: 16 },
  retryButton: {
    backgroundColor: '#1a3d8c',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  retryText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  backLink: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16 },
  backLinkText: { color: '#1a3d8c', fontWeight: '600', fontSize: 14 },
});
