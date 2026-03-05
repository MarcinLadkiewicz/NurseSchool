import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { darkTheme as colors } from "../../theme/colors";
import api from "../../api/axios";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [rol, setRol] = useState('enfermero');
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false);


  const handleRegister = async () => {
    if (!name || !email || !password) {
      return Alert.alert("Error", "Rellena todos los campos.");
    }
    if(rol !== 'padre' && !code){
      return Alert.alert('Error', 'Introduce el código de invitación');
    }
    setLoading(true);

    try {
      await api.post("/auth/register", { nombre: name, email, password, rol, key: code });
      Alert.alert("Cuenta creada", "Ya puedes iniciar sesión");
      navigation.goBack();
    } catch (err) {
      const message = err.response?.data?.error || "Error de Conexión";
      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/*Title*/}
      <View style={styles.logoContainer}>
            <View style={styles.logoSquare}>
              <Text style={styles.logo}>🏥</Text>
            </View>
        </View>

      <Text style={styles.title}>Crear Cuenta</Text>

      {/* Name Input*/}

      <Text style={styles.label}>Nombre</Text>
      <View style={styles.inputContainer}>
        <Ionicons
          name="people-circle-outline"
          size={20}
          color={colors.textMuted}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre Completo"
          placeholderTextColor={colors.textMuted}
          value={name}
          onChangeText={setName}
        />
      </View>

      {/*Email Input*/}

      <Text style={styles.label}>Email</Text>
      <View style={styles.inputContainer}>
        <Ionicons
          name="mail-open-outline"
          size={20}
          color={colors.textMuted}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="email"
          placeholderTextColor={colors.textMuted}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password Input */}

      <Text style={styles.label}>Password</Text>
      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color={colors.textMuted}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.textMuted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={20}
            color={colors.textMuted}
          />
        </TouchableOpacity>
      </View>
      {/* Secure Code Register*/}
      {rol !== 'padre' && (
        <>
          <Text style={styles.label}>Código de Invitación</Text>
          <View style={styles.inputContainer}>
            <Ionicons 
              name='key-outline'
              size={20}
              color={colors.textMuted}
              style={styles.inputIcon}
              />
          <TextInput 
            style={styles.input}
            placeholder='Código de invitación'
            placeholderTextColor={colors.textMuted}
            value={code}
            onChangeText={setCode}
            autoCapitalize='none'
            />
          </View>
        </>
      )}

      {/*Rol Selector*/}

      <Text style={styles.label}>Rol:</Text>
      <View style={styles.roles}>
        {['enfermero', 'padre', 'direccion'].map((r) => (
          <TouchableOpacity
            key={r}
            style={[styles.rolBtn, rol === r && styles.activeRol]}
            onPress={() => setRol(r)}
          >
            <Text style={[styles.textRol, rol === r && styles.activeTextRol]}>
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/*Register Button*/}

      <TouchableOpacity
        style={styles.boton}
        onPress={handleRegister}
        disabled={loading}
      >
        <LinearGradient
          colors={[colors.accent, colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.boton}
        >
          {loading ? (
            <ActivityIndicator color={colors.surface} />
          ) : (
            <Text style={styles.textBtn}>Registrar</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>

      {/*Already Have Account*/}

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>¿Ya tienes cuenta? Inicia Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 28,
    backgroundColor: colors.background,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  logoSquare: {
    width: 78,
    height: 78,
    borderRadius: 20,
    backgroundColor: colors.accentSoft,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: 50,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textSecondary,
    marginBottom: 6,
    marginLeft: 4,
    letterSpacing: 0.5,
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
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.textPrimary,
  },
  roles: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 8,
  },
  rolBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    backgroundColor: colors.surface,
  },
  activeRol: {
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
  },
  textRol: {
    fontSize: 13,
    color: colors.textMuted,
  },
  activeTextRol: {
    color: colors.accent,
    fontWeight: "600",
  },
  boton: {
    alignSelf: "stretch",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  textBtn: {
    color: colors.surface,
    fontSize: 17,
    fontWeight: "700",
  },
  link: {
    textAlign: "center",
    fontSize: 14,
    color: colors.accent,
    fontWeight: "600",
  },
});

export default RegisterScreen;
