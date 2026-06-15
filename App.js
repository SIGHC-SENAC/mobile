import './global.css';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/config/firebase';
import { setupTokenRefreshStrategy } from './src/utils/tokenRefresh';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  const [user, setUser] = useState(undefined); // undefined = verificando sessão

  useEffect(() => {
    // Configurar renovação automática de tokens
    setupTokenRefreshStrategy();

    // Ouvir mudanças de autenticação
    const unsubscribe = onAuthStateChanged(auth, setUser);
    
    return unsubscribe;
  }, []);

  if (user === undefined) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1a3d8c' }}>
        <ActivityIndicator color="#fff" size="large" />
      </View>
    );
  }

  return user ? <HomeScreen user={user} /> : <LoginScreen />;
}
