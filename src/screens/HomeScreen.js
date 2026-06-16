import { Pressable, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppHeader from '../components/AppHeader';
import { signOut } from '../services/auth';
import useDashboardData from '../hooks/useDashboardData'; // Importa o novo hook
import moment from 'moment'; // Importa moment para formatação de data

// Função auxiliar para formatar timestamp para DD/MM/YYYY
const formatDate = (timestamp) => {
  if (!timestamp) return '';
  return moment(timestamp).format('DD/MM/YYYY');
};

// Função auxiliar para determinar a cor do status com NativeWind
const getStatusColor = (status) => {
  switch (status) {
    case 'aprovado':
      return 'text-green-500';
    case 'pendente':
      return 'text-yellow-500';
    case 'rejeitado':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

export default function HomeScreen({ user }) {
  const { data, loading, error, refetch } = useDashboardData(user);

  if (loading) {
    return (
      <View className="flex-1 bg-[#eef1f6] pt-14 px-5 items-center justify-center">
        <ActivityIndicator size="large" color="#1a3d8c" />
        <Text className="mt-4 text-gray-600">Carregando dashboard...</Text>
        {/* Implemente um skeleton loader aqui para uma UX melhor */}
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-[#eef1f6] pt-14 px-5 items-center justify-center">
        <Text className="text-red-500 text-lg text-center">{error}</Text>
        <Pressable
          className="bg-blue-500 px-4 py-2 rounded-md mt-4"
          onPress={refetch}
        >
          <Text className="text-white">Tentar Novamente</Text>
        </Pressable>
        {/* Botão de sair permanece mesmo em caso de erro */}
        <Pressable
          className="bg-white border border-[#dde2ec] rounded-xl py-3.5 items-center mt-9 active:opacity-70"
          onPress={signOut}
        >
          <Text className="text-[#c0392b] font-semibold text-[15px]">Sair</Text>
        </Pressable>
      </View>
    );
  }

  // Desestrutura os dados recebidos do backend
  const { summary, recentActivities, userProfile } = data || {};

  return (
    <View className="flex-1 bg-[#eef1f6]">
      <StatusBar style="dark" />

      {/* Passa o userProfile completo para o AppHeader, se disponível */}
      <AppHeader user={userProfile || user} />

      <ScrollView className="flex-1 px-5 pt-4">
        {userProfile && (
          <View className="mb-6 bg-white rounded-lg p-4 shadow-md">
            <Text className="text-lg font-bold text-[#1a1a2e] mb-2">Bem-vindo(a), {userProfile.name}!</Text>
            <Text className="text-sm text-[#8892a4]">Curso: {userProfile.course}</Text>
            <Text className="text-sm text-[#8892a4]">Turma: {userProfile.class}</Text>
          </View>
        )}

        {summary && (
          <View className="mb-6">
            <Text className="text-xl font-bold text-[#1a1a2e] mb-3">Resumo de Certificados</Text>
            <View className="flex-row justify-between flex-wrap">
              <View className="w-[48%] bg-white rounded-lg p-4 mb-4 shadow-md">
                <Text className="text-base font-semibold text-[#1a1a2e]">Total</Text>
                <Text className="text-2xl font-bold text-navy mt-1">{summary.total}</Text>
              </View>
              <View className="w-[48%] bg-white rounded-lg p-4 mb-4 shadow-md">
                <Text className="text-base font-semibold text-[#1a1a2e]">Pendentes</Text>
                <Text className="text-2xl font-bold text-yellow-500 mt-1">{summary.pendentes}</Text>
              </View>
              <View className="w-[48%] bg-white rounded-lg p-4 mb-4 shadow-md">
                <Text className="text-base font-semibold text-[#1a1a2e]">Aprovados</Text>
                <Text className="text-2xl font-bold text-green-500 mt-1">{summary.aprovados}</Text>
              </View>
              <View className="w-[48%] bg-white rounded-lg p-4 mb-4 shadow-md">
                <Text className="text-base font-semibold text-[#1a1a2e]">Rejeitados</Text>
                <Text className="text-2xl font-bold text-red-500 mt-1">{summary.rejeitados}</Text>
              </View>
            </View>
          </View>
        )}

        {recentActivities && recentActivities.length > 0 && (
          <View className="mb-6">
            <Text className="text-xl font-bold text-[#1a1a2e] mb-3">Atividades Recentes</Text>
            {recentActivities.map((activity) => (
              <View key={activity.id} className="bg-white rounded-lg p-4 mb-3 shadow-md">
                <Text className="text-base font-semibold text-[#1a1a2e]">{activity.nomeArquivo}</Text>
                <Text className={`text-sm ${getStatusColor(activity.status)} mt-1`}>Status: {activity.status}</Text>
                <Text className="text-xs text-[#8892a4] mt-1">Data: {formatDate(activity.createdAt)}</Text>
                {activity.nomeAluno && <Text className="text-xs text-[#8892a4]">Aluno: {activity.nomeAluno}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Mensagem caso não haja dados para exibir */}
        {(!summary && !recentActivities && !userProfile) && (
          <View className="flex-1 items-center justify-center">
            <Text className="text-lg text-gray-600">Nenhum dado disponível para o dashboard.</Text>
          </View>
        )}
      </ScrollView>

      <Pressable
        className="bg-white border border-[#dde2ec] rounded-xl py-3.5 items-center mx-5 mb-9 active:opacity-70"
        onPress={signOut}
      >
        <Text className="text-[#c0392b] font-semibold text-[15px]">Sair</Text>
      </Pressable>
    </View>
  );
}
