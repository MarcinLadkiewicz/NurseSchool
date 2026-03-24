import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {darkTheme as colors} from '../theme/colors';

const StudentItem = ({ item, navigation, detailRoute = 'Detail' }) => (
  <TouchableOpacity
    style={styles.studentItem}
    onPress={() => navigation.navigate(detailRoute, { id: item.id })}
  >
    {/*Icono Avatar*/}
    <View style={styles.avatar}>
      <Ionicons name="person-outline" size={22} color={colors.primary} />
    </View>
    {/*Info*/}
    <View style={styles.studentInfo}>
      <Text style={styles.studentName}>
        {item.name} {item.surname}
      </Text>
    </View>
    <View style={styles.studentRight}>
      <Text style={styles.studentMore}>{item.course} </Text>
      {item.allergy_count > 0 && (
        <View style={styles.badge}>
          <Ionicons name='warning' size={14} color={colors.danger}/>
        </View>
      )}
    </View>
  </TouchableOpacity>
);



const styles = StyleSheet.create({
  studentItem: {
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
  studentInfo: { flex: 1 },
  studentName: { fontSize: 15, fontWeight: "600", color: colors.textPrimary },
  studentMore: {
    flexDirection: "row",
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  studentRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  badge: {
    backgroundColor: colors.dangerBg,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.danger,
  },
});

export default StudentItem;