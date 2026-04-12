import {useState} from 'react';
import {View, Text, TextInput, ScrollView, ActivityIndicator,TouchableOpacity, Alert, StyleSheet} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import {Ionicons} from '@expo/vector-icons';
import {darkTheme as colors} from '../../theme/colors';
import api from '../../api/axios';

const EditPathology = ({route, navigation}) => {

    const {pathology} = route.params;

    const [pathologyName, setPathologyName] = useState(pathology.pathology_name);
    const [pathologyDescription, setPathologyDescription] = useState(pathology.pathology_description);
    const [report, setReport] = useState (null);
    const [existingReport, setExistingReport] = useState(pathology.added_file);
    const [loading, setLoading] = useState(false);

    const displayFileName = report?.name || existingReport || null;

    const pickDocument = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: 'application/pdf',
        })

        if(!result.canceled) {
            setReport(result.assets[0]);
        }
    }

    const clearDocument = () => {
        setReport(null);
        setExistingReport(null);
    }



    const handleEdit = async () => {
        if(!pathologyName || !pathologyDescription) {
            return Alert.alert('Error', 'Todos los campos son obligatorios');
        }

        setLoading(true);
        try{
            const formData = new FormData();
            formData.append('pathology_name', pathologyName);
            formData.append('pathology_description', pathologyDescription);

            if(report) {
                formData.append('report', {
                    uri: report.uri,
                    name: report.name,
                    type: 'application/pdf',
                })
            }
            await api.put(`/pathologies/${pathology.id}`, formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            })
            Alert.alert('Patología actualizada correctamente');
            navigation.navigate({name: 'StudentDeatail', params: { updated: Date.now()}, merge: true});
        } catch (err){
            const message = err.response?.data?.error || 'Error de conexión';
            return Alert.alert('Error', message);
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
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={18} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.title}>EDITAR PATOLOGÍA</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>NOMBRE</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Que patología"
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
                placeholder="Describe la patología..."
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
              <Text style={styles.uploadText} numberOfLines={1}>
                {displayFileName || "Adjuntar informe PDF (opcional)"}
              </Text>
              {displayFileName && (
                <TouchableOpacity onPress={clearDocument}>
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color={colors.error}
                  />
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitBtn} onPress={handleEdit}>
            {loading ? (
              <ActivityIndicator color={colors.primary} />
            ) : (
              <Text style={styles.submitBtnText}>Guardar cambios</Text>
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
  submitBtn: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 6,
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default EditPathology;