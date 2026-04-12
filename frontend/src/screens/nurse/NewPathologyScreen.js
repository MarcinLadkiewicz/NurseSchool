import {useState} from 'react';
import {View, TextInput, Text, ScrollView, ActivityIndicator, Alert, TouchableOpacity, StyleSheet} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';
import {darkTheme as colors} from '../../theme/colors';
import api from '../../api/axios';

const NewPathologyScreen = ({route, navigation}) => {
    const {studentId} = route.params;

    const [pathologyName, setPathologyName] = useState('');
    const [pathologyDescription, setPathologyDescription] = useState('');
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);


    const pickDocument = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: 'application/pdf'
        });

        if(!result.canceled) {
            setReport(result.assets[0]);
        }
    }


    const handleSubmit = async () => {
        if(!pathologyName || !pathologyDescription){
            return Alert.alert('Error', 'El nombre de la patología es obligatorio.')
        }
        setLoading(true);
        try{
            const formData = new FormData();
            formData.append('student_id', studentId);
            formData.append('pathology_name', pathologyName);
            formData.append('pathology_description', pathologyDescription);

            if(report) {
                formData.append('report', {
                    uri: report.uri,
                    name: report.name,
                    type: 'application/pdf',
                })
            }
            await api.post('/pathologies',formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            });
            Alert.alert('Patología registrada', 'La patología se registró correctamente.');
            navigation.goBack();
        } catch (err){
            return Alert.alert('Error', err.message)
        } finally {
            setLoading(false);
        }
    }
    
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name="chevron-back"
                size={18}
                color={colors.textPrimary}
              />
            </TouchableOpacity>
            <Text style={styles.title}>Nueva patología</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>NOMBRE</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Que patología..."
                placeholderTextColor={colors.textMuted}
                value={pathologyName}
                onChangeText={setPathologyName}
              />
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>DESCRIPCIÓN</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Descripción de la patología"
                placeholderTextColor={colors.textMuted}
                value={pathologyDescription}
                onChangeText={setPathologyDescription}
                multiline
              />
            </View>
          </View>

          <TouchableOpacity style={styles.card} onPress={pickDocument}>
            <View style={styles.uploadRow}>
              <Ionicons
                name="document-attach"
                size={22}
                color={colors.primary}
              />
              <Text style={styles.uploadText}>
                {report ? report.name : "Adjuntar informe PDF (opcional)"}
              </Text>
              {report && (
                <TouchableOpacity onPress={() => setReport(null)}>
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color={colors.error}
                  />
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.submitButton,
              (!pathologyName || !pathologyDescription) &&
                styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={
              loading || !studentId || !pathologyName || !pathologyDescription
            }
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitText}>Registrar patología</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    );


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
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
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
  uploadRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  uploadText: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 14,
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

export default NewPathologyScreen;

