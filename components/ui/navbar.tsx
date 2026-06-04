import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/senaclogo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.rightContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowNotifications(true)}
          >
            <Feather
              name="bell-off"
              size={20}
              color="#555"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>TF</Text>
            </View>

            <Feather
              name="user"
              size={18}
              color="#2B5CAB"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomBorder} />

      <Modal
        transparent
        animationType="fade"
        visible={showNotifications}
        onRequestClose={() => setShowNotifications(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.overlay}
          onPress={() => setShowNotifications(false)}
        >
          <View style={styles.notificationModal}>
            <Text style={styles.modalTitle}>
              Notificações
            </Text>

            <Text style={styles.modalSubtitle}>
              Notificações desativadas no navegador.
            </Text>

            <View style={styles.divider} />

            <View style={styles.emptyContainer}>
              <Feather
                name="bell"
                size={42}
                color="#C7CCD4"
              />

              <Text style={styles.emptyText}>
                Nenhuma notificação
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    backgroundColor: "#F5F5F5",
  },

  container: {
    width: "100%",
    height: 75,

    paddingHorizontal: screenWidth < 768 ? 20 : 40,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    width: 120,
    height: 40,
  },

  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconButton: {
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
  },

  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECECEC",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 8,
  },

  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#D9E5F7",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontWeight: "700",
    color: "#2B5CAB",
  },

  bottomBorder: {
    height: 2,
    backgroundColor: "#0b74f5",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.15)",
  },

  notificationModal: {
    position: "absolute",
    top: 80,
    right: 20,

    width: 350,

    backgroundColor: "#FFF",

    borderRadius: 14,

    borderWidth: 1,
    borderColor: "#E5E7EB",

    overflow: "hidden",

    elevation: 10,
  },

  modalTitle: {
    paddingTop: 20,
    paddingHorizontal: 20,

    fontSize: 18,
    fontWeight: "700",
  },

  modalSubtitle: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,

    color: "#6B7280",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
  },

  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },

  emptyText: {
    marginTop: 12,
    color: "#6B7280",
    fontSize: 16,
  },
});