import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import { BottomNavBar } from '../components/BottomNavBar';
import { PushNotificationProvider } from '../components/PushNotificationProvider';
import HomeScreen from '../screens/HomeScreen';
import SendScreen from '../screens/SendScreen';
import ReceiveScreen from '../screens/ReceiveScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import { useAuthStore } from '../store/useAuthStore';

const AppRouter: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <View className='flex-1 bg-background items-center justify-center'>
        <ActivityIndicator size='large' color='#00D97E' />
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path='/' element={<Navigate to='/login' replace />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/forgot-password' element={<ForgotPasswordScreen />} />
        <Route path='*' element={<Navigate to='/login' replace />} />
      </Routes>
    );
  }

  return (
    <View className='flex-1 bg-background'>
      {/* Inicializa push notifications (precisa estar dentro do NativeRouter) */}
      <PushNotificationProvider />

      {/* Main content area */}
      <View className='flex-1'>
        <Routes>
          <Route path='/' element={<Navigate to='/home' replace />} />
          <Route path='/home' element={<HomeScreen />} />
          <Route path='/send' element={<SendScreen />} />
          <Route path='/receive' element={<ReceiveScreen />} />
          <Route path='/history' element={<HistoryScreen />} />
          <Route path='/profile' element={<ProfileScreen />} />
          <Route path='/notifications' element={<NotificationsScreen />} />
          <Route path='*' element={<Navigate to='/home' replace />} />
        </Routes>
      </View>

      {/* Bottom Navigation */}
      <BottomNavBar />
    </View>
  );
};

export default AppRouter;
