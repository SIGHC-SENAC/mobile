import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './constants/firebase';
import { fetchUserData } from './src/services/userService';
import { signOut } from './src/services/auth';

import LoginScreen from './src/screens/auth/LoginScreen';
import ForgotPassword from './src/screens/auth/ForgotPassword';
import FirstAccess from './src/screens/auth/FirstAccess';
import RestrictedAccessScreen from './src/screens/auth/RestrictedAccessScreen';

import HomeScreen from './src/screens/aluno/HomeScreen';
import HistoryScreen from './src/screens/aluno/HistoryScreen';
import GuideScreen from './src/screens/aluno/GuideScreen';

import SideMenuModalAluno from './src/components/components-Aluno/SideMenuModalAluno';
import CertificateUploadModal from './src/components/components-Aluno/CertificateUploadModal';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [user, setUser] = useState(undefined); // undefined = verificando sessão
  const [userData, setUserData] = useState(null);
  const [accessDenied, setAccessDenied] = useState(false);
  const [authScreen, setAuthScreen] = useState('login'); // 'login' | 'forgot-password' | 'first-access'
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [refreshToken, setRefreshToken] = useState(0);

  useEffect(() => {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setUserData(null);
        return;
      }

      const data = await fetchUserData(firebaseUser);

      if (data && data.role !== 'aluno') {
        await signOut();
        setAccessDenied(true);
        setUser(null);
        setUserData(null);
        return;
      }

      setUserData(data);
      setUser(firebaseUser);
    });
  }, []);

  const handleLogout = useCallback(async () => {
    setIsMenuVisible(false);
    await signOut();
  }, []);

  if (user === undefined) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1a3d8c' }}>
        <ActivityIndicator color="#fff" size="large" />
      </View>
    );
  }

  if (accessDenied) {
    return <RestrictedAccessScreen onBackToLogin={() => setAccessDenied(false)} />;
  }

  if (!user) {
    if (authScreen === 'forgot-password') {
      return <ForgotPassword onBack={() => setAuthScreen('login')} />;
    }
    if (authScreen === 'first-access') {
      return <FirstAccess onBackToLogin={() => setAuthScreen('login')} />;
    }
    return (
      <LoginScreen
        onForgotPassword={() => setAuthScreen('forgot-password')}
        onFirstAccess={() => setAuthScreen('first-access')}
      />
    );
  }

  const screenProps = {
    user,
    userData,
    refreshToken,
    onMenuPress: () => setIsMenuVisible(true),
    onSendPress: () => setIsUploadModalVisible(true),
  };

  let currentScreen;
  switch (activeScreen) {
    case 'history':
      currentScreen = <HistoryScreen {...screenProps} />;
      break;
    case 'guide':
      currentScreen = <GuideScreen {...screenProps} />;
      break;
    default:
      currentScreen = <HomeScreen {...screenProps} />;
      break;
  }

  return (
    <>
      {currentScreen}

      <SideMenuModalAluno
        visible={isMenuVisible}
        activeScreen={activeScreen}
        onClose={() => setIsMenuVisible(false)}
        onNavigate={(screen) => {
          setActiveScreen(screen);
          setIsMenuVisible(false);
        }}
        onLogout={handleLogout}
      />

      <CertificateUploadModal
        visible={isUploadModalVisible}
        user={user}
        userData={userData}
        onClose={() => setIsUploadModalVisible(false)}
        onSubmit={() => {
          setRefreshToken((current) => current + 1);
          setIsUploadModalVisible(false);
        }}
      />
    </>
  );
}
