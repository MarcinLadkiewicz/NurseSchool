import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ActivityIndicator,ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {darkTheme as colors} from '../../theme/colors';
import api from '../../api/axios';


const NewStudentScreen = ({navigation}) => {
  
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [course, setCourse] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if( !name || !surname || !course){
      return Alert.alert('Error', 'Nombre, apellidos y curso son obligatorios');
    }

    setLoading(true);
    try {
      await api.post('/students', {
        name, 
        surname, 
        course, 
        birthdate: birthdate || null,
      });
      Alert.alert('Alumno creado', 'El alumno se ha registrado correctamente.');
      navigation.goBack();
    } catch (err) {
      const message = err.response?.data?.error || 'Error de conexión';
      Alert.alert('Error', message);
      
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
        <Text style={styles.headerTitle}>Nuevo alumno</Text>
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
          <TextInput 
            style={styles.input}
            placeholder='ej: 3A'
            placeholderTextColor={colors.textMuted}
            value={course}
            onChangeText={setCourse}
            autoCapitalize='characters'
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

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator color={colors.textPrimary}/>
        ) : (
          <Text style={styles.submitText}>Guardar alumno</Text>
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
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: "700",
  },
});

export default NewStudentScreen;