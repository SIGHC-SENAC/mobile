import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import HeroBanner from '../components/HeroBanner';
import FormField from '../components/FormField';
import SubmitButton from '../components/SubmitButton';
import ErrorAlert from '../components/ErrorAlert';

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

    // Validação básica de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
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
            {/* Icon */}
            <View className="items-center mb-5">
              <View className="w-12 h-12 items-center justify-center bg-[#e8f1ff] rounded-full">
                <Ionicons name="key" size={24} color="#1a3d8c" />
              </View>
            </View>

            {/* Title */}
            <Text className="text-2xl font-extrabold text-[#1a1a2e] text-center mb-3">
              Primeiro Acesso
            </Text>

            {/* Description */}
            <Text className="text-[13px] text-[#666] text-center mb-6 leading-5">
              Informe o e-mail cadastrado pelo administrador para definir sua senha e acessar o sistema.
            </Text>

            {error && <ErrorAlert message={error} />}

            {success ? (
              <View className="items-center py-6">
                <View className="w-12 h-12 items-center justify-center bg-[#e8f8f5] rounded-full mb-4">
                  <Ionicons name="checkmark" size={24} color="#27ae60" />
                </View>
                <Text className="text-center text-[#27ae60] font-semibold text-sm mb-4">
                  Link de acesso enviado com sucesso!
                </Text>
                <Text className="text-center text-[#666] text-xs mb-4">
                  Verifique seu e-mail para o link de primeiro acesso.
                </Text>
                <Pressable 
                  onPress={() => { setSuccess(false); setEmail(''); }}
                  className="bg-navy rounded-lg py-3 px-6 items-center"
                >
                  <Text className="text-white font-semibold text-sm">Enviar para outro e-mail</Text>
                </Pressable>
              </View>
            ) : (
              <>
                {/* Email Input */}
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

                {/* Button */}
                <SubmitButton 
                  label="Enviar link de acesso" 
                  loading={loading} 
                  onPress={handleSendLink}
                />

                {/* Back to Login Link */}
                <Pressable onPress={onBackToLogin} className="items-center mt-4">
                  <View className="flex-row items-center">
                    <Ionicons name="arrow-back" size={16} color="#1a3d8c" style={{ marginRight: 4 }} />
                    <Text className="text-navy font-semibold text-sm">Voltar para login</Text>
                  </View>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
