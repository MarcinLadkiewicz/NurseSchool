import React, { useState, useEffect, useCallback} from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {darkTheme as colors} from '../../theme/colors';
import AllergyItem from '../../components/AllergyItem';
import api from '../../api/axios';

const AllergiesScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState('');
  const [filterType, setFilterType] = useState('todas');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadAllergies = async () => {
    try{
      const res = await api.get('/allergies');
      setData(res.data);
    } catch (err){
      console.log('Error cargando las alergias', err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(()=> {
    loadAllergies();
  }, []);

  const onRefresh = useCallback(()=>{
    setRefreshing(true);
    loadAllergies();
  }, []);

  const filtered = data.filter((item) => {
    const matchType = filterType === 'todas' || item.allergy_type === filterType;
    const matchText = `${item.student_name} ${item.student_surname} ${item.allergy_description}`
    .toLowerCase()
    .includes(inputText.toLowerCase());
    return matchType && matchText;
  });

  const textFiltered = data.filter((item) => `${item.student_name} ${item.student_surname} ${item.allergy_description}`
  .toLowerCase()
  .includes(inputText.toLowerCase()));

  const stats = {
    total : textFiltered.length,
    alta : textFiltered.filter((a) => a.severity === 'alta').length,
    media : textFiltered.filter((a) => a.severity === 'media').length,
    baja : textFiltered.filter((a) => a.severity === 'baja').length
  }


  if(loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <FlatList 
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <AllergyItem item={item} navigation={navigation} />
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
             name='people-outline'
             size={48}
             color={colors.textMuted}
            />
            <Text style={styles.emptyText}>No se encontraron alumnos</Text>
            </View>
        }
        ListHeaderComponent={
          <>
            <View style={styles.headerRow}>
              <Text style={styles.title}>Alergias</Text>
              <TouchableOpacity style={styles.addAllergy} onPress={()=> navigation.navigate('NewAllergy')}>
                <Ionicons name='add' size={20} color={colors.primary}/> 
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Ionicons 
                name='search-outline'
                size={18}
                color={colors.textMuted}
                style={{marginRight: 8}}
                />
              <TextInput 
                style={styles.input}
                placeholder='Buscar alumno o alergia'
                placeholderTextColor={colors.textMuted}
                onChangeText={setInputText}
                value={inputText}
                />
            </View>
            <View style={styles.filterRow}>
              {['todas', 'alimentaria', 'medicamentosa'].map((type)=> (
                <TouchableOpacity 
                  key={type}
                  style={[styles.filterBtn, filterType === type && styles.filterBtnActive]}
                  onPress={() => setFilterType(type)}
                >
                  <Text style={[styles.filterText, filterType === type && styles.filterTextActive]}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={[styles.statValue, {color: colors.textPrimary}]}>{stats.total}</Text>
                <Text style={styles.statLabel}>TOTAL</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={[styles.statValue, {color: colors.danger}]}>{stats.alta}</Text>
                <Text style={styles.statLabel}>ALTA</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={[styles.statValue, {color: colors.warning}]}>{stats.media}</Text>
                <Text style={styles.statLabel}>MEDIA</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={[styles.statValue, {color: colors.success}]}>{stats.baja}</Text>
                <Text style={styles.statLabel}>BAJA</Text>
              </View>
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
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  addAllergy: {
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
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 12,
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterBtnActive: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  filterTextActive: {
    color: colors.primary,
    fontWeight: "600",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.textMuted,
    letterSpacing: 0.5,
    marginTop: 4,
  },
});

export default AllergiesScreen;