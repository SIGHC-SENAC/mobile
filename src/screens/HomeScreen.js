import { Pressable, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AppHeader from '../components/AppHeader';
import { signOut } from '../services/auth';

export default function HomeScreen({ user }) {
  return (
    <View className="flex-1 bg-[#eef1f6] pt-14 px-5">
      <StatusBar style="dark" />

      <AppHeader user={user} />

      <View className="flex-1 items-center justify-center">
        <Text className="text-[28px] font-extrabold text-navy tracking-[3px]">SIGHC</Text>
        <Text className="text-sm text-[#aab4c4] mt-2">Dashboard em construção...</Text>
      </View>

      <Pressable
        className="bg-white border border-[#dde2ec] rounded-xl py-3.5 items-center mb-9 active:opacity-70"
        onPress={signOut}
      >
        <Text className="text-[#c0392b] font-semibold text-[15px]">Sair</Text>
      </Pressable>
    </View>
  );
}
