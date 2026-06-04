import { StyleSheet, Text, View } from "react-native";
import BottomBar from "../components/ui/bottomBar";
import PageHeader from "../components/ui/PageHeader";
import Navbar from "../components/ui/navbar";




export default function ListarCertificadosScreen() {
  return (
    <View style={styles.container}>
      <Navbar
      
      
      
      />
      <PageHeader
        icon="rotate-ccw"
        title="Histórico"
        subtitle={"Certificados enviados"}
      />
      <Text style={styles.title}></Text>
      <BottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  flex: 1,
  justifyContent: "flex-start", 
  padding: 24,
  paddingTop: 150, 
},

  title: {
    color: "#000000",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
  },
});
