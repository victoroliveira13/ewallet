import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigate } from 'react-router-native';
import { currentUser } from '../constants/mockData';

const menuItems = [
  { icon: '💳', label: 'My Cards', description: 'Manage your cards' },
  { icon: '🔔', label: 'Notifications', description: 'Push notifications' },
  { icon: '🔒', label: 'Security', description: 'Password & biometrics' },
  { icon: '🌍', label: 'Language', description: 'English' },
  { icon: '❓', label: 'Help & Support', description: 'FAQ & contact' },
  { icon: '⚙️', label: 'Settings', description: 'App settings' },
];

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <SafeAreaView className='flex-1 bg-background'>
      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className='flex-row items-center justify-between px-4 pt-4 pb-2'>
          <Text className='text-white text-2xl font-bold'>Profile</Text>
          <TouchableOpacity
            onPress={() => navigate('/notifications')}
            className='w-10 h-10 bg-surface rounded-full items-center justify-center'
          >
            <Text>🔔</Text>
          </TouchableOpacity>
        </View>

        {/* User Card */}
        <View className='mx-4 mt-4 bg-surface rounded-3xl p-6 items-center'>
          <View className='w-24 h-24 rounded-full bg-primary/20 items-center justify-center mb-4 border-4 border-primary/30'>
            <Text className='text-primary text-3xl font-bold'>{currentUser.initials}</Text>
          </View>
          <Text className='text-white text-xl font-bold'>{currentUser.name}</Text>
          <Text className='text-text-secondary text-sm mt-1'>{currentUser.username}</Text>
          <Text className='text-text-muted text-xs mt-0.5'>{currentUser.email}</Text>

          {/* Stats */}
          <View className='flex-row w-full mt-6 justify-around'>
            <View className='items-center'>
              <Text className='text-white font-bold text-lg'>142</Text>
              <Text className='text-text-secondary text-xs'>Transactions</Text>
            </View>
            <View className='w-px bg-surface-2' />
            <View className='items-center'>
              <Text className='text-white font-bold text-lg'>18</Text>
              <Text className='text-text-secondary text-xs'>Contacts</Text>
            </View>
            <View className='w-px bg-surface-2' />
            <View className='items-center'>
              <Text className='text-primary font-bold text-lg'>Pro</Text>
              <Text className='text-text-secondary text-xs'>Account</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className='mx-4 mt-4 bg-surface rounded-2xl overflow-hidden mb-4'>
          {menuItems.map((item, index) => (
            <View key={item.label}>
              <TouchableOpacity
                className='flex-row items-center px-4 py-4'
                activeOpacity={0.7}
                onPress={() => {
                  if (item.label === 'Notifications') navigate('/notifications');
                }}
              >
                <View className='w-10 h-10 bg-surface-2 rounded-xl items-center justify-center mr-4'>
                  <Text className='text-lg'>{item.icon}</Text>
                </View>
                <View className='flex-1'>
                  <Text className='text-white font-medium'>{item.label}</Text>
                  <Text className='text-text-muted text-xs mt-0.5'>{item.description}</Text>
                </View>
                <Text className='text-text-muted'>›</Text>
              </TouchableOpacity>
              {index < menuItems.length - 1 && <View className='h-px bg-surface-2 mx-4' />}
            </View>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity
          className='mx-4 mb-8 bg-danger/10 rounded-2xl py-4 items-center'
          onPress={() =>
            Alert.alert('Logout', 'Are you sure you want to logout?', [
              { text: 'Cancel' },
              { text: 'Logout', style: 'destructive' },
            ])
          }
          activeOpacity={0.8}
        >
          <Text className='text-danger font-bold text-base'>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
