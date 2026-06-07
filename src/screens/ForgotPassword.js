import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import HeroBanner from '../components/HeroBanner';
import FormField from '../components/FormField';
import SubmitButton from '../components/SubmitButton';
import ErrorAlert from '../components/ErrorAlert';
import { resetPassword } from '../services/auth';

const RESET_ERRORS = {
  'auth/invalid-email': 'E-mail inválido.',
  'auth/user-not-found': 'Usuário não encontrado.',
  'auth/network-request-failed': 'Sem conexão com a internet.',
  'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
};

const SUCCESS_MESSAGE = 'Um link de redefinição foi enviado para seu e-mail. Verifique sua caixa de entrada.';

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
      // Voltar para login após 3 segundos
      setTimeout(() => {
        onBack();
      }, 3000);
    } catch (e) {
      setError(RESET_ERRORS[e.code] ?? 'Erro ao enviar. Tente novamente.');
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
              Redefinir Senha
            </Text>
            <Text className="text-[13px] text-[#8892a4] text-center mb-6">
              Informe seu e-mail para receber um link de redefinição
            </Text>

            {success ? (
              <View className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <View className="flex-row items-center">
                  <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
                  <Text className="text-green-700 text-sm ml-3 flex-1">
                    {SUCCESS_MESSAGE}
                  </Text>
                </View>
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

            <Pressable 
              className="items-center mt-6"
              onPress={onBack}
            >
              <Text className="text-navy font-semibold text-sm">
                ← Voltar para Login
              </Text>
            </Pressable>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
