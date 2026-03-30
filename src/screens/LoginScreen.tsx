import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigate } from 'react-router-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Button } from '../components/ui/Button';
import { ErrorMessage } from '../components/ErrorMessage';
import { useAuthStore } from '../store/useAuthStore';
import { ROUTES } from '../constants/routes';

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const { login, authenticateWithBiometrics, biometricsEnabled } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [biometricsAvailable, setBiometricsAvailable] = useState(false);

  useEffect(() => {
    (async () => {
      const hw = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      setBiometricsAvailable(hw && enrolled);
    })();
  }, []);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await login(email.trim().toLowerCase(), password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao entrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleBiometric = async () => {
    setError(null);
    const ok = await authenticateWithBiometrics();
    if (!ok) setError('Autenticação biométrica falhou.');
  };

  return (
    <SafeAreaView className='flex-1 bg-background'>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
      >
        <ScrollView
          className='flex-1'
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps='handled'
        >
          <View className='flex-1 px-6 pt-12 pb-8 justify-between'>
            {/* Logo / Title */}
            <View className='items-center mb-10'>
              <View className='w-20 h-20 bg-primary rounded-3xl items-center justify-center mb-4'>
                <Text className='text-background text-4xl'>💳</Text>
              </View>
              <Text className='text-white text-3xl font-bold'>eWallet</Text>
              <Text className='text-text-secondary text-sm mt-1'>Sua carteira digital</Text>
            </View>

            {/* Form */}
            <View className='gap-4'>
              <View>
                <Text className='text-text-secondary text-sm mb-2'>E-mail</Text>
                <TextInput
                  className='bg-surface text-white rounded-2xl px-4 py-4 text-base'
                  placeholder='seu@email.com'
                  placeholderTextColor='#6B7280'
                  keyboardType='email-address'
                  autoCapitalize='none'
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View>
                <Text className='text-text-secondary text-sm mb-2'>Senha</Text>
                <TextInput
                  className='bg-surface text-white rounded-2xl px-4 py-4 text-base'
                  placeholder='Mínimo 6 caracteres'
                  placeholderTextColor='#6B7280'
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <TouchableOpacity
                onPress={() => navigate(ROUTES.FORGOT_PASSWORD)}
                className='items-end'
              >
                <Text className='text-primary text-sm'>Esqueceu a senha?</Text>
              </TouchableOpacity>

              <ErrorMessage message={error} />

              <Button
                title={loading ? 'Entrando...' : 'Entrar'}
                onPress={handleLogin}
                variant='primary'
                fullWidth
                size='lg'
                loading={loading}
              />

              {biometricsAvailable && biometricsEnabled && (
                <Button
                  title='Entrar com biometria'
                  onPress={handleBiometric}
                  variant='outline'
                  fullWidth
                  size='lg'
                />
              )}
            </View>

            {/* Footer */}
            <View className='flex-row justify-center items-center mt-8'>
              <Text className='text-text-secondary text-sm'>Não tem conta? </Text>
              <TouchableOpacity onPress={() => navigate(ROUTES.REGISTER)}>
                <Text className='text-primary text-sm font-semibold'>Criar conta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
