import { Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  analisarComIA,
  extrairTextoOcr,
  formatFileSize,
  processarCertificado,
  saveRejectedCertificado,
  uploadCertificado,
  validatePdfFile,
} from "../../services/certificates";
import { fetchCursosByIds, findAtividadeInGrupos } from "../../services/cursoService";

const MAX_OBSERVATION_LENGTH = 500;

function StepPill({ active, done, number, label }) {
  return (
    <View style={styles.stepItem}>
      <View
        style={[
          styles.stepCircle,
          active && styles.activeStepCircle,
          done && styles.doneStepCircle,
        ]}
      >
        <Text
          style={[
            styles.stepNumber,
            (active || done) && styles.activeStepNumber,
          ]}
        >
          {number}
        </Text>
      </View>

      <Text
        style={[
          styles.stepLabel,
          active && styles.activeStepLabel,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

function Stepper({ step }) {
  return (
    <View style={styles.stepper}>
      <StepPill number="1" label="Anexo" active={step === 1} done={step > 1} />
      <Feather name="chevron-right" size={14} color="#9CA3AF" />
      <StepPill number="2" label="Informações" active={step === 2} />
    </View>
  );
}

function FieldLabel({ children, required }) {
  return (
    <Text style={styles.fieldLabel}>
      {children}
      {required && <Text style={styles.required}> *</Text>}
    </Text>
  );
}

function OptionDropdown({ value, options, placeholder, open, disabled, onToggle, onSelect }) {
  const selected = options.find((option) => option.id === value);

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.courseSelectBox,
          open && styles.openCourseSelectBox,
          disabled && styles.disabledSelectBox,
        ]}
        activeOpacity={0.85}
        disabled={disabled}
        onPress={onToggle}
      >
        <Text
          style={[
            styles.courseSelectText,
            !selected && styles.placeholderText,
            disabled && styles.disabledSelectText,
          ]}
          numberOfLines={1}
        >
          {selected?.label || placeholder}
        </Text>

        <Feather
          name={open ? "chevron-up" : "chevron-down"}
          size={16}
          color="#9CA3AF"
        />
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdownList}>
          {options.map((option) => (
            <Pressable
              key={option.id}
              style={({ hovered, pressed }) => [
                styles.dropdownItem,
                (hovered || pressed) && styles.dropdownItemHovered,
              ]}
              onPress={() => onSelect(option.id)}
            >
              <Feather
                name="check"
                size={18}
                color={value === option.id ? "#111827" : "transparent"}
              />

              <Text style={styles.dropdownItemText} numberOfLines={1}>
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

function UploadDropZone({ disabled, onPress }) {
  return (
    <TouchableOpacity
      style={[
        styles.dropZone,
        disabled && styles.disabledDropZone,
      ]}
      activeOpacity={0.82}
      disabled={disabled}
      onPress={onPress}
    >
      <View style={styles.uploadCircle}>
        <Feather name="upload" size={24} color="#0A4D9B" />
      </View>

      <Text style={styles.dropTitle}>
        Toque para selecionar o arquivo
      </Text>

      <Text style={styles.dropSubtitle}>
        Apenas PDF • Máximo 10 MB
      </Text>
    </TouchableOpacity>
  );
}

function SelectedFileCard({ file, onRemove }) {
  if (!file) {
    return null;
  }

  return (
    <View style={styles.fileCard}>
      <View style={styles.fileIcon}>
        <Feather name="file-text" size={22} color="#F97316" />
      </View>

      <View style={styles.fileInfo}>
        <Text style={styles.fileName} numberOfLines={1}>
          {file.name}
        </Text>

        <Text style={styles.fileSize}>
          {formatFileSize(file.size)}
        </Text>
      </View>

      <TouchableOpacity style={styles.removeFileButton} activeOpacity={0.8} onPress={onRemove}>
        <Feather name="x" size={18} color="#4B5563" />
      </TouchableOpacity>
    </View>
  );
}

function AttachmentStep({
  cursoOptions,
  cursoId,
  courseDropdownOpen,
  selectedFile,
  fileError,
  processing,
  processingLabel,
  progress,
  onToggleCourseDropdown,
  onSelectCourse,
  onPickFile,
  onRemoveFile,
  onNext,
}) {
  const canContinue = cursoId && selectedFile && !processing;

  return (
    <>
      <FieldLabel required>Curso</FieldLabel>

      <OptionDropdown
        value={cursoId}
        options={cursoOptions}
        placeholder="Selecione o curso..."
        open={courseDropdownOpen}
        disabled={processing || cursoOptions.length === 0}
        onToggle={onToggleCourseDropdown}
        onSelect={onSelectCourse}
      />

      <UploadDropZone disabled={processing} onPress={onPickFile} />

      {fileError && (
        <Text style={styles.errorText}>
          {fileError}
        </Text>
      )}

      <SelectedFileCard file={selectedFile} onRemove={onRemoveFile} />

      {processing && (
        <View style={styles.processingArea}>
          <View style={styles.processingHeader}>
            <Text style={styles.processingText}>
              {processingLabel}
            </Text>
            {progress > 0 && progress < 100 && (
              <Text style={styles.processingPercent}>{progress}%</Text>
            )}
          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress || 100}%` }]} />
          </View>
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.primaryButton,
          (!canContinue || processing) && styles.disabledPrimaryButton,
        ]}
        activeOpacity={0.85}
        disabled={!canContinue}
        onPress={onNext}
      >
        {processing ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.primaryButtonText}>Próxima etapa</Text>
        )}

        {processing ? (
          <Text style={styles.primaryButtonText}>Processando...</Text>
        ) : (
          <Feather name="chevron-right" size={18} color="#FFFFFF" />
        )}
      </TouchableOpacity>
    </>
  );
}

function ExtractedTextBox({ text }) {
  return (
    <View style={styles.extractedBox}>
      <Text style={styles.extractedText}>
        {text || "Não foi possível extrair texto deste documento."}
      </Text>
    </View>
  );
}

function InfoStep({
  ocrText,
  aiSuggestionApplied,
  grupoOptions,
  grupoId,
  grupoDropdownOpen,
  onToggleGrupoDropdown,
  onSelectGrupo,
  atividadeOptions,
  categoriaId,
  categoriaDropdownOpen,
  onToggleCategoriaDropdown,
  onSelectCategoria,
  categoriaInfo,
  observacao,
  onChangeObservacao,
  onBack,
  onSend,
  submitting,
}) {
  return (
    <>
      <View style={styles.extractedTitleRow}>
        <Feather name="align-left" size={14} color="#0A4D9B" />
        <Text style={styles.extractedTitle}>Texto extraído automaticamente</Text>
      </View>

      <ExtractedTextBox text={ocrText} />

      {aiSuggestionApplied && (
        <View style={styles.aiBanner}>
          <Feather name="zap" size={13} color="#0A4D9B" />
          <Text style={styles.aiBannerText}>
            Campos preenchidos automaticamente pela IA. Revise antes de enviar.
          </Text>
        </View>
      )}

      <FieldLabel required>Tipo de atividade</FieldLabel>
      <OptionDropdown
        value={grupoId}
        options={grupoOptions}
        placeholder="Selecione o tipo..."
        open={grupoDropdownOpen}
        disabled={submitting}
        onToggle={onToggleGrupoDropdown}
        onSelect={onSelectGrupo}
      />

      <FieldLabel required>Descrição da atividade</FieldLabel>
      <OptionDropdown
        value={categoriaId}
        options={atividadeOptions}
        placeholder={grupoId ? "Selecione a descrição..." : "Selecione primeiro o tipo de atividade"}
        open={categoriaDropdownOpen}
        disabled={submitting || !grupoId}
        onToggle={onToggleCategoriaDropdown}
        onSelect={onSelectCategoria}
      />

      {categoriaInfo && (
        <View style={styles.hintBox}>
          <Text style={styles.hintText}>
            Máx.: <Text style={styles.hintStrong}>{categoriaInfo.horasMaximas || 0}h</Text>
          </Text>
          <Text style={styles.hintText}>
            Requisito: <Text style={styles.hintStrong}>{categoriaInfo.requisito}</Text>
          </Text>
        </View>
      )}

      <FieldLabel>Observação (opcional)</FieldLabel>

      <TextInput
        style={styles.textArea}
        multiline
        placeholder="Descreva o certificado, evento ou atividade..."
        placeholderTextColor="#6B7280"
        value={observacao}
        onChangeText={onChangeObservacao}
        maxLength={MAX_OBSERVATION_LENGTH}
        editable={!submitting}
      />

      <Text style={styles.counter}>{observacao.length}/{MAX_OBSERVATION_LENGTH}</Text>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.secondaryButton}
          activeOpacity={0.85}
          disabled={submitting}
          onPress={onBack}
        >
          <Feather name="arrow-left" size={18} color="#111827" />
          <Text style={styles.secondaryButtonText}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.sendFinalButton,
            (submitting || !categoriaId) && styles.disabledFinalButton,
          ]}
          activeOpacity={0.85}
          disabled={submitting || !categoriaId}
          onPress={onSend}
        >
          {submitting ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Feather name="send" size={18} color="#FFFFFF" />
          )}

          <Text style={styles.sendFinalButtonText}>
            {submitting ? "Enviando..." : "Enviar"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default function CertificateUploadModal({
  visible,
  user,
  userData,
  onClose,
  onSubmit = async () => {},
}) {
  const [step, setStep] = useState(1);
  const [cursos, setCursos] = useState([]);
  const [cursoId, setCursoId] = useState("");
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [processingLabel, setProcessingLabel] = useState("");
  const [progress, setProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(visible);

  const [tempStoragePath, setTempStoragePath] = useState(null);
  const [ocrText, setOcrText] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [grupoId, setGrupoId] = useState("");
  const [grupoDropdownOpen, setGrupoDropdownOpen] = useState(false);
  const [categoriaId, setCategoriaId] = useState("");
  const [categoriaDropdownOpen, setCategoriaDropdownOpen] = useState(false);
  const [observacao, setObservacao] = useState("");

  const { height, width } = useWindowDimensions();
  const isNarrow = width < 380;
  const closeDragDistance = height * 0.85;
  const translateY = useRef(new Animated.Value(height)).current;

  const animateOpen = useCallback(() => {
    translateY.setValue(height);

    Animated.timing(translateY, {
      toValue: 0,
      duration: 280,
      useNativeDriver: true,
    }).start();
  }, [height, translateY]);

  const animateClose = useCallback((callback = onClose) => {
    Animated.timing(translateY, {
      toValue: height,
      duration: 220,
      useNativeDriver: true,
    }).start(() => {
      setIsMounted(false);
      callback?.();
    });
  }, [height, onClose, translateY]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) =>
        gestureState.dy > 4 &&
        Math.abs(gestureState.dy) > Math.abs(gestureState.dx),
      onMoveShouldSetPanResponderCapture: (_, gestureState) =>
        gestureState.dy > 4 &&
        Math.abs(gestureState.dy) > Math.abs(gestureState.dx),
      onPanResponderMove: (_, gestureState) => {
        translateY.setValue(Math.max(0, gestureState.dy));
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > closeDragDistance) {
          animateClose();
          return;
        }

        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 120,
          friction: 18,
        }).start();
      },
    })
  ).current;

  useEffect(() => {
    if (!visible) {
      return;
    }

    setIsMounted(true);
    setStep(1);
    setSelectedFile(null);
    setFileError("");
    setProcessing(false);
    setProgress(0);
    setSubmitting(false);
    setTempStoragePath(null);
    setOcrText("");
    setAiSuggestion(null);
    setGrupoId("");
    setCategoriaId("");
    setObservacao("");
    setCourseDropdownOpen(false);
    setGrupoDropdownOpen(false);
    setCategoriaDropdownOpen(false);
    requestAnimationFrame(animateOpen);

    const cursoIds = userData?.cursoIds?.length
      ? userData.cursoIds
      : userData?.cursoId
      ? [userData.cursoId]
      : [];

    fetchCursosByIds(cursoIds).then((data) => {
      setCursos(data);
      setCursoId((current) => current || data[0]?.id || "");
    });
  }, [visible, animateOpen, userData?.cursoId, userData?.cursoIds]);

  const cursoSelecionado = cursos.find((curso) => curso.id === cursoId) || null;
  const gruposDisponiveis = cursoSelecionado?.regrasAtividades ?? [];
  const grupoSelecionado = gruposDisponiveis.find((grupo) => grupo.id === grupoId) || null;
  const categoriaInfo = categoriaId ? findAtividadeInGrupos(gruposDisponiveis, categoriaId) : null;

  const cursoOptions = cursos.map((curso) => ({
    id: curso.id,
    label: curso.codigo ? `${curso.nome} (${curso.codigo})` : curso.nome,
  }));
  const grupoOptions = gruposDisponiveis.map((grupo) => ({ id: grupo.id, label: grupo.label }));
  const atividadeOptions = (grupoSelecionado?.atividades || []).map((atividade) => ({
    id: atividade.id,
    label: `${atividade.id} - ${atividade.descricao}`,
  }));

  async function handlePickFile() {
    setFileError("");

    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (result.canceled) {
      return;
    }

    const file = result.assets?.[0];

    if (!file) {
      setFileError("Não foi possível ler o arquivo selecionado.");
      return;
    }

    const validationError = validatePdfFile(file);

    if (validationError) {
      setSelectedFile(null);
      setFileError(validationError);
      return;
    }

    setSelectedFile(file);
  }

  async function handleNext() {
    if (!cursoId) {
      setFileError("Selecione o curso para continuar.");
      return;
    }

    if (!selectedFile) {
      setFileError("Selecione um arquivo PDF para continuar.");
      return;
    }

    setFileError("");
    setProcessing(true);
    setProgress(0);
    setProcessingLabel("Enviando documento...");

    try {
      const storagePath = await uploadCertificado(
        selectedFile.uri,
        selectedFile.name,
        user.uid,
        setProgress
      );

      setTempStoragePath(storagePath);
      setProgress(0);
      setProcessingLabel("Extraindo texto do certificado...");

      let extractedText = "";

      try {
        const token = await user.getIdToken();
        const result = await extrairTextoOcr(storagePath, token);
        extractedText = result.text || "";
        setOcrText(extractedText);
      } catch {
        setOcrText("");
      }

      if (extractedText && gruposDisponiveis.length > 0) {
        setProcessingLabel("Analisando com IA...");

        try {
          const token = await user.getIdToken();
          const sugestao = await analisarComIA(extractedText, gruposDisponiveis, token);

          if (sugestao.grupoId && sugestao.categoriaId) {
            setAiSuggestion(sugestao);
            setGrupoId(sugestao.grupoId);
            setCategoriaId(sugestao.categoriaId);
          }
        } catch {
          // Análise com IA é best-effort.
        }
      }

      setStep(2);
    } catch {
      setFileError("Erro ao enviar o arquivo. Tente novamente.");
    } finally {
      setProcessing(false);
    }
  }

  function handleBack() {
    setStep(1);
    setTempStoragePath(null);
    setOcrText("");
    setAiSuggestion(null);
    setGrupoId("");
    setCategoriaId("");
  }

  async function handleSend() {
    if (!selectedFile || !tempStoragePath || !categoriaId || !cursoId) {
      return;
    }

    setSubmitting(true);

    const categoriaNome = categoriaInfo ? `${categoriaInfo.id} - ${categoriaInfo.descricao}` : null;
    const nomeAluno = user.displayName || userData?.nome || "Aluno";
    const emailAluno = user.email || userData?.email || "";

    try {
      const token = await user.getIdToken();

      await processarCertificado(
        {
          uid: user.uid,
          storagePath: tempStoragePath,
          nomeArquivo: selectedFile.name,
          categoriaId,
          categoriaNome,
          cursoId: cursoSelecionado?.id || cursoId,
          cursoNome: cursoSelecionado?.nome || null,
          cursoCodigo: cursoSelecionado?.codigo || null,
          nomeAluno,
          emailAluno,
          observacaoAluno: observacao,
        },
        token
      );

      Alert.alert("Certificado enviado", "Seu certificado foi recebido e aguarda análise.");
      await onSubmit();
      animateClose();
    } catch (error) {
      const motivo = error.message || "Erro ao validar o certificado";
      const isSecurityRejection =
        error.encontrados != null ||
        motivo.includes("segurança") ||
        motivo.includes("rejeitado") ||
        motivo.includes("inválido") ||
        motivo.includes("limite permitido");

      let rejectionReason = motivo;

      if (error.encontrados?.length) {
        rejectionReason = `Estruturas suspeitas: ${error.encontrados.join(", ")}`;
      } else if (motivo.includes("limite permitido")) {
        rejectionReason = "Arquivo acima do tamanho máximo permitido";
      } else if (motivo.includes("inválido")) {
        rejectionReason = "O arquivo não é um PDF válido";
      }

      if (isSecurityRejection) {
        try {
          await saveRejectedCertificado({
            uid: user.uid,
            nomeAluno,
            emailAluno,
            nomeArquivo: selectedFile.name,
            motivoRejeicao: rejectionReason,
            encontrados: error.encontrados,
            categoriaId,
            categoriaNome,
            cursoId: cursoSelecionado?.id || cursoId,
            cursoNome: cursoSelecionado?.nome || null,
            cursoCodigo: cursoSelecionado?.codigo || null,
          });
        } catch {
          // Falha ao registrar a rejeição não deve travar o fluxo do usuário.
        }

        Alert.alert("Documento rejeitado", rejectionReason);
        await onSubmit();
        animateClose();
      } else {
        Alert.alert("Erro ao enviar certificado", motivo);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal
      visible={isMounted}
      transparent
      animationType="none"
      onRequestClose={() => animateClose()}
    >
      <View style={styles.overlay}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.modalCard,
            {
              maxHeight: height - 24,
              transform: [{ translateY }],
            },
            isNarrow && styles.narrowModalCard,
          ]}
        >
          <SafeAreaView
            edges={["left", "right", "bottom"]}
            style={styles.safeArea}
          >
            <View style={styles.dragArea}>
              <View style={styles.handle} />

              <Text style={styles.title}>Enviar certificado</Text>

              <Text style={styles.subtitle}>
                {step === 1
                  ? "Selecione o arquivo PDF do certificado"
                  : "Revise o texto extraído e preencha as informações"}
              </Text>
            </View>

            <Stepper step={step} />

            <View style={styles.content}>
              {step === 1 ? (
                <AttachmentStep
                  cursoOptions={cursoOptions}
                  cursoId={cursoId}
                  courseDropdownOpen={courseDropdownOpen}
                  selectedFile={selectedFile}
                  fileError={fileError}
                  processing={processing}
                  processingLabel={processingLabel}
                  progress={progress}
                  onToggleCourseDropdown={() => setCourseDropdownOpen((current) => !current)}
                  onSelectCourse={(id) => {
                    setCursoId(id);
                    setCourseDropdownOpen(false);
                    setFileError("");
                  }}
                  onPickFile={handlePickFile}
                  onRemoveFile={() => setSelectedFile(null)}
                  onNext={handleNext}
                />
              ) : (
                <InfoStep
                  ocrText={ocrText}
                  aiSuggestionApplied={Boolean(aiSuggestion)}
                  grupoOptions={grupoOptions}
                  grupoId={grupoId}
                  grupoDropdownOpen={grupoDropdownOpen}
                  onToggleGrupoDropdown={() => setGrupoDropdownOpen((current) => !current)}
                  onSelectGrupo={(id) => {
                    setGrupoId(id);
                    setCategoriaId("");
                    setGrupoDropdownOpen(false);
                  }}
                  atividadeOptions={atividadeOptions}
                  categoriaId={categoriaId}
                  categoriaDropdownOpen={categoriaDropdownOpen}
                  onToggleCategoriaDropdown={() => setCategoriaDropdownOpen((current) => !current)}
                  onSelectCategoria={(id) => {
                    setCategoriaId(id);
                    setCategoriaDropdownOpen(false);
                  }}
                  categoriaInfo={categoriaInfo}
                  observacao={observacao}
                  onChangeObservacao={setObservacao}
                  onBack={handleBack}
                  onSend={handleSend}
                  submitting={submitting}
                />
              )}
            </View>
          </SafeAreaView>

        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.76)",
    justifyContent: "flex-end",
    paddingHorizontal: 4,
  },

  modalCard: {
    backgroundColor: "#F8FAFC",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },

  narrowModalCard: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },

  safeArea: {
    flexShrink: 1,
  },

  dragArea: {
    paddingTop: 14,
  },

  handle: {
    alignSelf: "center",
    width: 100,
    height: 7,
    borderRadius: 999,
    backgroundColor: "#EEF2F6",
    marginBottom: 14,
  },

  title: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 24,
    textAlign: "center",
  },

  subtitle: {
    color: "#6B7280",
    fontSize: 15,
    lineHeight: 21,
    marginTop: 4,
    paddingHorizontal: 34,
    textAlign: "center",
  },

  stepper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    marginTop: 18,
    marginBottom: 12,
  },

  stepItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  stepCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },

  activeStepCircle: {
    backgroundColor: "#0A4D9B",
  },

  doneStepCircle: {
    backgroundColor: "#E5E7EB",
  },

  stepNumber: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "800",
  },

  activeStepNumber: {
    color: "#FFFFFF",
  },

  stepLabel: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "800",
    marginRight: 8,
  },

  activeStepLabel: {
    color: "#0A4D9B",
  },

  content: {
    paddingHorizontal: 18,
    paddingBottom: 20,
  },

  fieldLabel: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 10,
  },

  required: {
    color: "#DC2626",
  },

  courseSelectBox: {
    minHeight: 46,
    borderWidth: 1,
    borderColor: "#D9E2EC",
    borderRadius: 7,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  openCourseSelectBox: {
    borderColor: "#0A4D9B",
  },

  disabledSelectBox: {
    backgroundColor: "#F8FAFC",
  },

  courseSelectText: {
    color: "#1F2937",
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
    marginRight: 10,
  },

  placeholderText: {
    color: "#9CA3AF",
    fontWeight: "400",
  },

  disabledSelectText: {
    color: "#9CA3AF",
  },

  dropdownList: {
    borderWidth: 1,
    borderColor: "#D9E2EC",
    borderRadius: 7,
    backgroundColor: "#FFFFFF",
    marginTop: 8,
    overflow: "hidden",
  },

  dropdownItem: {
    minHeight: 46,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 10,
  },

  dropdownItemHovered: {
    backgroundColor: "#F1F5F9",
  },

  dropdownItemText: {
    flex: 1,
    color: "#1F2937",
    fontSize: 14,
    fontWeight: "600",
  },

  dropZone: {
    minHeight: 168,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#92B8E2",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    paddingHorizontal: 26,
  },

  disabledDropZone: {
    opacity: 0.44,
  },

  uploadCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#E4ECF7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  dropTitle: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
  },

  dropSubtitle: {
    color: "#6B7280",
    fontSize: 12,
    lineHeight: 17,
    marginTop: 6,
    textAlign: "center",
  },

  errorText: {
    color: "#DC2626",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 8,
  },

  fileCard: {
    minHeight: 74,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E2EC",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 16,
  },

  fileIcon: {
    width: 38,
    height: 38,
    borderRadius: 9,
    backgroundColor: "#FFF3E5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  fileInfo: {
    flex: 1,
    marginRight: 10,
  },

  fileName: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "800",
  },

  fileSize: {
    color: "#6B7280",
    fontSize: 12,
    marginTop: 2,
  },

  removeFileButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },

  processingArea: {
    marginTop: 16,
  },

  processingHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  processingText: {
    color: "#6B7280",
    fontSize: 14,
    flex: 1,
  },

  processingPercent: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "700",
  },

  progressTrack: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 999,
    overflow: "hidden",
    marginTop: 10,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#0A4D9B",
  },

  primaryButton: {
    height: 44,
    borderRadius: 7,
    backgroundColor: "#0A4D9B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    gap: 8,
  },

  disabledPrimaryButton: {
    backgroundColor: "#88AFD2",
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  extractedTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 8,
  },

  extractedTitle: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "800",
    marginLeft: 8,
  },

  extractedBox: {
    minHeight: 90,
    maxHeight: 140,
    borderWidth: 1,
    borderColor: "#D9E2EC",
    borderRadius: 7,
    backgroundColor: "#FFFFFF",
    padding: 10,
  },

  extractedText: {
    color: "#5E6B7E",
    fontSize: 11,
    lineHeight: 18,
    fontFamily: "monospace",
  },

  aiBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#EAF1FB",
    borderWidth: 1,
    borderColor: "#C7DBF2",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 10,
  },

  aiBannerText: {
    flex: 1,
    color: "#0A4D9B",
    fontSize: 12,
    fontWeight: "600",
  },

  hintBox: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F8FAFC",
    borderRadius: 7,
    padding: 10,
    marginTop: 8,
    gap: 4,
  },

  hintText: {
    color: "#6B7280",
    fontSize: 12,
  },

  hintStrong: {
    color: "#111827",
    fontWeight: "700",
  },

  textArea: {
    minHeight: 80,
    borderWidth: 1,
    borderColor: "#D9E2EC",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: "#111827",
    fontSize: 14,
    lineHeight: 20,
    textAlignVertical: "top",
  },

  counter: {
    color: "#6B7280",
    fontSize: 12,
    textAlign: "right",
    marginTop: 6,
  },

  actionRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 18,
  },

  secondaryButton: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: "#D9E2EC",
    borderRadius: 7,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  secondaryButtonText: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "700",
  },

  sendFinalButton: {
    flex: 1,
    height: 44,
    borderRadius: 7,
    backgroundColor: "#0A4D9B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  disabledFinalButton: {
    opacity: 0.72,
  },

  sendFinalButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
});
