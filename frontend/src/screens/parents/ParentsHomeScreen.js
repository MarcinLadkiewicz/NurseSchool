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
import api from "../../api/axios";

const ParentHomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/dashboard/parentDashboard");
      setData(res.data);
    } catch (err) {
      console.log("Error cargando dashboard:", err.message);
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

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.recent_attentions || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AttentionItem item={item} navigation={navigation} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        ListHeaderComponent={
          <>
            {/* Saludo */}
            <View style={styles.header}>
              <Text style={styles.greeting}>{getGreeting()}</Text>
              <Text style={styles.userName}>{user?.nombre} 👋</Text>
            </View>

            {/* Contadores */}
            <View style={styles.statsRow}>
              <StatCard
                label="HIJOS"
                value={data?.children?.length || 0}
                color={colors.primary}
              />
              <StatCard
                label="ATENCIONES"
                value={data?.total_attentions || 0}
                color={colors.warning}
              />
              <StatCard
                label="ALERGIAS"
                value={data?.total_allergies || 0}
                color={colors.danger}
              />
            </View>

            {/* Tarjetas de hijos */}
            <Text style={styles.sectionTitle}>Mis hijos</Text>
            {data?.children?.map((child) => (
              <TouchableOpacity
                key={child.id}
                style={styles.childCard}
                onPress={() =>
                  navigation.navigate("ChildDetail", {
                    id: child.id
                  })
                }
              >
                <View style={styles.childAvatar}>
                  <Text style={styles.childAvatarText}>
                    {child.name?.charAt(0)}
                    {child.surname?.charAt(0)}
                  </Text>
                </View>
                <View style={styles.childInfo}>
                  <Text style={styles.childName}>
                    {child.name} {child.surname}
                  </Text>
                  <Text style={styles.childCourse}>{child.course}</Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={colors.textMuted}
                />
              </TouchableOpacity>
            ))}

            {/* Título atenciones recientes */}
            {data?.recent_attentions?.length > 0 && (
              <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
                Atenciones recientes
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="pulse-outline" size={48} color={colors.textMuted} />
            <Text style={styles.emptyText}>No hay atenciones recientes</Text>
          </View>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  userName: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 2,
  },

  // Stats
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 10,
  },

  // Section title
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 14,
  },

  // Child cards
  childCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  childAvatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.accentSoft,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  childAvatarText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  childCourse: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },

  // Empty
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

export default ParentHomeScreen;
