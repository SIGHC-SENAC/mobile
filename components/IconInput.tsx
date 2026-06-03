import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

interface IconInputProps extends TextInputProps {
  iconName: string;
}

export default function IconInput({ iconName, ...props }: IconInputProps) {
  return (
    <View style={styles.inputWrapper}>
      <MaterialCommunityIcons
        name={iconName as any}
        size={20}
        color="#666"
        style={styles.icon}
      />
      <TextInput style={styles.input} placeholderTextColor="#999" {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#F9F9F9",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
});
