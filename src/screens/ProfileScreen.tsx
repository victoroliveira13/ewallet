import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigate } from 'react-router-native';
import { useAuthStore } from '../store/useAuthStore';
import { PROFILE_MENU_ITEMS } from '../constants/ui';
import { ROUTES } from '../constants/routes';

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, biometricsEnabled, enableBiometrics } = useAuthStore();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [biometricMsg, setBiometricMsg] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
  };

  const handleEnableBiometrics = async () => {
    setBiometricMsg(null);
    try {
      await enableBiometrics();
      setBiometricMsg('Biometria ativada com sucesso!');
    } catch (err) {
      setBiometricMsg(err instanceof Error ? err.message : 'Nao foi possivel ativar a biometria.');
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-background'>
      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className='flex-row items-center justify-between px-4 pt-4 pb-2'>
          <Text className='text-white text-2xl font-bold'>Perfil</Text>
          <Pressable
            onPress={() => navigate(ROUTES.NOTIFICATIONS)}
            style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
          >
            <View className='w-10 h-10 bg-surface rounded-full items-center justify-center'>
              <Text>🔔</Text>
            </View>
          </Pressable>
        </View>

        {/* User Card */}
        <View className='mx-4 mt-4 bg-surface rounded-3xl p-6 items-center'>
          <View
            className='w-24 h-24 rounded-full items-center justify-center mb-4'
            style={{
              backgroundColor: `${user?.color ?? '#00D97E'}30`,
              borderWidth: 3,
              borderColor: `${user?.color ?? '#00D97E'}60`,
            }}
          >
            <Text className='text-3xl font-bold' style={{ color: user?.color ?? '#00D97E' }}>
              {user?.initials}
            </Text>
          </View>
          <Text className='text-white text-xl font-bold'>{user?.name}</Text>
          <Text className='text-text-secondary text-sm mt-1'>{user?.username}</Text>
          <Text className='text-text-muted text-xs mt-0.5'>{user?.email}</Text>

          <View className='flex-row w-full mt-6 justify-around'>
            <View className='items-center'>
              <Text className='text-white font-bold text-lg'>142</Text>
              <Text className='text-text-secondary text-xs'>Transacoes</Text>
            </View>
            <View className='w-px bg-surface-2' />
            <View className='items-center'>
              <Text className='text-white font-bold text-lg'>18</Text>
              <Text className='text-text-secondary text-xs'>Contatos</Text>
            </View>
            <View className='w-px bg-surface-2' />
            <View className='items-center'>
              <Text className='text-primary font-bold text-lg'>Pro</Text>
              <Text className='text-text-secondary text-xs'>Conta</Text>
            </View>
          </View>
        </View>

        {/* Biometrics */}
        {!biometricsEnabled && (
          <View className='mx-4 mt-4'>
            <Pressable
              onPress={handleEnableBiometrics}
              style={({ pressed }) => ({
                backgroundColor: pressed ? '#22253A' : '#1A1D2A',
                borderRadius: 16,
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
              })}
            >
              <View className='w-10 h-10 bg-surface-2 rounded-xl items-center justify-center mr-4'>
                <Text className='text-lg'>🔒</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text className='text-white font-medium'>Ativar biometria</Text>
                <Text className='text-text-muted text-xs mt-0.5'>Face ID ou impressao digital</Text>
              </View>
              <Text className='text-primary text-sm font-semibold'>Ativar</Text>
            </Pressable>
            {biometricMsg && (
              <Text className='text-text-secondary text-xs mt-2 mx-2'>{biometricMsg}</Text>
            )}
          </View>
        )}

        {/* Menu Items */}
        <View className='mx-4 mt-4 bg-surface rounded-2xl overflow-hidden mb-4'>
          {PROFILE_MENU_ITEMS.map((item, index) => (
            <View key={item.label}>
              <Pressable
                style={({ pressed }) => ({
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  backgroundColor: pressed ? '#22253A' : 'transparent',
                })}
                onPress={() => {
                  if (item.route) navigate(item.route);
                }}
              >
                <View className='w-10 h-10 bg-surface-2 rounded-xl items-center justify-center mr-4'>
                  <Text className='text-lg'>{item.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text className='text-white font-medium'>{item.label}</Text>
                  <Text className='text-text-muted text-xs mt-0.5'>{item.description}</Text>
                </View>
                <Text className='text-text-muted'>›</Text>
              </Pressable>
              {index < PROFILE_MENU_ITEMS.length - 1 && <View className='h-px bg-surface-2 mx-4' />}
            </View>
          ))}
        </View>

        {/* Logout */}
        {!confirmLogout ? (
          <Pressable
            onPress={() => setConfirmLogout(true)}
            style={({ pressed }) => ({
              marginHorizontal: 16,
              marginBottom: 32,
              backgroundColor: pressed ? '#FF475720' : '#FF475715',
              borderRadius: 16,
              paddingVertical: 16,
              alignItems: 'center',
            })}
          >
            <Text style={{ color: '#FF4757', fontWeight: 'bold', fontSize: 16 }}>
              Sair da conta
            </Text>
          </Pressable>
        ) : (
          <View className='mx-4 mb-8 bg-surface rounded-2xl p-4'>
            <Text className='text-white font-semibold text-center mb-4'>
              Tem certeza que deseja sair?
            </Text>
            <View className='flex-row gap-3'>
              <Pressable
                onPress={() => setConfirmLogout(false)}
                style={({ pressed }) => ({
                  flex: 1,
                  backgroundColor: pressed ? '#22253A' : '#1A1D2A',
                  borderRadius: 12,
                  paddingVertical: 12,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#22253A',
                })}
              >
                <Text className='text-white font-semibold'>Cancelar</Text>
              </Pressable>
              <Pressable
                onPress={handleLogout}
                style={({ pressed }) => ({
                  flex: 1,
                  backgroundColor: pressed ? '#cc3344' : '#FF4757',
                  borderRadius: 12,
                  paddingVertical: 12,
                  alignItems: 'center',
                })}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Sair</Text>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
