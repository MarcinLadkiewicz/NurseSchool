import {
  View,
  Text,
  StyleSheet
} from "react-native";
import {darkTheme as colors} from '../theme/colors'

const StatCard = ({ label, value, color }) => (
  <View style={styles.statCard}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={[styles.statValue, { color }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "700",
  },
});

export default StatCard;
