import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Route, Routes, Navigate, useNavigate } from 'react-router-native';
import { BottomNavBar } from '../components/BottomNavBar';
import { PushNotificationProvider } from '../components/PushNotificationProvider';
import HomeScreen from '../screens/HomeScreen';
import SendScreen from '../screens/SendScreen';
import ReceiveScreen from '../screens/ReceiveScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import SendConfirmationScreen from '../screens/SendConfirmationScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import { useAuthStore } from '../store/useAuthStore';

const AppRouter: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <View className='flex-1 bg-background items-center justify-center'>
        <ActivityIndicator size='large' color='#00D97E' />
      </View>
    );
  }

  return (
    <View className='flex-1 bg-background'>
      {isAuthenticated && <PushNotificationProvider />}
      <View className='flex-1'>
        <Routes>
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/forgot-password' element={<ForgotPasswordScreen />} />
          <Route
            path='/home'
            element={isAuthenticated ? <HomeScreen /> : <Navigate to='/login' replace />}
          />
          <Route
            path='/send'
            element={isAuthenticated ? <SendScreen /> : <Navigate to='/login' replace />}
          />
          <Route
            path='/send/confirm'
            element={
              isAuthenticated ? <SendConfirmationScreen /> : <Navigate to='/login' replace />
            }
          />
          <Route
            path='/receive'
            element={isAuthenticated ? <ReceiveScreen /> : <Navigate to='/login' replace />}
          />
          <Route
            path='/history'
            element={isAuthenticated ? <HistoryScreen /> : <Navigate to='/login' replace />}
          />
          <Route
            path='/profile'
            element={isAuthenticated ? <ProfileScreen /> : <Navigate to='/login' replace />}
          />
          <Route
            path='/notifications'
            element={isAuthenticated ? <NotificationsScreen /> : <Navigate to='/login' replace />}
          />
          <Route
            path='*'
            element={<Navigate to={isAuthenticated ? '/home' : '/login'} replace />}
          />
        </Routes>
      </View>
      {isAuthenticated && <BottomNavBar />}
    </View>
  );
};

export default AppRouter;
