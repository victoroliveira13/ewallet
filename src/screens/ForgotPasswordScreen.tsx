import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigate } from 'react-router-native';
import { Button } from '../components/ui/Button';
import { ErrorMessage } from '../components/ErrorMessage';
import { ROUTES } from '../constants/routes';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ForgotPasswordScreen: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setError(null);
    if (!EMAIL_RE.test(email.trim())) {
      setError('Informe um e-mail válido.');
      return;
    }
    setLoading(true);
    // Mock: simulate async delay
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    Alert.alert(
      'E-mail enviado',
      `Enviamos as instruções de recuperação para ${email.trim().toLowerCase()}.`,
      [{ text: 'OK', onPress: () => navigate(ROUTES.LOGIN) }]
    );
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
              <Text className='text-white text-2xl font-bold'>Recuperar senha</Text>
            </View>

            <Text className='text-text-secondary text-sm mb-8'>
              Digite seu e-mail e enviaremos as instruções para redefinir sua senha.
            </Text>

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

              <ErrorMessage message={error} />

              <Button
                title={loading ? 'Enviando...' : 'Enviar instruções'}
                onPress={handleSend}
                variant='primary'
                fullWidth
                size='lg'
                loading={loading}
              />
            </View>

            <View className='flex-row justify-center items-center mt-8'>
              <TouchableOpacity onPress={() => navigate(ROUTES.LOGIN)}>
                <Text className='text-primary text-sm font-semibold'>Voltar ao login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
