import { Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FormField({ label, icon, ...inputProps }) {
  return (
    <View className="mt-3.5">
      <Text className="text-[13px] font-semibold text-[#2c3449] mb-1.5">{label}</Text>
      <View className="flex-row items-center border border-[#dde2ec] rounded-lg bg-[#fafbfc] px-3">
        <Ionicons name={icon} size={18} color="#b0b8c9" style={{ marginRight: 8 }} />
        <TextInput
          className="flex-1 py-3.5 text-[15px] text-[#1a1a2e]"
          placeholderTextColor="#c0c8d8"
          {...inputProps}
        />
      </View>
    </View>
  );
}
