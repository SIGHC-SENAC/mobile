import { Pressable, Text, View } from 'react-native';

export default function MockCredentials({ users, onSelect }) {
  return (
    <View className="mt-5 p-3 bg-[#f0f5ff] rounded-lg border border-[#d0e0ff]">
      <Text className="text-[11px] font-bold text-[#556] mb-1.5">
        Credenciais de teste (toque para preencher):
      </Text>
      {users.map((u) => (
        <Pressable key={u.email} onPress={() => onSelect(u)}>
          <Text className="text-[11px] text-navy mt-0.5 leading-[18px]">
            {u.name}: {u.email} / {u.password}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
