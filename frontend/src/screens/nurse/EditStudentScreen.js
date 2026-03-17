
import { useState, useEffect } from 'react';
import {View, Text, TextInput, ScrollView, TouchableOpacity, Alert, ActivityIndicator, StyleSheet, ToastAndroid} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {darkTheme as colors} from '../../theme/colors';
import api from '../../api/axios';

const EditStudentScreen = ({route, navigation}) => {
 const {student} = route.params;


 const [parents, setParents] = useState([]);
 const [name, setName] = useState(student.name);
 const [surname, setSurname] = useState(student.surname);
 const [course, setCourse] = useState (student.course);
 const [birthdate, setBirthdate] = useState(student.birthdate);
 const [padre_id, setPadre_id] = useState(student.padre_id?.toString() || '');
 const [loading, setLoading] = useState(false);

 
 useEffect(()=> {
    const loadParents = async () => {
        try{
            const res = await api.get('/students/parents/list');
            setParents(res.data);
        } catch(err){
            console.log('Error cargando padres: ', err.message);
        }
    }
    loadParents();
 }, []);

 

 const handleEdit = async () => {
    if(!name || !surname || !course){
        return Alert.alert('Error', 'Nombre, apellidos y curso son obligatorios.')
    }
    setLoading(true);
    try {
        await api.put(`/students/${student.id}`, {
            name, 
            surname, 
            course,
            birthdate: birthdate || null,
            padre_id: padre_id || null,
        })
        Alert.alert('Alumno editado correctamente');
        navigation.navigate('Detail', {id: student.id, updated: true});
    } catch (err) {
        const message = err.response?.data?.error || 'Error de conexión';
        return Alert.alert(message);
    } finally {
        setLoading(false);
    }
 }

 return (
    <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name='chevron-back' size={22} color={colors.primary}/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Editar alumno</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>NOMBRE</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input}
                        placeholder='Nombre del alumno'
                        placeholderTextColor={colors.textMuted}
                        value={name}
                        onChangeText={setName}
                    />
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>APELLIDOS</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input}
                    placeholder='Apellidos del alumno'
                    placeholderTextColor={colors.textMuted}
                    value={surname}
                    onChangeText={setSurname}
                    />
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>CURSO *</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input}
                    placeholder='Ej 3A'
                    placeholderTextColor={colors.textMuted}
                    value={course}
                    onChangeText={setCourse}
                    />
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>FECHA DE NACIMIENTO</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input}
                    placeholder='YYYY-MM-DD'
                    placeholderTextColor={colors.textMuted}
                    value={birthdate}
                    onChangeText={setBirthdate}
                    />
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.label}>PADRE / TUTOR</Text>
                <View style={styles.parentSelector}>
                    {parents.map((p)=> (
                        <TouchableOpacity 
                        key={p.id}
                        style={[styles.parentOption, padre_id === p.id && styles.parentOptionActive]}
                        onPress={()=> setPadre_id(p.id)}
                        >
                            <Text style={[styles.parentText, padre_id === p.id && styles.parentTextActive]}>
                                {p.name}
                            </Text>
                            <Text style={styles.parentEmail}>
                                {p.email}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleEdit} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color={colors.primary}/>
                ) : (
                    <Text style={styles.submitText}>Guardar cambios</Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    </View>
 )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
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
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textSecondary,
    letterSpacing: 0.5,
    marginBottom: 6,
    marginTop: 14,
  },
  inputContainer: {
    backgroundColor: colors.inputBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
  },
  input: {
    paddingVertical: 14,
    fontSize: 15,
    color: colors.textPrimary,
  },
  parentSelector: {
    gap: 8,
    marginBottom: 14,
  },
  parentOption: {
    backgroundColor: colors.inputBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
  },
  parentOptionActive: {
    borderColor: colors.primary,
    backgroundColor: colors.accentSoft,
  },
  parentText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  parentTextActive: {
    color: colors.primary,
  },
  parentEmail: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default EditStudentScreen;