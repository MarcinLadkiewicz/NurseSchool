import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {darkTheme as colors} from '../theme/colors';
import formatTime from '../utils/formatTime';

const AttentionItem = (props) => {
  const item = props.item;
  const navigation = props.navigation;
  const readOnly = props.readOnly || false;

return (
  <TouchableOpacity
    style={styles.attentionCard}
    onPress={() => {
      if(!readOnly) {
        navigation.navigate("AttentionDetail", { id: item.id });
      }
    }}
  >
    {/* Icono avatar */}
    <View style={styles.avatar}>
      <Ionicons name="person-outline" size={22} color={colors.primary} />
    </View>

    {/* Info del alumno */}
    <View style={styles.attentionInfo}>
      <Text style={styles.attentionName}>
        {item.student_name} {item.student_surname}
      </Text>
      <Text style={styles.attentionReason}>
        {item.reason} · {item.course}
      </Text>
    </View>

    {/* Hora + icono estado */}
    <View style={styles.attentionRight}>
      <Text style={styles.attentionTime}>
        {formatTime(item.attention_date)}
      </Text>
      <View
        style={[
          styles.statusIcon,
          {
            backgroundColor: item.added_file
              ? colors.warningBg
              : colors.successBg,
          },
        ]}
      >
        <Ionicons
          name={item.added_file ? "document-attach-outline" : "checkmark"}
          size={14}
          color={item.added_file ? colors.warning : colors.success}
        />
      </View>
    </View>
  </TouchableOpacity>
);
}


const styles = StyleSheet.create({
  attentionCard: {
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
    borderRadius: 22,
    backgroundColor: colors.accentSoft,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  attentionInfo: {
    flex: 1,
    minWidth: 0,
  },
  attentionName: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.primary,
  },
  attentionReason: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  attentionRight: {
    alignItems: "flex-end",
    gap: 6,
  },
  attentionTime: {
    fontSize: 13,
    color: colors.textMuted,
  },
  statusIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AttentionItem;