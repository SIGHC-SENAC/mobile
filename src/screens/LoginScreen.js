import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import HeroBanner from '../components/HeroBanner';
import FormField from '../components/FormField';
import SubmitButton from '../components/SubmitButton';
import ErrorAlert from '../components/ErrorAlert';
import { signIn } from '../services/auth';

const AUTH_ERRORS = {
  'auth/invalid-email': 'E-mail inválido.',
  'auth/user-not-found': 'Usuário não encontrado.',
  'auth/wrong-password': 'Senha incorreta.',
  'auth/invalid-credential': 'E-mail ou senha incorretos.',
  'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
  'auth/network-request-failed': 'Sem conexão com a internet.',
};

export default function LoginScreen() {
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
      // onAuthStateChanged no App.js detecta o login e troca a tela
    } catch (e) {
      setError(AUTH_ERRORS[e.code] ?? 'Erro ao entrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-navy"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <HeroBanner />

        <View className="flex-1 bg-[#eef1f6] items-center px-5 pt-7 pb-8">
          <View
            className="w-full max-w-[420px] bg-white rounded-2xl p-7"
            style={{ elevation: 6, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 20, shadowOffset: { width: 0, height: 6 } }}
          >
            <Text className="text-xl font-extrabold text-[#1a1a2e] text-center mb-1">
              Acesso ao Sistema
            </Text>
            <Text className="text-[13px] text-[#8892a4] text-center mb-6">
              Entre com suas credenciais
            </Text>

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

            <Pressable className="items-center mt-3.5">
              <Text className="text-navy font-semibold text-sm">Esqueceu sua senha?</Text>
            </Pressable>

            <Pressable className="items-center mt-3.5">
              <Text className="text-[#8892a4] text-[13px]">Primeiro acesso? Defina sua senha</Text>
            </Pressable>
          </View>

          <Text className="mt-5 text-xs text-[#aab4c4]">Faculdade Senac Pernambuco</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
