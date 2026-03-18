import {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity,ActivityIndicator,  StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import getInitials from '../../utils/getInitials';
import {darkTheme as colors} from '../../theme/colors';
import api from '../../api/axios';

const AttentionDetailScreen = ({route, navigation}) => {
    const {id} = route.params;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadAttention = async () => {
        try{
            const res = await api.get(`/attentions/${id}`);
            setData(res.data);
        } catch (err){
            console.log('Error cargando detalles',err.message);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        loadAttention();
    }, []);

    if(loading) {
        return(
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size='large' color={colors.primary}/>
            </View>
        );
    }

    if(!data){
        return(
            <View style={[styles.container, styles.center]}>
                <Text style={styles.emptyText}>Atención no encontrada.</Text>
            </View>
        );
    }

     const {student_name, student_surname, nurse_name, attention_date, reason, actuation, actuation_description, added_file} = data;

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
              <Ionicons name="chevron-back" size={18} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.title}>Detalle Atención</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.avatarLarge}>
              <Text style={styles.avatarText}>
                {getInitials(student_name, student_surname)}
              </Text>
            </View>
            <Text style={styles.studentName}>
              {student_name} {student_surname}
            </Text>
            <Text style={styles.nurseName}>Atendido por: {nurse_name}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>DETALLE</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Fecha</Text>
              <Text style={styles.infoValue}>
                {new Date(attention_date).toLocaleDateString("es-ES")}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Hora</Text>
              <Text style={styles.infoValue}>
                {new Date(attention_date).toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Motivo</Text>
              <Text style={styles.infoValue}>{reason}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Actuación</Text>
              <Text style={styles.infoValue}>{actuation}</Text>
            </View>
            {actuation_description && (
              <>
                <View style={styles.divider} />
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Observaciones</Text>
                  <Text style={styles.infoValue}>{actuation_description}</Text>
                </View>
              </>
            )}
          </View>

          {/* Archivo adjunto */}
          {added_file && (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>ARCHIVO ADJUNTO</Text>
              <TouchableOpacity style={styles.fileRow}>
                <Ionicons
                  name="document-attach-outline"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.fileText}>{added_file}</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Botón exportar PDF (visual) */}
          <TouchableOpacity style={styles.pdfButton}>
            <Ionicons
              name="download-outline"
              size={18}
              color={colors.primary}
            />
            <Text style={styles.pdfText}>Exportar a PDF</Text>
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
  center: {
    justifyContent: "center",
    alignItems: "center",
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
    alignItems: "center",
  },
  avatarLarge: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },
  studentName: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  nurseName: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
    letterSpacing: 0.5,
    marginBottom: 14,
    alignSelf: "flex-start",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    width: "100%",
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
    maxWidth: "55%",
    textAlign: "right",
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    width: "100%",
  },
  fileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
  },
  fileText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "500",
  },
  pdfButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.accentSoft,
    borderRadius: 14,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  pdfText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
  },
});

export default AttentionDetailScreen;