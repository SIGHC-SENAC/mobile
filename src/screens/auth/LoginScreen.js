import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import HeroBanner from '../../components/auth/HeroBanner';
import FormField from '../../components/auth/FormField';
import SubmitButton from '../../components/auth/SubmitButton';
import ErrorAlert from '../../components/auth/ErrorAlert';
import { signIn } from '../../services/auth';

const AUTH_ERRORS = {
  'auth/invalid-email': 'E-mail inválido.',
  'auth/user-not-found': 'Usuário não encontrado.',
  'auth/wrong-password': 'Senha incorreta.',
  'auth/invalid-credential': 'E-mail ou senha incorretos.',
  'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
  'auth/network-request-failed': 'Sem conexão com a internet.',
};

export default function LoginScreen({ onForgotPassword, onFirstAccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const clearError = () => setError('');

  const handleLogin = async () => {
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Preencha todos os campos.');
      return;
    }
    setLoading(true);
    try {
      await signIn(email.trim(), password);
    } catch (e) {
      setError(AUTH_ERRORS[e.code] ?? 'Erro ao entrar. Tente novamente.');
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
            <Text style={styles.cardTitle}>Acesso ao Sistema</Text>
            <Text style={styles.cardSubtitle}>Entre com suas credenciais</Text>

            <ErrorAlert message={error} />

            <FormField
              label="E-mail"
              icon="mail-outline"
              placeholder="seu@email.com"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              value={email}
              onChangeText={(t) => { setEmail(t); clearError(); }}
            />

            <FormField
              label="Senha"
              icon="lock-closed-outline"
              placeholder="••••••••"
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={handleLogin}
              value={password}
              onChangeText={(t) => { setPassword(t); clearError(); }}
            />

            <SubmitButton label="Entrar" loading={loading} onPress={handleLogin} />

            <Pressable onPress={onForgotPassword} style={styles.link}>
              <Text style={styles.linkText}>Esqueceu sua senha?</Text>
            </Pressable>

            <Pressable onPress={onFirstAccess} style={styles.link}>
              <Text style={styles.linkText}>Primeiro acesso? Defina sua senha</Text>
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
  link: { alignItems: 'center', marginTop: 14 },
  linkText: { color: '#1a3d8c', fontWeight: '600', fontSize: 14 },
});
