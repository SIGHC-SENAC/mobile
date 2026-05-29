import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  labelButton?: string;
  title?: string;
  onPress?: () => void;
  onpress?: () => void;
};

const Button = ({ labelButton, title, onPress, onpress }: Props) => {
  const text = labelButton ?? title;
  const handler = onPress ?? onpress;

  return (
    <TouchableOpacity style={styles.button} onPress={handler}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
button: {
  width: '90%',
  backgroundColor: '#007AFF',
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
},
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Button;