import { Image, Text, View } from 'react-native';

export default function HeroBanner() {
  return (
    <View className="bg-navy items-center px-8 pt-[60px] pb-10 overflow-hidden">
      <View className="absolute w-[260px] h-[260px] right-[-80px] top-[10px] rounded-full border border-white/10" />
      <View className="absolute w-[160px] h-[160px] right-[-30px] top-[60px] rounded-full border border-white/10" />

      <Image
        source={require('../../assets/senac-logo.png')}
        className="w-[140px] h-[56px] mb-6"
        resizeMode="contain"
      />
      <Text className="text-[22px] font-extrabold text-white tracking-[2px] mt-1.5 mb-4">
        SIGHC
      </Text>
      <Text className="text-[11px] font-bold text-[#f5c842] text-center leading-[17px]">
        ESSE APLICATIVO É PARA TESTES E NÃO PERTENCE À INSTITUIÇÃO SENAC
      </Text>
    </View>
  );
}
