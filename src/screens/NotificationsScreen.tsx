import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigate } from 'react-router-native';
import { notifications as initialNotifications } from '../constants/mockData';
import type { Notification } from '../types';

const NotificationsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [notifs, setNotifs] = useState<Notification[]>(initialNotifications);

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const iconMap: Record<Notification['type'], string> = {
    transfer: '💸',
    info: 'ℹ️',
    alert: '⚠️',
  };

  const bgMap: Record<Notification['type'], string> = {
    transfer: '#00D97E20',
    info: '#2196F320',
    alert: '#FFB30020',
  };

  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <SafeAreaView className='flex-1 bg-background'>
      {/* Header */}
      <View className='flex-row items-center justify-between px-4 pt-4 pb-4'>
        <View className='flex-row items-center'>
          <TouchableOpacity
            onPress={() => navigate('/home')}
            className='w-10 h-10 bg-surface rounded-full items-center justify-center mr-4'
          >
            <Text className='text-white text-lg'>←</Text>
          </TouchableOpacity>
          <View>
            <Text className='text-white text-xl font-bold'>Notifications</Text>
            {unreadCount > 0 && (
              <Text className='text-text-secondary text-xs'>{unreadCount} unread</Text>
            )}
          </View>
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllRead}>
            <Text className='text-primary text-sm font-medium'>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
        <View className='bg-surface mx-4 rounded-2xl overflow-hidden mb-8'>
          {notifs.map((notif, index) => (
            <View key={notif.id}>
              <TouchableOpacity
                className={`flex-row items-start px-4 py-4 ${!notif.read ? 'bg-primary/5' : ''}`}
                activeOpacity={0.7}
                onPress={() =>
                  setNotifs((prev) =>
                    prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
                  )
                }
              >
                {/* Icon */}
                <View
                  className='w-11 h-11 rounded-2xl items-center justify-center mr-4 mt-0.5'
                  style={{ backgroundColor: bgMap[notif.type] }}
                >
                  <Text className='text-xl'>{iconMap[notif.type]}</Text>
                </View>

                {/* Content */}
                <View className='flex-1'>
                  <View className='flex-row items-center justify-between mb-0.5'>
                    <Text className='text-white font-semibold text-sm'>{notif.title}</Text>
                    {!notif.read && <View className='w-2 h-2 rounded-full bg-primary' />}
                  </View>
                  <Text className='text-text-secondary text-xs leading-4'>{notif.message}</Text>
                  <Text className='text-text-muted text-xs mt-1.5'>{notif.time}</Text>
                </View>
              </TouchableOpacity>

              {index < notifs.length - 1 && <View className='h-px bg-surface-2 mx-4' />}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsScreen;
