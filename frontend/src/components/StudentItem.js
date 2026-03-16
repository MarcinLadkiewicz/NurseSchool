import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {darkTheme as colors} from '../theme/colors';

const StudentItem = ({item, navigation}) => 
    (<TouchableOpacity
      style={styles.studentItem}
      onPress={() =>
        navigation.navigate("Detail", { id: item.id })
      }
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
      <View>
        <Text style={styles.studentMore}>{item.course} </Text>
      </View>
    </TouchableOpacity>);



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
  studentMore: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
});

export default StudentItem;