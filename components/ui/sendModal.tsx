import React, { useState } from "react";
import {Modal, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView,} from "react-native";

import { Feather } from "@expo/vector-icons";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  function closeModal() {
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.openButton}
        onPress={() => setModalVisible(true)}
      >
        <Feather name="upload" size={18} color="#FFF" style={{ marginRight: 8 }} />
        <Text style={styles.openButtonText}>
          Enviar
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
      >
        <View style={styles.overlay}>

          <View style={styles.modalContainer}>

            <View style={styles.header}>
              <View style={styles.line} />

              <Text style={styles.title}>
                Enviar cerfificado
              </Text>

              <Text style={styles.subtitle}>
                Selecione o tipo, a atividade e o arquivo PDF
              </Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>

              <View style={styles.field}>
                <Text style={styles.label}>
                  Curso <Text style={styles.required}>*</Text>
                </Text>

                <TouchableOpacity style={styles.select}>
                  <Text style={styles.selectText}>
                    ANÁLISE E DESENVOLVIMENTO DE...
                  </Text>

                  <Feather name="chevron-down" size={20} color="#777" />
                </TouchableOpacity>
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>
                  Tipo de atividade <Text style={styles.required}>*</Text>
                </Text>

                <TouchableOpacity style={styles.select}>
                  <Text style={styles.placeholder}>
                    Selecione o tipo...
                  </Text>

                  <Feather name="chevron-down" size={20} color="#777" />
                </TouchableOpacity>
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>
                  Descrição da atividade <Text style={styles.required}>*</Text>
                </Text>

                <View style={styles.input}>
                  <Text style={styles.placeholder}>
                    Selecione primeiro o tipo de atividade
                  </Text>
                </View>
              </View>

              <View style={styles.uploadBox}>
                <View style={styles.uploadIcon}>
                  <Feather name="upload" size={28} color="#0056D2" />
                </View>

                <Text style={styles.uploadTitle}>
                  Arraste e solte seu PDF aqui
                </Text>

                <Text style={styles.uploadSubtitle}>
                  ou clique para selecionar • Apenas PDF • Máximo 10 MB
                </Text>
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>
                  Observação <Text style={styles.optional}>(opcional)</Text>
                </Text>

                <TextInput
                  placeholder="Descreva o certificado, evento ou atividade..."
                  placeholderTextColor="#999"
                  multiline
                  style={styles.textArea}
                />
              </View>
            </ScrollView>

            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={closeModal}
              >
                <Text style={styles.cancelText}>
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.submitButton}>
                <Feather name="send" size={18} color="#FFF" />
                <Text style={styles.submitText}>
                  Enviar
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
  },

  openButton: {
    backgroundColor: "#0056D2",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: "row",
  },

  openButtonText: {
  color: "#FFF",
  fontSize: 16,
  fontWeight: "700",
},

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "92%",
    maxHeight: "90%",
    backgroundColor: "#FFF",
    borderRadius: 28,
    padding: 20,
  },

  header: {
    alignItems: "center",
    marginBottom: 20,
  },

  line: {
    width: 70,
    height: 6,
    borderRadius: 99,
    backgroundColor: "#E5E7EB",
    marginBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 15,
    textAlign: "center",
    color: "#6B7280",
  },

  field: {
    marginBottom: 20,
  },

  label: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  required: {
    color: "#EF4444",
  },

  optional: {
    color: "#6B7280",
  },

  select: {
    height: 58,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  selectText: {
    fontSize: 15,
    color: "#111827",
  },

  placeholder: {
    fontSize: 15,
    color: "#9CA3AF",
  },

  input: {
    height: 58,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 16,
    justifyContent: "center",
  },

  uploadBox: {
    height: 220,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    marginBottom: 20,
  },

  uploadIcon: {
    width: 70,
    height: 70,
    borderRadius: 999,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  uploadTitle: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#111827",
  },

  uploadSubtitle: {
    marginTop: 10,
    fontSize: 15,
    textAlign: "center",
    lineHeight: 24,
    color: "#6B7280",
  },

  textArea: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 16,
    fontSize: 15,
    color: "#111827",
    textAlignVertical: "top",
  },

  footer: {
    marginTop: 10,
    flexDirection: "row",
    gap: 12,
  },

  submitButton: {
    flex: 1,
    height: 54,
    borderRadius: 14,
    backgroundColor: "#0056D2",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8 ,
  },

  cancelText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  submitText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF",
  },

    cancelButton: {
    flex: 1,

    height: 54,

    borderRadius: 14,

    backgroundColor: "#F3F4F6",

    justifyContent: "center",
    alignItems: "center",
  },
});