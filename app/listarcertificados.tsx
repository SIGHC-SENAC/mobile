import { StyleSheet, View } from "react-native";
import BottomBar from "../components/ui/bottomBar";
import PageHeader from "../components/ui/PageHeader";
import Navbar from "../components/ui/navbar";

export default function ListarCertificadosScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.navbarWrapper}>
        <Navbar />
      </View>
      <View style={styles.pageHeaderWrapper}>
        <PageHeader
          icon="rotate-ccw"
          title="Histórico"
          subtitle={"Certificados enviados"}
        />
      </View>
      <View style={styles.divider} />
      <BottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    justifyContent: "flex-start",
  },
  navbarWrapper: {
    marginTop: 40,
    width: "100%",
  },
  pageHeaderWrapper: {
    marginTop: 24,
    paddingHorizontal: 24,
    width: "100%",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#E5E7EB",
    marginTop: 12,
  },
});