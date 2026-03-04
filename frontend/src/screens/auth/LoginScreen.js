import React from 'react';
import { View, Text,TextInput, TouchableOpacity, Alert, ActivityIndicator, StyleSheet , } from 'react-native';
import {darkTheme as colors} from '../../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import  { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {login} = useContext(AuthContext);

    const handleLogin = async () => {
        if(!email || !password){
            return Alert.alert('Error', 'Rellena todos los campos.');
        }

        setLoading(true);

        try{
            await login(email, password);
        } catch (err) {
            const mensaje = err.response?.data?.error || 'Error de conexión';
            Alert.alert('Error', mensaje);
        } finally {
            setLoading(false);
        }
    };


    return (
      <View style={styles.container}>
        {/*Logo*/}

        <View style={styles.logoContainer}>
          <View style={styles.logoSquare}>
            <Text style={styles.logo}>🏥</Text>
          </View>
        </View>

        {/*Title*/}

        <Text style={styles.title}>NurseSchool</Text>
        <Text style={styles.subtitle}>Enfermería escolar digital</Text>

        {/* Input Email */}
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainer}>
          <Ionicons
            name='mail-outline'
            size={20}
            color={colors.textMuted}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder='Email'
            placeholderTextColor={colors.textMuted}
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize="none"
          />
        </View>

        {/* Input Password */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
            <Ionicons name='lock-closed-outline' size={20} color={colors.textMuted} style={styles.inputIcon}/>
            <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor={colors.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={colors.textMuted}
                    />
            </TouchableOpacity>
        </View>

        {/*Botón de Login*/}
        <TouchableOpacity
          style={styles.boton}
          onPress={handleLogin}
          disabled={loading}
        >
            <LinearGradient
            colors={[colors.accent, colors.primary]}
            start={{x: 0, y:0}}
            end={{x:1, y:0}}
            style={styles.boton}
            >
            
          {loading ? (
            <ActivityIndicator color={colors.surface} />
          ) : (
            <Text style={styles.textBtn}>Iniciar Sesión</Text>
          )}
        </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>¿No tienes cuenta? Registrate</Text>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 28,
    backgroundColor: colors.background,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoSquare: {
    width: 78,
    height: 78,
    borderRadius: 20,
    backgroundColor: colors.accentSoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 34,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 6,
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  boton: {
    alignSelf: 'stretch',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  textBtn: {
    color: colors.surface,
    fontSize: 17,
    fontWeight: '700',
  },
  link: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.accent,
    fontWeight: '600',
  },
});

export default LoginScreen;
