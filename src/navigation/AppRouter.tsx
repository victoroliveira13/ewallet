import React from 'react';
import { View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import { BottomNavBar } from '../components/BottomNavBar';
import { PushNotificationProvider } from '../components/PushNotificationProvider';
import HomeScreen from '../screens/HomeScreen';
import SendScreen from '../screens/SendScreen';
import ReceiveScreen from '../screens/ReceiveScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

const AppRouter: React.FC = () => {
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
        </Routes>
      </View>

      {/* Bottom Navigation */}
      <BottomNavBar />
    </View>
  );
};

export default AppRouter;
