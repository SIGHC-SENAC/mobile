import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './constants/firebase';

import LoginScreen from './src/screens/auth/LoginScreen';
import ForgotPassword from './src/screens/auth/ForgotPassword';
import FirstAccess from './src/screens/auth/FirstAccess';

import HomeScreen from './src/screens/aluno/HomeScreen';
import HistoryScreen from './src/screens/aluno/HistoryScreen';
import GuideScreen from './src/screens/aluno/GuideScreen';

import SideMenuModalAluno from './src/components/components-Aluno/SideMenuModalAluno';
import CertificateUploadModal from './src/components/components-Aluno/CertificateUploadModal';

export default function App() {
  const [user, setUser] = useState(undefined); // undefined = verificando sessão
  const [authScreen, setAuthScreen] = useState('login'); // 'login' | 'forgot-password' | 'first-access'
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  if (user === undefined) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1a3d8c' }}>
        <ActivityIndicator color="#fff" size="large" />
      </View>
    );
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
        onLogout={() => setIsMenuVisible(false)}
      />

      <CertificateUploadModal
        visible={isUploadModalVisible}
        onClose={() => setIsUploadModalVisible(false)}
        onSubmit={(payload) => {
          console.log('Certificado enviado:', payload);
          setIsUploadModalVisible(false);
        }}
      />
    </>
  );
}
