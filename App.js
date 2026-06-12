import './global.css';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/config/firebase';
import LoginScreen from './src/screens/LoginScreen';
import CertificateUploadModal from './src/components/components-Aluno/CertificateUploadModal';
import GuideScreen from './src/screens/aluno/GuideScreen';
import HistoryScreen from './src/screens/aluno/HistoryScreen';
import HomeScreen from './src/screens/aluno/HomeScreen';
import SideMenuModalAluno from './src/components/components-Aluno/SideMenuModalAluno';
import { signOut as signOutUser } from './src/services/auth';
import { createCertificateSubmission } from './src/services/certificates';

export default function App() {
  const [user, setUser] = useState(undefined);
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
    return <LoginScreen />;
  }

  const screenProps = {
    user,
    onMenuPress: () => setIsMenuVisible(true),
    onSendPress: () => setIsUploadModalVisible(true),
  };

  async function handleSubmitCertificate(payload) {
    await createCertificateSubmission({
      userId: user?.uid,
      ...payload,
    });
  }

  async function handleLogout() {
    setIsMenuVisible(false);
    setIsUploadModalVisible(false);
    setActiveScreen('dashboard');
    await signOutUser();
  }

  let currentScreen = <HomeScreen {...screenProps} />;

  if (activeScreen === 'history') {
    currentScreen = <HistoryScreen {...screenProps} />;
  }

  if (activeScreen === 'guide') {
    currentScreen = <GuideScreen {...screenProps} />;
  }

  return (
    <>
      {currentScreen}

      <SideMenuModalAluno
        visible={isMenuVisible}
        activeScreen={activeScreen}
        onClose={() => setIsMenuVisible(false)}
        onNavigate={setActiveScreen}
        onLogout={handleLogout}
      />

      <CertificateUploadModal
        visible={isUploadModalVisible}
        onSubmit={handleSubmitCertificate}
        onClose={() => setIsUploadModalVisible(false)}
      />
    </>
  );
}
