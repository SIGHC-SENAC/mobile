import { useState } from "react";

import HomeScreen from "./src/screens/aluno/HomeScreen";
import HistoryScreen from "./src/screens/aluno/HistoryScreen";
import GuideScreen from "./src/screens/aluno/GuideScreen";

import SideMenuModalAluno from "./src/components/components-Aluno/SideMenuModalAluno";
import CertificateUploadModal from "./src/components/components-Aluno/CertificateUploadModal";

export default function App() {
  const [activeScreen, setActiveScreen] = useState("dashboard");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);

  const user = {
    uid: "demo-user",
    nome: "Aluno Teste",
  };

  const screenProps = {
    user,
    onMenuPress: () => setIsMenuVisible(true),
    onSendPress: () => setIsUploadModalVisible(true),
  };

  let currentScreen;

  switch (activeScreen) {
    case "history":
      currentScreen = <HistoryScreen {...screenProps} />;
      break;

    case "guide":
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
        }}
        onLogout={() => {
          console.log("Logout");
          setIsMenuVisible(false);
        }}
      />

      <CertificateUploadModal
        visible={isUploadModalVisible}
        onClose={() => setIsUploadModalVisible(false)}
        onSubmit={(payload) => {
          console.log("Certificado enviado:", payload);
          setIsUploadModalVisible(false);
        }}
      />
    </>
  );
}