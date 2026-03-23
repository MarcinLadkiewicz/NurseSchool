import {useState} from 'react';
import {View, TextInput, Text, ScrollView, ActivityIndicator, Alert, TouchableOpacity, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {darkTheme as colors} from '../../theme/colors';
import api from '../../api/axios';

const NewPathologyScreen = ({route, navigation}) => {
    const {studentId} = route.params;

    const [pathologyName, setPathologyName] = useState('');
    const [pathologyDescription, setPathologyDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if(!pathologyName || !pathologyDescription){
            return Alert.alert('Error', 'El nombre de la patología es obligatorio.')
        }
        setLoading(true);
        try{
            await api.post('/pathologies',{
                student_id: studentId,
                pathology_name: pathologyName,
                pathology_description: pathologyDescription,
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
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <Ionicons name='chevron-back' size={18} color={colors.textPrimary}/>
                    </TouchableOpacity>
                    <Text style={styles.title}>Nueva patología</Text>
                </View>
                
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>NOMBRE</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder='Que patología...' 
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
                            placeholder='Descripción de la patología'
                            placeholderTextColor={colors.textMuted}
                            value={pathologyDescription}
                            onChangeText={setPathologyDescription} 
                            multiline
                        />
                    </View>
                </View>

                <TouchableOpacity style={[styles.submitButton, (!pathologyName || !pathologyDescription) && styles.submitButtonDisabled]}
                    onPress={handleSubmit}
                    disabled={loading || !studentId || !pathologyName || !pathologyDescription }>
                        {loading ? (
                            <ActivityIndicator color='#fff'/>
                        ) : (
                        <Text style={styles.submitText}>Registrar patología</Text>
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

