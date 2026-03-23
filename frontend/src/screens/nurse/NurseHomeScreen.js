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

 const NurseHomeScreen = ({ navigation }) => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [refreshing, setRefreshing] = useState(false);

   const { user } = useContext(AuthContext);

   const loadDashboard = async () => {
     try {
       const res = await api.get("/nurse/dashboard");
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
         renderItem={({ item }) => <AttentionItem item={item} navigation={navigation} />}
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
                   name="notifications-outline"
                   size={24}
                   color={colors.textPrimary}
                 />
                 <View style={styles.bellBadge} />
               </TouchableOpacity>
             </View>

             <View style={styles.statsRow}>
               <StatCard
                 label="HOY"
                 value={data?.today_attentions || 0}
                 color={colors.primary}
               />
               <StatCard
                 label="PENDIENTES"
                 value={data?.pending_reports || 0}
                 color={colors.warning}
               />
               <StatCard
                 label="ALERGIAS"
                 value={data?.total_allergies || 0}
                 color={colors.danger}
               />
             </View>

             {/* Botones de acción */}
             <View style={styles.actionsRow}>
               <TouchableOpacity
                 style={styles.primaryButton}
                 onPress={() => navigation.navigate("NewAttention")}
               >
                 <Ionicons name="add" size={20} color="#fff" />
                 <Text style={styles.primaryButtonText}>Nueva atención</Text>
               </TouchableOpacity>

               <TouchableOpacity
                 style={styles.searchButton}
                 onPress={() => navigation.navigate("Alumnos")}
               >
                 <Ionicons
                   name="search"
                   size={20}
                   color={colors.textSecondary}
                 />
               </TouchableOpacity>
             </View>

             <Text style={styles.sectionTitle}>Atenciones recientes</Text>
           </>
         }
         ListEmptyComponent={
           <View style={styles.emptyContainer}>
             <Ionicons
               name="pulse-outline"
               size={48}
               color={colors.textMuted}
             />
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
   bellContainer: {
     width: 44,
     height: 44,
     borderRadius: 14,
     backgroundColor: colors.surface,
     justifyContent: "center",
     alignItems: "center",
   },
   bellBadge: {
     position: "absolute",
     top: 10,
     right: 12,
     width: 8,
     height: 8,
     borderRadius: 4,
     backgroundColor: colors.danger,
   },

   statsRow: {
     flexDirection: "row",
     justifyContent: "space-between",
     marginBottom: 20,
     gap: 10,
   },
   actionsRow: {
     flexDirection: "row",
     marginBottom: 28,
     gap: 10,
   },
   primaryButton: {
     flex: 1,
     flexDirection: "row",
     backgroundColor: colors.accentSoft,
     borderRadius: 14,
     paddingVertical: 16,
     justifyContent: "center",
     alignItems: "center",
     gap: 8,
     borderWidth: 1,
     borderColor: colors.primary,
   },
   primaryButtonText: {
     color: colors.primary,
     fontSize: 16,
     fontWeight: "600",
   },
   searchButton: {
     width: 54,
     borderRadius: 14,
     backgroundColor: colors.surface,
     justifyContent: "center",
     alignItems: "center",
     borderWidth: 1,
     borderColor: colors.border,
   },

   sectionTitle: {
     fontSize: 16,
     fontWeight: "700",
     color: colors.textPrimary,
     marginBottom: 14,
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

 export default NurseHomeScreen;
