import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ErrorAlert({ message }) {
  if (!message) return null;
  return (
    <View className="flex-row items-center gap-1.5 bg-[#fff5f5] border border-[#ffd0d0] rounded-lg p-2.5 mb-1.5">
      <Ionicons name="alert-circle-outline" size={16} color="#c0392b" />
      <Text className="text-[#c0392b] text-[13px] font-medium flex-1">{message}</Text>
    </View>
  );
}
