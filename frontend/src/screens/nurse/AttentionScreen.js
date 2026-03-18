import {useEffect, useState, useCallback, useContext} from 'react';
import {View, Text, TextInput, ScrollView,FlatList, RefreshControl,ActivityIndicator, TouchableOpacity, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {darkTheme as colors} from '../../theme/colors';
import AttentionItem from '../../components/AttentionItem';
import api from '../../api/axios';

const AttentionScreen = ({navigation}) => {

    const [data, setData] = useState([]);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loadAttentions = async () => {
        try{
            const res = await api.get('/attentions');
            setData(res.data);
        } catch (err){
            console.log('Error cargando las atenciones', err.message);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }

    const filtered = data.filter((item) => 
        `${item.student_name} ${item.student_surname} ${item.reason}`
        .toLowerCase()
        .includes(inputText.toLowerCase()),
    );

    useEffect(() => {
        loadAttentions();
    }, []);

    const onRefresh = useCallback(()=> {
        setRefreshing(true);
        loadAttentions();
    }, []);

    if(loading){
        return (<View style={[styles.container, styles.center]}>
            <ActivityIndicator size='large' color={colors.primary} />
                </View>)
    }

    return(
        <View style={styles.container}>
            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <AttentionItem item={item} navigation={navigation}/>
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
                        <Ionicons name='pulse-outline' size={48} color={colors.textMuted}/>
                        <Text style={styles.emptyText}>No se encontraron atenciones</Text>
                    </View>
                }
                ListHeaderComponent={
                    <>
                    <View style={styles.headerRow}>
                        <Text style={styles.title}>Atenciones</Text>
                        <TouchableOpacity style={styles.addAttention} onPress={() => navigation.navigate('NewAttention')}>
                            <Ionicons name='add' size={18} color={colors.primary}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name='search-outline' size={18} color={colors.textMuted} style={{marginRight: 8}}/>
                        <TextInput 
                            style={styles.input}
                            placeholder='Buscar alumno o causa...'
                            placeholderTextColor={colors.textMuted}
                            value={inputText}
                            onChangeText={setInputText}
                            />
                    </View>
                    </>
                }
                />
        </View>
    )
}

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
  addAttention: {
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

export default AttentionScreen;