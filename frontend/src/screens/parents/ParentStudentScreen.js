import React, { useContext , useState, useEffect, useCallback} from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import {darkTheme as colors} from '../../theme/colors';
import StudentItem from "../../components/StudentItem";
import api from "../../api/axios";

import { AuthContext } from "../../context/AuthContext";

const ParentStudentScreen = ({navigation}) => {
  const { user } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadChilds = async () => {
    try{
      const res = await api.get(`/students/padre/${user.id}`);
      setData(res.data);

    } catch (err) {
      console.log('Error cargando los hijos', err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(()=> {
    loadChilds();
  }, []);

  const onRefresh = useCallback(()=> {
    setRefreshing(true);
    loadChilds();
  },[]); 

  if(loading){
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size='large' color={colors.primary}/>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item})=> (
          <StudentItem item={item} navigation={navigation} detailRoute='ChildDetail'/>
        )}
        refreshControl={
          <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.primary}
          />}
        ListHeaderComponent={
          <Text style={[styles.title, {marginBottom: 10}]}>Mis hijos</Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name='people-outline' size={48} color={colors.textMuted}/>
            <Text style={styles.emptyText}>No tengo hijos registrados.</Text>
          </View>
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
  title: {
    fontSize: 24,
    fontWeight: "700",
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
});

export default ParentStudentScreen;
