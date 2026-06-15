import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import HeroBanner from '../components/HeroBanner';
import FormField from '../components/FormField';
import SubmitButton from '../components/SubmitButton';
import ErrorAlert from '../components/ErrorAlert';
import { signIn } from '../services/auth';
import { validateEmail, validatePassword } from '../utils/validators';
import { logSecurityEvent, SECURITY_EVENTS } from '../utils/securityLogger';

// Mensagens de erro genéricas para não revelar quais emails existem (prevenir user enumeration)
const AUTH_ERRORS = {
  'auth/invalid-email': 'E-mail ou senha incorretos.',
  'auth/user-not-found': 'E-mail ou senha incorretos.',
  'auth/wrong-password': 'E-mail ou senha incorretos.',
  'auth/invalid-credential': 'E-mail ou senha incorretos.',
  'auth/account-temporarily-locked': 'Conta bloqueada temporariamente. Aguarde antes de tentar novamente.',
  'auth/too-many-requests': 'Muitas tentativas. Aguarde antes de tentar novamente.',
  'auth/network-request-failed': 'Verifique sua conexão com a internet.',
  'INVALID_EMAIL': 'Formato de e-mail inválido.',
  'INVALID_PASSWORD': 'Senha deve ter no mínimo 8 caracteres com letras e números.',
};

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const clearError = () => setError('');

  const handleLogin = async () => {
    setError('');
    
    // Validar campos vazios
    if (!email.trim() || !password.trim()) {
      const errorMsg = 'Preencha todos os campos.';
      setError(errorMsg);
      await logSecurityEvent(SECURITY_EVENTS.INVALID_INPUT, { reason: 'empty_fields' });
      return;
    }

    setLoading(true);
    
    try {
      // Validar formato do email
      let validEmail;
      try {
        validEmail = validateEmail(email);
      } catch (emailError) {
        throw { code: 'INVALID_EMAIL', message: emailError.message };
      }

      // Validar força da senha
      let validPassword;
      try {
        validPassword = validatePassword(password);
      } catch (passwordError) {
        throw { code: 'INVALID_PASSWORD', message: passwordError.message };
      }

      // Tentar fazer login
      await signIn(validEmail, validPassword);
      // onAuthStateChanged no App.js detecta o login e troca a tela
    } catch (e) {
      const errorCode = e.code || 'UNKNOWN_ERROR';
      const errorMessage = AUTH_ERRORS[errorCode] ?? 'Erro ao entrar. Tente novamente.';
      setError(errorMessage);
      
      // Log do erro para análise de segurança
      await logSecurityEvent(SECURITY_EVENTS.INVALID_INPUT, { 
        reason: errorCode,
      });
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
              editable={!loading}
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
              editable={!loading}
              value={password}
              onChangeText={(t) => { setPassword(t); clearError(); }}
            />

            <SubmitButton label="Entrar" loading={loading} onPress={handleLogin} />

            <Pressable className="items-center mt-3.5" disabled={loading}>
              <Text className="text-navy font-semibold text-sm">Esqueceu sua senha?</Text>
            </Pressable>

            <Pressable className="items-center mt-3.5" disabled={loading}>
              <Text className="text-[#8892a4] text-[13px]">Primeiro acesso? Defina sua senha</Text>
            </Pressable>
          </View>

          <Text className="mt-5 text-xs text-[#aab4c4]">Faculdade Senac Pernambuco</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
