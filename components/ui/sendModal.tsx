import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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
        <Feather
          name="upload"
          size={18}
          color="#FFF"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.openButtonText}>Enviar</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <View style={styles.line} />

              <Text style={styles.title}>Enviar cerfificado</Text>

              <Text style={styles.subtitle}>
                Selecione o tipo, a atividade e o arquivo PDF
              </Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <CursoField />

              <TipoAtividadeField />

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
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.submitButton}>
                <Feather name="send" size={18} color="#FFF" />
                <Text style={styles.submitText}>Enviar</Text>
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
    gap: 8,
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

// ─── ADIÇÕES ────────────────────────────────────────────────────────────────

const CURSOS = ["Análise e Desenvolvimento de Sistemas"];

const TIPOS_ATIVIDADE = [
  {
    categoria: "Atividades vinculadas ao ensino",
    itens: [
      "1.1 - Participação em monitoria no curso",
      "1.2 - Comparecimento a defesa de monografias, temas pertinentes",
      "1.3 - Disciplina cursada em outro curso da Faculdade Senac",
      "1.4 - Disciplina cursada fora da Faculdade Senac",
      "1.5 - Cursos instrumentais - informática e/ou língua estrangeira",
      "1.6 - Certificações reconhecidas da área",
      "1.7 - Elaboração de material didático supervisionado",
      "1.8 - Professor participante da formação do aluno",
      "1.9 - Visitas técnicas",
    ],
  },
];

function CursoField() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [cursoSelecionado, setCursoSelecionado] = useState<string | null>(null);

  function selecionarCurso(curso: string) {
    setCursoSelecionado(curso);
    setDropdownVisible(false);
  }

  return (
    <View style={addStyles.fieldWrapper}>
      <Text style={styles.label}>
        Curso <Text style={styles.required}>*</Text>
      </Text>

      <TouchableOpacity
        style={[styles.select, dropdownVisible && addStyles.selectFocused]}
        onPress={() => setDropdownVisible(!dropdownVisible)}
      >
        <Text style={cursoSelecionado ? styles.selectText : styles.placeholder}>
          {cursoSelecionado ?? "Selecione o curso..."}
        </Text>
        <Feather
          name={dropdownVisible ? "chevron-up" : "chevron-down"}
          size={20}
          color="#777"
        />
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={addStyles.dropdown}>
          {CURSOS.map((curso) => (
            <TouchableOpacity
              key={curso}
              style={[
                addStyles.dropdownItem,
                cursoSelecionado === curso && addStyles.dropdownItemSelected,
              ]}
              onPress={() => selecionarCurso(curso)}
            >
              {cursoSelecionado === curso && (
                <Feather
                  name="check"
                  size={16}
                  color="#0056D2"
                  style={{ marginRight: 8 }}
                />
              )}
              <Text
                style={[
                  addStyles.dropdownItemText,
                  cursoSelecionado === curso &&
                    addStyles.dropdownItemTextSelected,
                ]}
              >
                {curso}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

function TipoAtividadeField() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [tipoSelecionado, setTipoSelecionado] = useState<string | null>(null);

  function selecionarTipo(tipo: string) {
    setTipoSelecionado(tipo);
    setDropdownVisible(false);
  }

  const labelExibido = tipoSelecionado
    ? tipoSelecionado.length > 40
      ? tipoSelecionado.slice(0, 40) + "..."
      : tipoSelecionado
    : null;

  return (
    <View style={addStyles.fieldWrapper}>
      <Text style={styles.label}>
        Tipo de atividade <Text style={styles.required}>*</Text>
      </Text>

      <TouchableOpacity
        style={[styles.select, dropdownVisible && addStyles.selectFocused]}
        onPress={() => setDropdownVisible(!dropdownVisible)}
      >
        <Text
          style={tipoSelecionado ? styles.selectText : styles.placeholder}
          numberOfLines={1}
        >
          {labelExibido ?? "Selecione o tipo..."}
        </Text>
        <Feather
          name={dropdownVisible ? "chevron-up" : "chevron-down"}
          size={20}
          color="#777"
        />
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={addStyles.dropdown}>
          <ScrollView style={{ maxHeight: 300 }} nestedScrollEnabled>
            {TIPOS_ATIVIDADE.map((grupo) => (
              <View key={grupo.categoria}>
                <Text style={addStyles.dropdownCategoria}>
                  {grupo.categoria}
                </Text>
                {grupo.itens.map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={[
                      addStyles.dropdownItem,
                      tipoSelecionado === item &&
                        addStyles.dropdownItemSelected,
                    ]}
                    onPress={() => selecionarTipo(item)}
                  >
                    {tipoSelecionado === item && (
                      <Feather
                        name="check"
                        size={14}
                        color="#0056D2"
                        style={{ marginRight: 6 }}
                      />
                    )}
                    <Text
                      style={[
                        addStyles.dropdownItemText,
                        tipoSelecionado === item &&
                          addStyles.dropdownItemTextSelected,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const addStyles = StyleSheet.create({
  fieldWrapper: {
    marginBottom: 20,
    zIndex: 10,
  },

  selectFocused: {
    borderColor: "#0056D2",
    borderWidth: 2,
  },

  dropdown: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    backgroundColor: "#FFF",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },

  dropdownCategoria: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 6,
    fontSize: 13,
    fontWeight: "700",
    color: "#0056D2",
    backgroundColor: "#F0F6FF",
  },

  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  dropdownItemSelected: {
    backgroundColor: "#EFF6FF",
  },

  dropdownItemText: {
    fontSize: 14,
    color: "#374151",
    flex: 1,
    flexWrap: "wrap",
  },

  dropdownItemTextSelected: {
    color: "#0056D2",
    fontWeight: "600",
  },
});
