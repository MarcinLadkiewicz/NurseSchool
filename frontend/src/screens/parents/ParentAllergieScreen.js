import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, TextInput, RefreshControl, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {darkTheme as colors} from '../../theme/colors';
import AllergyItem from '../../components/AllergyItem';
import api from "../../api/axios";

const ParentAllergieScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadAllergies = async () => {
    try {
      const res = await api.get("/allergies/my-children");
      setData(res.data);
    } catch (err) {
      console.log("Error cargando alergias: ", err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAllergies();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadAllergies();
  }, []);

  const filtered = data.filter((item) =>
    `${item.student_name} ${item.student_surname} ${item.allergy_description}`
      .toLowerCase()
      .includes(inputText.toLowerCase()),
  );

  const stats = {
    total: data.length,
    alta: data.filter((a) => a.severity === "alta").length,
    media: data.filter((a) => a.severity === "media").length,
    baja: data.filter((a) => a.severity === "baja").length,
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AllergyItem item={item} navigation={navigation} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="warning-outline"
              size={48}
              color={colors.textMuted}
            />
            <Text style={styles.emptyText}>No hay alergias registradas</Text>
          </View>
        }
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Alergias de mis hijos</Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="search-outline"
                size={18}
                color={colors.textMuted}
                style={{ marginRight: 8 }}
              />
              <TextInput
                style={styles.input}
                placeholder="Buscar por hijo o alergia..."
                placeholderTextColor={colors.textMuted}
                onChangeText={setInputText}
                value={inputText}
              />
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={[styles.statValue, { color: colors.textPrimary }]}>
                  {stats.total}
                </Text>
                <Text style={styles.statLabel}>TOTAL</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={[styles.statValue, { color: colors.danger }]}>
                  {stats.alta}
                </Text>
                <Text style={styles.statLabel}>ALTA</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={[styles.statValue, { color: colors.warning }]}>
                  {stats.media}
                </Text>
                <Text style={styles.statLabel}>MEDIA</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={[styles.statValue, { color: colors.success }]}>
                  {stats.baja}
                </Text>
                <Text style={styles.statLabel}>BAJA</Text>
              </View>
            </View>
          </>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.textPrimary,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.textMuted,
    letterSpacing: 0.5,
    marginTop: 4,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 12,
  },
});

export default ParentAllergieScreen;
