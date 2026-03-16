import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

const NewStudentScreen = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel Atenciones</Text>
      <Text style={styles.sub}>Bienvenido, {user?.nombre}</Text>
      <TouchableOpacity style={styles.boton} onPress={logout}>
        <Text style={styles.botonTexto}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F7FA",
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#0D2B4E" },
  sub: { fontSize: 16, color: "#5A7A9A", marginTop: 8 },
  boton: {
    backgroundColor: "#E74C3C",
    borderRadius: 10,
    padding: 14,
    marginTop: 30,
  },
  botonTexto: { color: "#fff", fontWeight: "bold" },
});

export default NewStudentScreen;