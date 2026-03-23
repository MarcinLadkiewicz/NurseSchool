import {useState} from 'react';
import {View, Text, TextInput, ScrollView, ActivityIndicator,TouchableOpacity, Alert, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {darkTheme as colors} from '../../theme/colors';
import api from '../../api/axios';

const EditPathology = ({route, navigation}) => {

    const {pathology} = route.params;

    const [pathologyName, setPathologyName] = useState(pathology.pathology_name);
    const [pathologyDescription, setPathologyDescription] = useState(pathology.pathology_description);
    const [loading, setLoading] = useState(false);

    const handleEdit = async () => {
        if(!pathologyName || !pathologyDescription) {
            return Alert.alert('Error', 'Todos los campos son obligatorios');
        }

        setLoading(true);
        try{
            await api.put(`/pathologies/${pathology.id}`,{
                pathology_name: pathologyName,
                pathology_description: pathologyDescription
            })
            Alert.alert('Patología actualizada correctamente');
            navigation.goBack();
        } catch (err){
            const message = err.response?.data?.error || 'Error de conexión';
            return Alert.alert('Error', message);
        } finally {
            setLoading(false);
        }
    }


    return(
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name='chevron-back' size={18} color={colors.primary}/>
                    </TouchableOpacity>
                    <Text style={styles.title}>EDITAR PATOLOGÍA</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>NOMBRE</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder='Que patología'
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
                            placeholder='Describe la patología...'
                            placeholderTextColor={colors.textMuted}
                            value={pathologyDescription}
                            onChangeText={setPathologyDescription}
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
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

});

export default EditPathology;