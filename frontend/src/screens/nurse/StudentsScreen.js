import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import {darkTheme as colors} from '../../theme/colors';
import StudentItem from '../../components/StudentItem';
import api from '../../api/axios';
import { Ionicons } from '@expo/vector-icons';

const StudentsScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadStudents = async () => {
    try{
      const res = await api.get('/students');
      setData(res.data);
    } catch (err) {
      console.log('Error cargando los alumnos', err.message)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }
  const filtered = data.filter((item) =>
    `${item.name} ${item.surname}`
      .toLowerCase()
      .includes(inputText.toLowerCase()),
  );

  useEffect(()=>{
    loadStudents();
  }, []);

  const onRefresh = useCallback(()=>{
    setRefreshing(true);
    loadStudents();
  }, []);

  if (loading) {
       return (
         <View style={[styles.container, styles.center]}>
           <ActivityIndicator size="large" color={colors.primary} />
         </View>
       );
     }


  return (
    <View style={styles.container}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <StudentItem item={item} navigation={navigation} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="people-outline"
              size={48}
              color={colors.textMuted}
            />
            <Text style={styles.emptyText}>No se encontraron alumnos</Text>
          </View>
        }
        ListHeaderComponent={
          <>
            <View style={styles.headerRow}>
              <Text style={styles.title}>Panel Alumnos</Text>
              <TouchableOpacity
                style={styles.addStudent}
                onPress={() => navigation.navigate("AddStudent")}
              >
                <Ionicons name="add" size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Ionicons
                name="search-outline"
                size={18}
                color={colors.textMuted}
                style={{ marginRight: 8 }}
              />
              <TextInput
                style={styles.input}
                placeholder="Buscar alumno..."
                placeholderTextColor={colors.textMuted}
                onChangeText={setInputText}
                value={inputText}
              />
            </View>
          </>
        }
      />
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  addStudent: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.textPrimary,
  },
});

export default StudentsScreen;