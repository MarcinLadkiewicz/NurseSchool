import {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {darkTheme as colors} from '../../theme/colors';
import api from '../../api/axios';


const EditAllergy = ({route, navigation}) => {
    const { allergy } = route.params;

    const [allergyType, setAllergyType] = useState(allergy.allergy_type);
    const [allergyDescription, setAllergyDescription] = useState(allergy.allergy_description);
    const [severity, setSeverity] = useState(allergy.severity);
    const [loading, setLoading] = useState(false);



    const handleEdit = async () => {
        if(!allergyType || !allergyDescription || !severity){
            return Alert.alert('Error', 'Todos los campos son obligatorios');
        }
        setLoading(true);
        try{
            await api.put(`/allergies/${allergy.id}`,{
                allergy_type: allergyType,
                allergy_description: allergyDescription, 
                severity: severity
            });
            Alert.alert('Alergia editada correctamente');
            navigation.navigate('Alergias', {updated: Date.now()})
        } catch (err) {
            const message = err.response?.data?.error || 'Error de conexión.';
            return Alert.alert('Error', message);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = () => {
        Alert.alert(
          "Eliminar alergia",
          "¿Seguro que quieres eliminar la alergia?",
          [
            { text: "cancelar", style: "cancel" },
            {
              text: "eliminar",
              style: "destructive",
              onPress: async () => {
                try {
                  await api.delete(`/allergies/${allergy.id}`);
                  Alert.alert("Alergia eliminada");
                  navigation.navigate("Alergias", { updated: Date.now() });
                } catch (err) {
                  Alert.alert("Error", "No se pudo eliminar la alergia.");
                }
              },
            },
          ],
        );
        
    }

    return(
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name='chevron-back' size={18} color={colors.primary}/>
                    </TouchableOpacity>
                    <Text style={styles.title}>Editar alergia</Text>
                </View>

                <View style={styles.card}>
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
                              color={ allergyType === type ? colors.primary : colors.textMuted}
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
                
                    <Text style={[styles.sectionTitle, { marginTop: 20 }]}>SEVERIDAD</Text>
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
                
                        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>DESCRIPCIÓN</Text>
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
                        <TouchableOpacity style={styles.submitBtn} onPress={handleEdit}>
                            {loading ? (
                                <ActivityIndicator color={colors.primary}/>
                            ) : (
                                <Text style={styles.submitText}>Guardar cambios</Text>
                                )}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
                            <Text style={styles.deleteBtnText}>Eliminar alergia</Text>
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
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.dangerBg,
    borderRadius: 14,
    paddingVertical: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  deleteBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.danger,
  },
});

export default EditAllergy;