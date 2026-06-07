import { ActivityIndicator, Pressable, Text } from 'react-native';

export default function SubmitButton({ label, loading, onPress }) {
  return (
    <Pressable
      className={`bg-navy rounded-lg py-[15px] items-center mt-6 active:bg-navy-dark${loading ? ' opacity-70' : ''}`}
      onPress={onPress}
      disabled={loading}
    >
      {loading
        ? <ActivityIndicator color="#fff" />
        : <Text className="text-white font-bold text-base tracking-[0.5px]">{label}</Text>
      }
    </Pressable>
  );
}
