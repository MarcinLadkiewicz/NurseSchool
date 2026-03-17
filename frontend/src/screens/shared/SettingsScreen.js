import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";
import { darkTheme as colors } from "../../theme/colors";

const SettingsScreen = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro de que quieres salir?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Salir", style: "destructive", onPress: logout },
    ]);
  };

  const getInitials = () => {
    return user?.nombre?.charAt(0)?.toUpperCase() || "?";
  };

  const getRolLabel = (rol) => {
    switch (rol) {
      case "enfermero":
        return "Enfermero/a";
      case "padre":
        return "Padre / Tutor";
      case "direccion":
        return "Equipo Directivo";
      default:
        return rol;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes</Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitials()}</Text>
        </View>
        <Text style={styles.userName}>{user?.nombre}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
        <View style={styles.rolBadge}>
          <Text style={styles.rolText}>{getRolLabel(user?.rol)}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>CUENTA</Text>
        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={18} color={colors.textMuted} />
          <Text style={styles.infoLabel}>Nombre</Text>
          <Text style={styles.infoValue}>{user?.nombre}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={18} color={colors.textMuted} />
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{user?.email}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Ionicons name="shield-outline" size={18} color={colors.textMuted} />
          <Text style={styles.infoLabel}>Rol</Text>
          <Text style={styles.infoValue}>{getRolLabel(user?.rol)}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>APLICACIÓN</Text>
        <View style={styles.infoRow}>
          <Ionicons
            name="information-circle-outline"
            size={18}
            color={colors.textMuted}
          />
          <Text style={styles.infoLabel}>Versión</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Ionicons name="school-outline" size={18} color={colors.textMuted} />
          <Text style={styles.infoLabel}>Proyecto</Text>
          <Text style={styles.infoValue}>TFG 2º DAM</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color={colors.danger} />
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 20,
  },

  profileCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  rolBadge: {
    marginTop: 10,
    backgroundColor: colors.accentSoft,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 12,
  },
  rolText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
    letterSpacing: 0.5,
    marginBottom: 14,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 10,
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.dangerBg,
    borderRadius: 14,
    paddingVertical: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.danger,
  },
});

export default SettingsScreen;
