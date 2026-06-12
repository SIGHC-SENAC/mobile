import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const requirements = [
  {
    title: "Arquivo em formato PDF",
    description: "Outros formatos (imagens, Word) não são aceitos",
    icon: "document-text-outline",
    iconType: "ion",
  },
  {
    title: "PDF legível e sem proteção por senha",
    description: "Documentos ilegíveis ou criptografados são rejeitados automaticamente",
    icon: "shield",
    iconType: "feather",
  },
  {
    title: "Um certificado por envio",
    description: "Envie um arquivo por vez para facilitar a análise",
    icon: "layers-triple-outline",
    iconType: "material",
  },
  {
    title: "Tamanho máximo de 10 MB",
    description: "Comprima o PDF caso esteja acima do limite",
    icon: "upload",
    iconType: "feather",
  },
];

function RequirementIcon({ item }) {
  if (item.iconType === "ion") {
    return <Ionicons name={item.icon} size={20} color="#0A4D9B" />;
  }

  if (item.iconType === "material") {
    return <MaterialCommunityIcons name={item.icon} size={20} color="#0A4D9B" />;
  }

  return <Feather name={item.icon} size={20} color="#0A4D9B" />;
}

export default function GuideRequirements() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Feather
          name="check-circle"
          size={15}
          color="#0A4D9B"
        />
        <Text style={styles.headerTitle}>Requisitos do documento</Text>
      </View>

      {requirements.map((item, index) => (
        <View
          key={item.title}
          style={[
            styles.row,
            index > 0 && styles.rowBorder,
          ]}
        >
          <View style={styles.iconBox}>
            <RequirementIcon item={item} />
          </View>

          <View style={styles.textGroup}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D7E0EA",
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 24,
    overflow: "hidden",
  },

  header: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  headerTitle: {
    color: "#071525",
    fontSize: 15,
    fontWeight: "900",
    marginLeft: 10,
  },

  row: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 18,
  },

  rowBorder: {
    borderTopWidth: 1,
    borderTopColor: "#D7E0EA",
  },

  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 9,
    backgroundColor: "#EAF1F8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  textGroup: {
    flex: 1,
  },

  title: {
    color: "#071525",
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 20,
  },

  description: {
    color: "#52627A",
    fontSize: 12,
    lineHeight: 17,
    marginTop: 2,
  },
});
