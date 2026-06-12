import React, { useEffect, useRef, useState } from "react";
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const PANEL_WIDTH = 290;
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: "view-dashboard-outline" },
  { id: "history", label: "Histórico", icon: "history" },
  { id: "guide", label: "Orientações", icon: "book-open-outline" },
];

export default function SideMenuModalAluno({
  visible,
  activeScreen = "dashboard",
  onClose,
  onNavigate,
  onLogout,
}) {
  const [mounted, setMounted] = useState(visible);
  const slideX = useRef(new Animated.Value(-PANEL_WIDTH)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setMounted(true);
      slideX.setValue(-PANEL_WIDTH);
      backdropOpacity.setValue(0);

      Animated.parallel([
        Animated.spring(slideX, {
          toValue: 0,
          damping: 24,
          stiffness: 190,
          mass: 0.85,
          overshootClamping: true,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 240,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideX, backdropOpacity]);

  function closeWithAnimation(callback = onClose) {
    Animated.parallel([
      Animated.timing(slideX, {
        toValue: -PANEL_WIDTH,
        duration: 210,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setMounted(false);
      callback?.();
    });
  }

  function handleNavigate(screen) {
    closeWithAnimation(() => {
      onNavigate?.(screen);
      onClose?.();
    });
  }

  function handleLogout() {
    closeWithAnimation(() => {
      onClose?.();
      onLogout?.();
    });
  }

  return (
    <Modal
      visible={mounted}
      transparent
      animationType="none"
      onRequestClose={() => closeWithAnimation()}
    >
      <View style={styles.root}>
        <AnimatedTouchable
          activeOpacity={1}
          onPress={() => closeWithAnimation()}
          style={[
            styles.backdrop,
            {
              opacity: backdropOpacity,
            },
          ]}
        />

        <Animated.View
          style={[
            styles.panelWrapper,
            {
              transform: [{ translateX: slideX }],
            },
          ]}
        >
          <SafeAreaView
            edges={["top", "bottom", "left"]}
            style={styles.panel}
          >
            <View style={styles.header}>
              <Text style={styles.menuLabel}>MENU</Text>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => closeWithAnimation()}
                activeOpacity={0.8}
              >
                <Feather
                  name="x"
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.items}>
              {menuItems.map((item) => {
                const active = activeScreen === item.id;

                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.menuItem,
                      active && styles.activeMenuItem,
                    ]}
                    onPress={() => handleNavigate(item.id)}
                    activeOpacity={0.85}
                  >
                    <View
                      style={[
                        styles.iconBox,
                        active && styles.activeIconBox,
                      ]}
                    >
                      <MaterialCommunityIcons
                        name={item.icon}
                        size={19}
                        color={active ? "#FFFFFF" : "#6B7280"}
                      />
                    </View>

                    <Text
                      style={[
                        styles.itemText,
                        active && styles.activeItemText,
                      ]}
                    >
                      {item.label}
                    </Text>

                    {active && <View style={styles.activeDot} />}
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
                activeOpacity={0.8}
              >
                <Feather
                  name="log-out"
                  size={16}
                  color="#EF4444"
                />

                <Text style={styles.logoutText}>Sair</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "flex-start",
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.72)",
  },

  panelWrapper: {
    width: "77%",
    maxWidth: PANEL_WIDTH,
    height: "100%",
  },

  panel: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
  },

  header: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 8,
  },

  menuLabel: {
    color: "#6B7280",
    fontSize: 11,
    letterSpacing: 1,
  },

  closeButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },

  items: {
    paddingTop: 2,
  },

  menuItem: {
    minHeight: 50,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 2,
  },

  activeMenuItem: {
    backgroundColor: "#0A4D9B",
    borderWidth: 2,
    borderColor: "#0A4D9B",
  },

  iconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#EEF2F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  activeIconBox: {
    backgroundColor: "rgba(255, 255, 255, 0.16)",
  },

  itemText: {
    flex: 1,
    color: "#52627A",
    fontSize: 15,
    fontWeight: "500",
  },

  activeItemText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#D8EBFF",
  },

  footer: {
    marginTop: "auto",
    borderTopWidth: 1,
    borderTopColor: "#D7E0EA",
    paddingVertical: 18,
    alignItems: "center",
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoutText: {
    color: "#EF4444",
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 8,
  },
});
