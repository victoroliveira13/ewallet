import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigate, useLocation } from 'react-router-native';
import { Button } from '../components/ui/Button';
import { ErrorMessage } from '../components/ErrorMessage';
import { useWalletStore } from '../store/useWalletStore';
import { useNotificationStore } from '../store/useNotificationStore';
import { handleApiError, logError } from '../utils/errorHandling';
import { ROUTES } from '../constants/routes';
import type { Contact } from '../types';

const FEE_RATE = 0.01; // 1%
const FEE_CAP = 2.0; // máximo $2

function calcFee(amount: number): number {
  return Math.min(amount * FEE_RATE, FEE_CAP);
}

interface LocationState {
  contact: Contact;
  amount: number;
}

const SendConfirmationScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | undefined;

  const { sendTransfer } = useWalletStore();
  const { addNotification } = useNotificationStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Animações de sucesso
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (success) {
      Animated.parallel([
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, tension: 60, friction: 6 }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start(() => {
        setTimeout(() => navigate(ROUTES.HOME), 2000);
      });
    }
  }, [success]);

  // Redireciona se não houver dados de estado
  if (!state?.contact || !state?.amount) {
    navigate(ROUTES.SEND, { replace: true });
    return null;
  }

  const { contact, amount } = state;
  const fee = calcFee(amount);
  const total = amount + fee;

  const handleConfirm = async () => {
    setError(null);
    setLoading(true);
    try {
      sendTransfer(contact, amount);
      addNotification({
        title: 'Transferência enviada',
        message: `$${amount.toFixed(2)} enviado para ${contact.name}`,
        time: 'Agora',
        type: 'transfer',
      });
      setSuccess(true);
    } catch (err) {
      logError(err, 'SendConfirmationScreen.handleConfirm');
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <SafeAreaView className='flex-1 bg-background items-center justify-center px-6'>
        <Animated.View
          style={{ transform: [{ scale: scaleAnim }], opacity: opacityAnim }}
          className='items-center'
        >
          {/* Ícone de sucesso */}
          <View className='w-28 h-28 bg-primary/20 rounded-full items-center justify-center mb-6 border-4 border-primary/40'>
            <Text style={{ fontSize: 52 }}>✓</Text>
          </View>
          <Text className='text-white text-2xl font-bold mb-2'>Enviado!</Text>
          <Text className='text-text-secondary text-base text-center'>
            {'$'}
            {amount.toFixed(2)} enviado com sucesso para {contact.name}
          </Text>
        </Animated.View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='flex-1 bg-background'>
      {/* Header */}
      <View className='flex-row items-center px-4 pt-4 pb-4'>
        <TouchableOpacity
          onPress={() => navigate(ROUTES.SEND)}
          className='w-10 h-10 bg-surface rounded-full items-center justify-center mr-4'
        >
          <Text className='text-white text-lg'>←</Text>
        </TouchableOpacity>
        <Text className='text-white text-xl font-bold'>Confirmar envio</Text>
      </View>

      <View className='flex-1 px-4'>
        {/* Valor em destaque */}
        <View className='items-center py-8'>
          <Text className='text-text-secondary text-sm mb-2'>Você está enviando</Text>
          <Text className='text-white text-5xl font-bold'>${amount.toFixed(2)}</Text>
        </View>

        {/* Card do destinatário */}
        <View className='bg-surface rounded-2xl p-4 mb-4'>
          <Text className='text-text-secondary text-xs mb-3 uppercase tracking-wider'>
            Destinatário
          </Text>
          <View className='flex-row items-center'>
            <View
              className='w-14 h-14 rounded-full items-center justify-center mr-4'
              style={{ backgroundColor: `${contact.color}30` }}
            >
              <Text className='text-lg font-bold' style={{ color: contact.color }}>
                {contact.initials}
              </Text>
            </View>
            <View>
              <Text className='text-white text-base font-semibold'>{contact.name}</Text>
              <Text className='text-text-secondary text-sm'>{contact.username}</Text>
            </View>
          </View>
        </View>

        {/* Resumo financeiro */}
        <View className='bg-surface rounded-2xl p-4 mb-6'>
          <Text className='text-text-secondary text-xs mb-3 uppercase tracking-wider'>Resumo</Text>

          <View className='flex-row justify-between items-center mb-3'>
            <Text className='text-text-secondary text-sm'>Valor</Text>
            <Text className='text-white text-sm font-medium'>${amount.toFixed(2)}</Text>
          </View>

          <View className='flex-row justify-between items-center mb-3'>
            <View className='flex-row items-center gap-1'>
              <Text className='text-text-secondary text-sm'>Taxa estimada</Text>
              <Text className='text-text-muted text-xs'>(1%, máx. $2)</Text>
            </View>
            <Text className='text-text-secondary text-sm'>${fee.toFixed(2)}</Text>
          </View>

          <View className='h-px bg-surface-2 mb-3' />

          <View className='flex-row justify-between items-center'>
            <Text className='text-white font-bold'>Total debitado</Text>
            <Text className='text-primary font-bold text-base'>${total.toFixed(2)}</Text>
          </View>
        </View>

        <ErrorMessage message={error} />

        {/* Botões */}
        <View className='gap-3'>
          <Button
            title={loading ? 'Processando...' : 'Confirmar envio'}
            onPress={handleConfirm}
            variant='primary'
            fullWidth
            size='lg'
            loading={loading}
          />
          <Button
            title='Cancelar'
            onPress={() => navigate(ROUTES.SEND)}
            variant='outline'
            fullWidth
            size='lg'
            disabled={loading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SendConfirmationScreen;
