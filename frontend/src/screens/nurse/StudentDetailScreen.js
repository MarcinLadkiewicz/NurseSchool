import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { darkTheme as colors } from "../../theme/colors";
import formatTime from "../../utils/formatTime";
import api from "../../api/axios";

const StudentDetailScreen = ({ route, navigation }) => {

  const { id } = route.params;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStudent = async () => {
    try {
      const res = await api.get(`/students/${id}`);
      setData(res.data);
    } catch (err) {
      console.log("Error cargando alumno:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudent();
  }, [route.params?.updated]);

  const getAge = (birthdate) => {
    if (!birthdate) return "";
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return `${age} años`;
  };

  const getInitials = (name, surname) => {
    const first = name?.charAt(0) || "";
    const last = surname?.charAt(0) || "";
    return `${first}${last}`.toUpperCase();
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "alta":
        return { bg: colors.dangerBg, text: colors.danger };
      case "media":
        return { bg: colors.warningBg, text: colors.warning };
      case "baja":
        return { bg: colors.successBg, text: colors.success };
      default:
        return { bg: colors.dangerBg, text: colors.danger };
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.emptyText}>Alumno no encontrado</Text>
      </View>
    );
  }

  const { student, allergies, pathologies, attentions } = data;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header con botón volver */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={22} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ficha del alumno</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
                console.log('student: ', student)
                navigation.navigate("EditStudent", { student })
            }}
          >
            <Ionicons name="create-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Tarjeta principal: avatar + nombre + curso + badges */}
        <View style={styles.card}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarText}>
              {getInitials(student.name, student.surname)}
            </Text>
          </View>
          <Text style={styles.studentName}>
            {student.name} {student.surname}
          </Text>
          <Text style={styles.studentMeta}>
            {student.course} · {getAge(student.birthdate)}
          </Text>

          {/* Badges de alergias */}
          {allergies.length > 0 && (
            <View style={styles.badgesRow}>
              {allergies.map((allergy) => {
                const severityColor = getSeverityColor(allergy.severity);
                return (
                  <View
                    key={allergy.id}
                    style={[
                      styles.allergyBadge,
                      { backgroundColor: severityColor.bg },
                    ]}
                  >
                    <Ionicons
                      name="warning"
                      size={12}
                      color={severityColor.text}
                    />
                    <Text
                      style={[
                        styles.allergyBadgeText,
                        { color: severityColor.text },
                      ]}
                    >
                      {allergy.allergy_description.split("(")[0].trim()}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>

        {/* Sección Contacto */}
        {student.parent_name && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>CONTACTO</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Padre/Madre</Text>
              <Text style={styles.infoValue}>{student.parent_name}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{student.parent_email}</Text>
            </View>
          </View>
        )}

        {/* Sección Alergias */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>ALERGIAS</Text>
          {allergies.length > 0 ? (
            allergies.map((allergy, index) => (
              <View key={allergy.id}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>
                    {allergy.allergy_type.charAt(0).toUpperCase() +
                      allergy.allergy_type.slice(1)}
                  </Text>
                  <Text style={styles.infoValue}>
                    {allergy.allergy_description}
                  </Text>
                </View>
                {index < allergies.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))
          ) : (
            <Text style={styles.emptySection}>Sin alergias registradas</Text>
          )}
        </View>

        {/* Sección Patologías */}
        {pathologies.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>PATOLOGÍAS</Text>
            {pathologies.map((pathology, index) => (
              <View key={pathology.id}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>
                    {pathology.pathology_name}
                  </Text>
                  <Text style={styles.infoValue} numberOfLines={2}>
                    {pathology.pathology_description}
                  </Text>
                </View>
                {pathology.added_file && (
                  <TouchableOpacity style={styles.fileButton}>
                    <Ionicons
                      name="document-attach-outline"
                      size={14}
                      color={colors.primary}
                    />
                    <Text style={styles.fileButtonText}>Ver informe</Text>
                  </TouchableOpacity>
                )}
                {index < pathologies.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))}
          </View>
        )}

        {/* Sección Historial */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>HISTORIAL</Text>
            {attentions.length > 3 && (
              <TouchableOpacity>
                <Text style={styles.viewAll}>Ver todo →</Text>
              </TouchableOpacity>
            )}
          </View>
          {attentions.length > 0 ? (
            attentions.slice(0, 5).map((attention, index) => (
              <View key={attention.id}>
                <TouchableOpacity
                  style={styles.attentionRow}
                  onPress={() =>
                    navigation.navigate("AttentionDetail", { id: attention.id })
                  }
                >
                  <View style={styles.attentionIcon}>
                    <Ionicons
                      name="time-outline"
                      size={18}
                      color={colors.primary}
                    />
                  </View>
                  <View style={styles.attentionInfo}>
                    <Text style={styles.attentionReason}>
                      {attention.reason}
                    </Text>
                    <Text style={styles.attentionMeta}>
                      {attention.actuation} ·{" "}
                      {formatTime(attention.attention_date)}
                    </Text>
                  </View>
                </TouchableOpacity>
                {index < Math.min(attentions.length, 5) - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))
          ) : (
            <Text style={styles.emptySection}>Sin atenciones registradas</Text>
          )}
        </View>

        {/* Botones de acción */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              navigation.navigate("NewAttention", { studentId: id })
            }
          >
            <Ionicons name="pulse-outline" size={18} color={colors.primary} />
            <Text style={styles.actionButtonText}>Nueva atención</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("NewAllergy", { student_id: id })}
          >
            <Ionicons name="warning-outline" size={18} color={colors.warning} />
            <Text style={styles.actionButtonText}>Nueva alergia</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
    marginLeft: 14,
  },
  editButton: {
    marginLeft: "auto",
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },

  avatarLarge: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 14,
  },
  avatarText: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  studentName: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
    textAlign: "center",
  },
  studentMeta: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 4,
  },

  badgesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 14,
    gap: 8,
  },
  allergyBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
  },
  allergyBadgeText: {
    fontSize: 12,
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
    letterSpacing: 0.5,
    marginBottom: 14,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  viewAll: {
    fontSize: 13,
    color: colors.textSecondary,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
    maxWidth: "55%",
    textAlign: "right",
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },

  fileButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
    paddingVertical: 4,
  },
  fileButtonText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: "500",
  },

  attentionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  attentionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accentSoft,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  attentionInfo: {
    flex: 1,
  },
  attentionReason: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  attentionMeta: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },

  actionsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 4,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
  },
  emptySection: {
    fontSize: 13,
    color: colors.textMuted,
    fontStyle: "italic",
  },
});

export default StudentDetailScreen;
