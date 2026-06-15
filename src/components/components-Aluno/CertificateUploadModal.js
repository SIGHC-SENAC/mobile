import { Feather, Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
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
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COURSE_OPTIONS = [
  "ANÁLISE E DESENVOLVIMENTO DE SISTEMAS (66302)",
];
const DEFAULT_COURSE = COURSE_OPTIONS[0];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

function formatFileSize(size) {
  const numericSize = Number(size || 0);

  if (!numericSize) {
    return "0.00 MB";
  }

  const megabytes = numericSize / (1024 * 1024);
  return `${megabytes.toFixed(2)} MB`;
}

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

function CourseDropdown({ value, open, disabled, onToggle, onSelect }) {
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
            disabled && styles.disabledSelectText,
          ]}
          numberOfLines={1}
        >
          {value || DEFAULT_COURSE}
        </Text>

        <Feather
          name={open ? "chevron-up" : "chevron-down"}
          size={16}
          color="#9CA3AF"
        />
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdownList}>
          {COURSE_OPTIONS.map((course) => (
            <Pressable
              key={course}
              style={({ hovered, pressed }) => [
                styles.dropdownItem,
                (hovered || pressed) && styles.dropdownItemHovered,
              ]}
              onPress={() => onSelect(course)}
            >
              <Feather
                name="check"
                size={18}
                color={value === course ? "#111827" : "transparent"}
              />

              <Text
                style={styles.dropdownItemText}
                numberOfLines={1}
              >
                {course}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

function SelectBox({ value, disabled }) {
  return (
    <View
      style={[
        styles.selectBox,
        disabled && styles.disabledSelectBox,
      ]}
    >
      <Text
        style={[
          styles.selectText,
          disabled && styles.disabledSelectText,
        ]}
        numberOfLines={1}
      >
        {value}
      </Text>

      <Feather name="chevron-down" size={16} color="#9CA3AF" />
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
        PDF, imagem ou foto • Máximo 10 MB
      </Text>
    </TouchableOpacity>
  );
}

function SelectedFileCard({ file, onRemove }) {
  if (!file) {
    return null;
  }

  const icon = file.kind === "pdf" ? "document-text-outline" : "image-outline";

  return (
    <View style={styles.fileCard}>
      <View style={styles.fileIcon}>
        <Ionicons name={icon} size={22} color="#F97316" />
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
  selectedCourse,
  courseDropdownOpen,
  selectedFile,
  fileError,
  processing,
  onToggleCourseDropdown,
  onSelectCourse,
  onOpenUploadOptions,
  onRemoveFile,
  onNext,
}) {
  const canContinue = selectedCourse && selectedFile && !processing;

  return (
    <>
      <FieldLabel required>Curso</FieldLabel>

      <CourseDropdown
        value={selectedCourse}
        open={courseDropdownOpen}
        disabled={processing}
        onToggle={onToggleCourseDropdown}
        onSelect={onSelectCourse}
      />

      <UploadDropZone disabled={processing} onPress={onOpenUploadOptions} />

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
              Enviando e analisando documento...
            </Text>
            <Text style={styles.processingPercent}>100%</Text>
          </View>

          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
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

function ExtractedTextBox({ file }) {
  return (
    <View style={styles.extractedBox}>
      <Text style={styles.extractedText}>
        {file?.name
          ? `Arquivo selecionado: ${file.name}. O texto extraído será preenchido pela API após a análise do certificado.`
          : "Nenhum arquivo selecionado."}
      </Text>
    </View>
  );
}

function InfoStep({ selectedFile, onBack, onSend, submitting }) {
  return (
    <>
      <View style={styles.extractedTitleRow}>
        <Feather name="align-left" size={14} color="#0A4D9B" />
        <Text style={styles.extractedTitle}>Texto extraído automaticamente</Text>
      </View>

      <ExtractedTextBox file={selectedFile} />

      <Text style={styles.helperText}>
        Use como referência para preencher as informações abaixo.
      </Text>

      <FieldLabel required>Tipo de atividade</FieldLabel>
      <SelectBox value="Selecione o tipo..." />

      <FieldLabel required>Descrição da atividade</FieldLabel>
      <SelectBox value="Selecione primeiro o tipo de atividade" disabled />

      <FieldLabel>Observação (opcional)</FieldLabel>

      <View style={styles.textArea}>
        <Text style={styles.textAreaPlaceholder}>
          Descreva o certificado, evento ou atividade...
        </Text>
      </View>

      <Text style={styles.counter}>0/500</Text>

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
            submitting && styles.disabledFinalButton,
          ]}
          activeOpacity={0.85}
          disabled={submitting}
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
  onClose,
  onSubmit = async () => {},
}) {
  const [step, setStep] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState(DEFAULT_COURSE);
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(visible);
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
    if (visible) {
      setIsMounted(true);
      setStep(1);
      setSelectedCourse(DEFAULT_COURSE);
      setCourseDropdownOpen(false);
      setSelectedFile(null);
      setFileError("");
      setProcessing(false);
      setSubmitting(false);
      requestAnimationFrame(animateOpen);
    }
  }, [visible, animateOpen]);

  function validateSelectedFile(file) {
    const fileWithSize = {
      ...file,
      size: Number(file.size || 0),
    };

    if (fileWithSize.size && fileWithSize.size > MAX_FILE_SIZE) {
      setSelectedFile(null);
      setFileError("O arquivo precisa ter no máximo 10 MB.");
      return false;
    }

    // Only one file is allowed. Every new selection replaces the previous file.
    setFileError("");
    setSelectedFile(fileWithSize);
    return true;
  }

  async function handlePickPdf() {
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

    const isPdf = file.mimeType === "application/pdf" || file.name?.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setSelectedFile(null);
      setFileError("Selecione um arquivo em formato PDF.");
      return;
    }

    validateSelectedFile({
      kind: "pdf",
      uri: file.uri,
      name: file.name,
      size: file.size,
      mimeType: file.mimeType || "application/pdf",
    });
  }

  async function handlePickImage() {
    setFileError("");

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      setFileError("Permita acesso à galeria para selecionar uma imagem.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    const image = result.assets?.[0];

    if (!image) {
      setFileError("Não foi possível ler a imagem selecionada.");
      return;
    }

    validateSelectedFile({
      kind: "image",
      uri: image.uri,
      name: image.fileName || `imagem-${Date.now()}.jpg`,
      size: image.fileSize,
      mimeType: image.mimeType || "image/jpeg",
    });
  }

  async function handleTakePhoto() {
    setFileError("");

    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      setFileError("Permita acesso à câmera para tirar uma foto.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    const photo = result.assets?.[0];

    if (!photo) {
      setFileError("Não foi possível ler a foto tirada.");
      return;
    }

    validateSelectedFile({
      kind: "photo",
      uri: photo.uri,
      name: photo.fileName || `foto-${Date.now()}.jpg`,
      size: photo.fileSize,
      mimeType: photo.mimeType || "image/jpeg",
    });
  }

  function handleOpenUploadOptions() {
    Alert.alert(
      "Selecionar arquivo",
      "Escolha de onde deseja enviar o certificado.",
      [
        {
          text: "Arquivo PDF",
          onPress: handlePickPdf,
        },
        {
          text: "Imagem da galeria",
          onPress: handlePickImage,
        },
        {
          text: "Tirar foto",
          onPress: handleTakePhoto,
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]
    );
  }

  function handleNext() {
    if (!selectedCourse) {
      setFileError("Selecione o curso para continuar.");
      return;
    }

    if (!selectedFile) {
      setFileError("Selecione um arquivo, imagem ou foto para continuar.");
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      setStep(2);
    }, 900);
  }

  async function handleSend() {
    if (!selectedFile) {
      setStep(1);
      setFileError("Selecione um arquivo para enviar.");
      return;
    }

    setSubmitting(true);

    await onSubmit({
      file: selectedFile,
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
      courseName: selectedCourse,
      extractedText: `Arquivo selecionado: ${selectedFile.name}`,
      activityType: null,
      activityDescription: null,
      observation: "",
    });

    setSubmitting(false);
    animateClose();
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
                  ? "Selecione o arquivo do certificado"
                  : "Revise o texto extraído e preencha as informações"}
              </Text>
            </View>

            <Stepper step={step} />

            <View style={styles.content}>
              {step === 1 ? (
                <AttachmentStep
                  selectedCourse={selectedCourse}
                  courseDropdownOpen={courseDropdownOpen}
                  selectedFile={selectedFile}
                  fileError={fileError}
                  processing={processing}
                  onToggleCourseDropdown={() => setCourseDropdownOpen((current) => !current)}
                  onSelectCourse={(course) => {
                    setSelectedCourse(course);
                    setCourseDropdownOpen(false);
                    setFileError("");
                  }}
                  onOpenUploadOptions={() => {
                    setCourseDropdownOpen(false);
                    handleOpenUploadOptions();
                  }}
                  onRemoveFile={() => setSelectedFile(null)}
                  onNext={handleNext}
                />
              ) : (
                <InfoStep
                  selectedFile={selectedFile}
                  onBack={() => setStep(1)}
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

  selectBox: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: "#D9E2EC",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
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

  selectText: {
    color: "#374151",
    fontSize: 14,
    flex: 1,
    marginRight: 10,
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
    width: "100%",
    height: "100%",
    backgroundColor: "#0A4D9B",
    borderRightWidth: 18,
    borderRightColor: "#F97316",
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
    minHeight: 112,
    borderWidth: 1,
    borderColor: "#D9E2EC",
    borderRadius: 7,
    backgroundColor: "#FFFFFF",
    padding: 10,
  },

  extractedText: {
    color: "#5E6B7E",
    fontSize: 11,
    lineHeight: 20,
    fontFamily: "monospace",
  },

  helperText: {
    color: "#6B7280",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 8,
  },

  textArea: {
    minHeight: 80,
    borderWidth: 1,
    borderColor: "#D9E2EC",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  textAreaPlaceholder: {
    color: "#6B7280",
    fontSize: 14,
    lineHeight: 20,
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
