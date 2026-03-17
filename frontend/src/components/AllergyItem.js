import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { darkTheme as colors } from "../theme/colors";
import getSeverityStyle from '../utils/getSeverityStyle';
import getInitials from "../utils/getInitials";

const AllergyItem = ({ item, navigation}) => {
  const severity = getSeverityStyle(item.severity);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("StudentDetail", { id: item.student_id })
      }
    >
      {/* Avatar con iniciales */}
      <View style={[styles.avatar, { backgroundColor: severity.bg }]}>
        <Text style={[styles.avatarText, { color: severity.text }]}>
          {getInitials(item.student_name, item.student_surname)}
        </Text>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name}>
          {item.student_name} {item.student_surname}
        </Text>
        <Text style={styles.description} numberOfLines={1}>
          {item.allergy_description}
        </Text>
        <Text style={styles.meta}>
          {item.allergy_type.charAt(0).toUpperCase() +
            item.allergy_type.slice(1)}{" "}
          · {item.course}
        </Text>
      </View>

      {/* Badge severidad */}
      <View style={[styles.badge, { backgroundColor: severity.bg }]}>
        <Text style={[styles.badgeText, { color: severity.text }]}>
          {severity.label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "700",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  description: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  meta: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
});

export default AllergyItem;
