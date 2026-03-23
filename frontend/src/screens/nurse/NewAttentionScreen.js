import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ActivityIndicator, ScrollView, Alert,  TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { darkTheme as colors} from '../../theme/colors';
import api from '../../api/axios';



const NewAttentionScreen = ({route, navigation}) => {
  const studentIdFromParams = route.params?.student_id || null;

  const [studentId, setStudentId] = useState(studentIdFromParams);
  const [students, setStudents] = useState([]);
  const [studentSearch, setStudentSearch] = useState('');
  const [allergies, setAllergies] = useState([]);
  const [reason, setReason] = useState('');
  const [actuation, setActuation] = useState('');
  const [actuationDescription, setActuationDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(!studentIdFromParams){
      const loadStudents = async () => {
        try{
          const res = await api.get('students');
          setStudents(res.data);
        } catch (err){
          console.log('Error al cargar los alumnos.' , err.message)
        }
      }
      loadStudents();
    }
  }, [])

  useEffect(() => {
    if(studentId){
      const loadAllergies = async () => {
        try{
          const res = await api.get(`/allergies/student/${studentId}`);
          setAllergies(res.data);
        } catch (err){
          setAllergies([]);
        }
      }
      loadAllergies();
    } else {
      setAllergies([]);
    }
  },[studentId]);
  

  const filteredStudents = students.filter((s) => `${s.name}${s.surname}`.toLowerCase().includes(studentSearch.toLowerCase()));
  const selectedStudent = students.find((s)=> s.id === studentId); 

  const handleSubmit = async () => {
    if(!studentId){
      return Alert.alert('Error', 'Selecciona un alumno.')
    }
    if(!reason || !actuation){
      Alert.alert('Error', 'Motivo y actuación son obligatorios')
    }

    setLoading(true);

    try{
      await api.post('/attentions', {
        student_id: studentId,
        reason, 
        actuation, 
        actuation_description: actuationDescription || null,
      });
      Alert.alert('Atención Registrada', 'La atención se registró correctamente')
      navigation.navigate('Inicio');
    } catch (err){
      const message = err.response?.data?.err || 'Error de conexión.';
      Alert.alert('Error', message);

    } finally {
      setLoading(false);
    }
  }



  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
 
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nueva atención</Text>
        </View>
 
        {/* Selector de alumno (solo si no viene por params) */}
        {!studentIdFromParams && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>ALUMNO</Text>
 
            {studentId ? (
              <View style={styles.selectedStudent}>
                <View style={styles.selectedInfo}>
                  <Text style={styles.selectedName}>
                    {selectedStudent?.name} {selectedStudent?.surname}
                  </Text>
                  <Text style={styles.selectedCourse}>{selectedStudent?.course}</Text>
                </View>
                <TouchableOpacity onPress={() => setStudentId(null)}>
                  <Ionicons name="close-circle" size={22} color={colors.textMuted} />
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <View style={styles.inputContainer}>
                  <Ionicons name="search-outline" size={18} color={colors.textMuted} style={{ marginRight: 8 }} />
                  <TextInput
                    style={styles.input}
                    placeholder="Buscar alumno..."
                    placeholderTextColor={colors.textMuted}
                    value={studentSearch}
                    onChangeText={setStudentSearch}
                  />
                </View>
                <View style={styles.studentList}>
                  {filteredStudents.slice(0, 5).map((s) => (
                    <TouchableOpacity
                      key={s.id}
                      style={styles.studentOption}
                      onPress={() => {
                        setStudentId(s.id);
                        setStudentSearch('');
                      }}
                    >
                      <Text style={styles.studentOptionName}>{s.name} {s.surname}</Text>
                      <Text style={styles.studentOptionCourse}>{s.course}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
          </View>
        )}
 
        {/* Warning alergias */}
        {allergies.length > 0 && (
          <View style={styles.warningCard}>
            <View style={styles.warningHeader}>
              <Ionicons name="warning" size={20} color={colors.danger} />
              <Text style={styles.warningTitle}>
                ¡Atención! Este alumno tiene {allergies.length} alergia{allergies.length > 1 ? 's' : ''}
              </Text>
            </View>
            {allergies.map((allergy) => {
              const sev = getSeverityStyle(allergy.severity);
              return (
                <View key={allergy.id} style={styles.warningItem}>
                  <View style={[styles.warningBadge, { backgroundColor: sev.bg }]}>
                    <Text style={[styles.warningBadgeText, { color: sev.text }]}>
                      {sev.label}
                    </Text>
                  </View>
                  <View style={styles.warningInfo}>
                    <Text style={styles.warningType}>
                      {allergy.allergy_type.charAt(0).toUpperCase() + allergy.allergy_type.slice(1)}
                    </Text>
                    <Text style={styles.warningDesc} numberOfLines={1}>
                      {allergy.allergy_description}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}
 
        {/* Formulario */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>MOTIVO *</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ej: Dolor de cabeza, caída, reacción alérgica..."
              placeholderTextColor={colors.textMuted}
              value={reason}
              onChangeText={setReason}
            />
          </View>
 
          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>ACTUACIÓN *</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, { minHeight: 60, textAlignVertical: 'top' }]}
              placeholder="Ej: Paracetamol 500mg, reposo, hielo..."
              placeholderTextColor={colors.textMuted}
              value={actuation}
              onChangeText={setActuation}
              multiline
            />
          </View>
 
          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>OBSERVACIONES</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, { minHeight: 80, textAlignVertical: 'top' }]}
              placeholder="Detalles adicionales, evolución del alumno..."
              placeholderTextColor={colors.textMuted}
              value={actuationDescription}
              onChangeText={setActuationDescription}
              multiline
            />
          </View>
        </View>
 
        {/* Botón guardar */}
        <TouchableOpacity
          style={[styles.submitButton, (!studentId || !reason || !actuation) && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading || !studentId || !reason || !actuation}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>Registrar atención</Text>
          )}
        </TouchableOpacity>
 
      </ScrollView>
    </View>
  )
};

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
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
    letterSpacing: 0.5,
    marginBottom: 12,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.textPrimary,
  },

  selectedStudent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.accentSoft,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  selectedInfo: {
    flex: 1,
  },
  selectedName: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  selectedCourse: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  studentList: {
    marginTop: 8,
    gap: 4,
  },
  studentOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.inputBg,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  studentOptionName: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textPrimary,
  },
  studentOptionCourse: {
    fontSize: 12,
    color: colors.textMuted,
  },

  warningCard: {
    backgroundColor: colors.dangerBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  warningHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.danger,
    flex: 1,
  },
  warningItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
  },
  warningBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  warningBadgeText: {
    fontSize: 10,
    fontWeight: "700",
  },
  warningInfo: {
    flex: 1,
  },
  warningType: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  warningDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 1,
  },

  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 6,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default NewAttentionScreen;