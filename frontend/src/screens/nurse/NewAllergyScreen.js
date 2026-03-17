import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ActivityIndicator, ScrollView, TouchableOpacity, Alert,  StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {darkTheme as colors} from '../../theme/colors';
import api from '../../api/axios';


const NewAllergyScreen = ({route, navigation}) => {
  
  const studentIdFromParams = route.params?.student_id || null;

  const [studentId, setStudentId] = useState(studentIdFromParams);
  const [students, setStudents] = useState([]);
  const [studentSearch, setStudentSearch] = useState('');
  const [allergyType, setAllergyType] = useState('');
  const [allergyDescription, setAllergyDescription]= useState('');
  const [severity, setSeverity] = useState('');
  const [loading, setLoading] = useState(false);  

  useEffect(() => {
    if(!studentIdFromParams){
      const loadStudents = async () => {
        try{
          const res = await api.get('/students');
          setStudents(res.data);
        }catch(err){
          console.log('Error cargando los alumnos', err.message);
        }
      }
    loadStudents();
    }
  }, [] );

  const filteredStudents = students.filter((s) => 
    `${s.name}${s.surname}`.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const selectedStudent = students.find((s) => s.id === studentId);

  const handleSubmit = async () => {
    if(!studentId) {
      return Alert.alert('Error', 'Selecciona un alumno');
    }
    if(!allergyType || !allergyDescription || !severity){
      return Alert.alert('Error', 'Todos los campos son obligatorios');
    }
    setLoading(true);
    try{
      await api.post('/allergies',{
        student_id: studentId,
        allergy_type: allergyType,
        allergy_description: allergyDescription,
        severity
      })
      Alert.alert('Alergia registrada', 'La alergia se registró correctamente');
      navigation.navigate('Alergias', {created: Date.now()});
    }catch(err){
      const message = err.response?.data?.error || 'Error de conexión';
      Alert.alert('Error', message);
    }finally{
      setLoading(false);
    }
  }



  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={22} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nueva alergia</Text>
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
                  <Text style={styles.selectedCourse}>
                    {selectedStudent?.course}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setStudentId(null)}>
                  <Ionicons
                    name="close-circle"
                    size={22}
                    color={colors.textMuted}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <>
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
                        setStudentSearch("");
                      }}
                    >
                      <Text style={styles.studentOptionName}>
                        {s.name} {s.surname}
                      </Text>
                      <Text style={styles.studentOptionCourse}>{s.course}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
          </View>
        )}

        {/* Formulario alergia */}
        <View style={styles.card}>
          {/* Tipo de alergia */}
          <Text style={styles.sectionTitle}>TIPO DE ALERGIA</Text>
          <View style={styles.selectorRow}>
            {["alimentaria", "medicamentosa"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.selectorBtn,
                  allergyType === type && styles.selectorBtnActive,
                ]}
                onPress={() => setAllergyType(type)}
              >
                <Ionicons
                  name={
                    type === "alimentaria"
                      ? "nutrition-outline"
                      : "medkit-outline"
                  }
                  size={18}
                  color={
                    allergyType === type ? colors.primary : colors.textMuted
                  }
                />
                <Text
                  style={[
                    styles.selectorText,
                    allergyType === type && styles.selectorTextActive,
                  ]}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Severidad */}
          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
            SEVERIDAD
          </Text>
          <View style={styles.selectorRow}>
            {[
              { value: "alta", color: colors.danger, bg: colors.dangerBg },
              { value: "media", color: colors.warning, bg: colors.warningBg },
              { value: "baja", color: colors.success, bg: colors.successBg },
            ].map((s) => (
              <TouchableOpacity
                key={s.value}
                style={[
                  styles.severityBtn,
                  {
                    borderColor: severity === s.value ? s.color : colors.border,
                  },
                  severity === s.value && { backgroundColor: s.bg },
                ]}
                onPress={() => setSeverity(s.value)}
              >
                <Text
                  style={[
                    styles.severityText,
                    {
                      color: severity === s.value ? s.color : colors.textMuted,
                    },
                  ]}
                >
                  {s.value.charAt(0).toUpperCase() + s.value.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Descripción */}
          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
            DESCRIPCIÓN
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                { minHeight: 80, textAlignVertical: "top" },
              ]}
              placeholder="Describe la alergia..."
              placeholderTextColor={colors.textMuted}
              value={allergyDescription}
              onChangeText={setAllergyDescription}
              multiline
            />
          </View>
        </View>

        {/* Botón guardar */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!studentId || !allergyType || !severity) &&
              styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={loading || !studentId || !allergyType || !severity}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>Registrar alergia</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
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

  // Header
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

  // Card
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

  // Input
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

  // Selector alumno
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

  // Selector tipo
  selectorRow: {
    flexDirection: "row",
    gap: 10,
  },
  selectorBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.inputBg,
  },
  selectorBtnActive: {
    borderColor: colors.primary,
    backgroundColor: colors.accentSoft,
  },
  selectorText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  selectorTextActive: {
    color: colors.primary,
    fontWeight: "600",
  },

  // Selector severidad
  severityBtn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.inputBg,
  },
  severityText: {
    fontSize: 13,
    fontWeight: "600",
  },

  // Submit
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

export default NewAllergyScreen;