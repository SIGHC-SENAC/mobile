import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface TextLinkProps {
  text: string;
  onPress: () => void;
  showArrow?: boolean;
  color?: string;
}

export default function TextLink({
  text,
  onPress,
  showArrow = false,
  color = "#003D82",
}: TextLinkProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {showArrow && (
        <MaterialCommunityIcons
          name="arrow-left"
          size={16}
          color={color}
          style={styles.icon}
        />
      )}
      <Text style={[styles.text, { color }]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    fontSize: 14,
    textDecorationLine: "underline",
    textAlign: "center",
  },
});
