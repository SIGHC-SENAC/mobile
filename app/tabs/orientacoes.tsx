import {router} from "expo-router";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, } from "react-native";

import BottomBar from "../../components/ui/bottomBar";

const { width: screenWidth } = Dimensions.get("window");

export default function Orientacoes() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Orientações</Text>
            <BottomBar />
        </View>
    );
}
const styles = StyleSheet.create({

container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    gap: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000000",
  },
});