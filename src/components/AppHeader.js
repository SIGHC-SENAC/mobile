import { Image, Text, View } from 'react-native';

/**
 * Mascara um email para exibição segura
 * Exemplo: user@email.com => us***@email.com
 */
const maskEmail = (email) => {
  if (!email || typeof email !== 'string') return '***';
  
  const parts = email.split('@');
  if (parts.length !== 2) return '***';
  
  const [localPart, domain] = parts;
  
  if (localPart.length <= 2) {
    return `${localPart}***@${domain}`;
  }
  
  const masked = localPart.slice(0, 2) + '*'.repeat(localPart.length - 2);
  return `${masked}@${domain}`;
};

export default function AppHeader({ user }) {
  const name = user.displayName || user.email?.split('@')[0] || 'Usuário';

  return (
    <View
      className="flex-row items-center gap-3.5 bg-white p-4 rounded-xl mb-6"
      style={{ elevation: 3, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: { width: 0, height: 2 } }}
    >
      <Image
        source={require('../../assets/senac-logo.png')}
        className="w-[70px] h-[28px]"
        resizeMode="contain"
      />
      <View>
        <Text className="text-base font-bold text-[#1a1a2e]">Olá, {name}</Text>
        <Text className="text-xs text-[#8892a4] mt-0.5">{maskEmail(user.email)}</Text>
      </View>
    </View>
  );
}
