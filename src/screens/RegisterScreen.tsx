import React, { useState } from 'react';
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
import { Button } from '../components/ui/Button';
import { ErrorMessage } from '../components/ErrorMessage';
import { useAuthStore } from '../store/useAuthStore';
import { ROUTES } from '../constants/routes';

const RegisterScreen: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError(null);
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    setLoading(true);
    try {
      await register(name, email.trim().toLowerCase(), password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
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
          <View className='flex-1 px-6 pt-8 pb-8'>
            {/* Header */}
            <View className='flex-row items-center mb-8'>
              <TouchableOpacity
                onPress={() => navigate(ROUTES.LOGIN)}
                className='w-10 h-10 bg-surface rounded-full items-center justify-center mr-4'
              >
                <Text className='text-white text-lg'>←</Text>
              </TouchableOpacity>
              <Text className='text-white text-2xl font-bold'>Criar conta</Text>
            </View>

            <Text className='text-text-secondary text-sm mb-8'>
              Preencha os dados abaixo para começar a usar o eWallet.
            </Text>

            {/* Form */}
            <View className='gap-4'>
              <View>
                <Text className='text-text-secondary text-sm mb-2'>Nome completo</Text>
                <TextInput
                  className='bg-surface text-white rounded-2xl px-4 py-4 text-base'
                  placeholder='Seu nome'
                  placeholderTextColor='#6B7280'
                  autoCapitalize='words'
                  value={name}
                  onChangeText={setName}
                />
              </View>

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

              <View>
                <Text className='text-text-secondary text-sm mb-2'>Confirmar senha</Text>
                <TextInput
                  className='bg-surface text-white rounded-2xl px-4 py-4 text-base'
                  placeholder='Repita a senha'
                  placeholderTextColor='#6B7280'
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>

              <ErrorMessage message={error} />

              <Button
                title={loading ? 'Criando conta...' : 'Criar conta'}
                onPress={handleRegister}
                variant='primary'
                fullWidth
                size='lg'
                loading={loading}
              />
            </View>

            {/* Footer */}
            <View className='flex-row justify-center items-center mt-8'>
              <Text className='text-text-secondary text-sm'>Já tem conta? </Text>
              <TouchableOpacity onPress={() => navigate(ROUTES.LOGIN)}>
                <Text className='text-primary text-sm font-semibold'>Entrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
