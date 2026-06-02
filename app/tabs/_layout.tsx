import { Slot } from "expo-router";
import { View } from "react-native";

import BottomBar from "../../components/ui/bottomBar";

export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Slot />
      <BottomBar />
    </View>
  );
}