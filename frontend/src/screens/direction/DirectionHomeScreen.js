import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";
import { darkTheme as colors } from "../../theme/colors";
import getGreeting from "../../components/Greeting";
import StatCard from "../../components/StatCard";
import AttentionItem from "../../components/AttentionItem";
import AllergyItem from "../../components/AllergyItem";
import api from "../../api/axios";

const DirectionHomeScreen = ({ navigation }) => {
  const [summary, setSummary] = useState(null);
  const [attentions, setAttentions] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [activeTab, setActiveTab] = useState("attentions");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { user } = useContext(AuthContext);

  const loadDashboard = async () => {
    try {
      const [summaryRes, attentionsRes, allergiesRes] = await Promise.all([
        api.get("/direction/summary"),
        api.get("/direction/attentions?limit=10&page=1"),
        api.get("/direction/allergies?limit=10&page=1"),
      ]);

      setSummary(summaryRes.data);
      setAttentions(attentionsRes.data.data || []);
      setAllergies(allergiesRes.data.data || []);
    } catch (err) {
      console.log("Error cargando dashboard director:", err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const activeList = activeTab === "attentions" ? attentions : allergies;

  const renderItem = ({ item }) =>
    activeTab === "attentions" ? (
      <AttentionItem item={item} navigation={navigation} readOnly/>
    ) : (
      <AllergyItem item={item} navigation={navigation} readOnly/>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={activeList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View>
                <Text style={styles.greeting}>{getGreeting()}</Text>
                <Text style={styles.userName}>{user?.nombre} 👋</Text>
              </View>
              <TouchableOpacity style={styles.bellContainer}>
                <Ionicons
                  name="shield-outline"
                  size={24}
                  color={colors.textPrimary}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.statsWideCard}>
              <Ionicons name="pulse" size={28} color={colors.primary} />
              <View style={styles.statsWideInfo}>
                <Text style={styles.statsWideValue}>
                  {summary?.total_attentions ?? 0}
                </Text>
                <Text style={styles.statsWideLabel}>TOTAL ATENCIONES</Text>
              </View>
            </View>

            <View style={styles.statsRow}>
              <StatCard
                label="ALUMNOS"
                value={summary?.students_attended ?? 0}
                color={colors.success}
              />
              <StatCard
                label="ALERGIAS"
                value={summary?.total_allergies ?? 0}
                color={colors.danger}
              />
            </View>

            <View style={styles.tabsContainer}>
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "attentions" && styles.tabActive,
                ]}
                onPress={() => setActiveTab("attentions")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "attentions" && styles.tabTextActive,
                  ]}
                >
                  Atenciones
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "allergies" && styles.tabActive,
                ]}
                onPress={() => setActiveTab("allergies")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "allergies" && styles.tabTextActive,
                  ]}
                >
                  Alergias
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {activeTab === "attentions"
                  ? "Atenciones recientes"
                  : "Alergias registradas"}
              </Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="pulse-outline" size={48} color={colors.textMuted} />
            <Text style={styles.emptyText}>
              {activeTab === "attentions"
                ? "No hay atenciones registradas"
                : "No hay alergias registradas"}
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { justifyContent: "center", alignItems: "center" },
  listContent: { padding: 20, paddingTop: 60 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: { fontSize: 15, color: colors.textSecondary },
  userName: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 2,
  },
  bellContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },

  statsWideCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 20,
    marginBottom: 12,
    gap: 16,
    borderWidth: 1,
    borderColor: colors.primary + "40",
  },
  statsWideInfo: { flex: 1 },
  statsWideValue: {
    fontSize: 40,
    fontWeight: "800",
    color: colors.primary,
    lineHeight: 44,
  },
  statsWideLabel: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1.5,
    color: colors.textSecondary,
    marginTop: 2,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10,
  },

  tabsContainer: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.textSecondary,
    textAlign: "center",
  },
  tabTextActive: {
    color: colors.background,
    fontWeight: "600",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  emptyContainer: { alignItems: "center", paddingVertical: 40 },
  emptyText: { fontSize: 14, color: colors.textMuted, marginTop: 12 },
});

export default DirectionHomeScreen;
