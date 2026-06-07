import './global.css';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/config/firebase';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ForgotPassword from './src/screens/ForgotPassword';
import FirstAccess from './src/screens/FirstAccess';

export default function App() {
  const [user, setUser] = useState(undefined); // undefined = verificando sessão
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login' | 'forgot-password' | 'first-access'

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  if (user === undefined) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1a3d8c' }}>
        <ActivityIndicator color="#fff" size="large" />
      </View>
    );
  }

  if (user) {
    return <HomeScreen user={user} />;
  }

  if (currentScreen === 'forgot-password') {
    return <ForgotPassword onBack={() => setCurrentScreen('login')} />;
  }

  if (currentScreen === 'first-access') {
    return <FirstAccess onBackToLogin={() => setCurrentScreen('login')} />;
  }

  return <LoginScreen 
    onForgotPassword={() => setCurrentScreen('forgot-password')}
    onFirstAccess={() => setCurrentScreen('first-access')}
  />;
}
