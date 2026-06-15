import { Feather, Ionicons } from "@expo/vector-icons";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AppHeader from "../../components/components-Aluno/AppHeader";
import GuideAlert from "../../components/components-Aluno/GuideAlert";
import GuideFAQ from "../../components/components-Aluno/GuideFAQ";
import GuideProcessSteps from "../../components/components-Aluno/GuideProcessSteps";
import GuideRequirements from "../../components/components-Aluno/GuideRequirements";

export default function GuideScreen({
  onMenuPress = () => {},
  onSendPress = () => {},
}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={onMenuPress}
        >
          <Feather name="menu" size={20} color="#0A4D9B" />
        </TouchableOpacity>

        <Image
          style={styles.logo}
          source={require("../../../assets/images/senaclogo.png")}
        />

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="bell-off" size={18} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileText}>TF</Text>
            <Feather name="user" size={15} color="#0A4D9B" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.topBorder} />

      <AppHeader
        IconComponent={Ionicons}
        icon="book-outline"
        title="Orientações"
        subtitle="Como funciona o sistema"
        onSendPress={onSendPress}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <GuideAlert />
        <GuideRequirements />
        <GuideProcessSteps />
        <GuideFAQ />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  menuButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#D7E0EA",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },

  logo: {
    width: 94,
    height: 38,
    resizeMode: "contain",
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconButton: {
    marginRight: 10,
    padding: 8,
  },

  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#D7E0EA",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 9,
  },

  profileText: {
    color: "#0A4D9B",
    fontSize: 13,
    fontWeight: "700",
    marginRight: 8,
  },

  topBorder: {
    height: 2,
    backgroundColor: "#0A4D9B",
  },

  scrollContent: {
    paddingBottom: 32,
  },
});