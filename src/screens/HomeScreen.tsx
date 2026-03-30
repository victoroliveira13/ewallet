import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigate } from 'react-router-native';
import { BalanceCard } from '../components/BalanceCard';
import { QuickAction } from '../components/QuickAction';
import { TransactionItem } from '../components/TransactionItem';
import { getGreeting } from '../utils/greeting';
import { useWalletStore } from '../store/useWalletStore';
import { useAuthStore } from '../store/useAuthStore';
import { useNotificationStore } from '../store/useNotificationStore';
import { RECENT_TRANSACTIONS_LIMIT, MAX_BADGE_COUNT } from '../constants/config';
import { ROUTES } from '../constants/routes';
import { QUICK_ACTIONS } from '../constants/ui';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { balance, transactions } = useWalletStore();
  const { user } = useAuthStore();
  const { unreadCount } = useNotificationStore();

  const recentTransactions = transactions.slice(0, RECENT_TRANSACTIONS_LIMIT);

  return (
    <SafeAreaView className='flex-1 bg-background'>
      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className='flex-row items-center justify-between px-4 pt-4 pb-6'>
          <View>
            <Text className='text-text-secondary text-sm'>{getGreeting()},</Text>
            <Text className='text-white text-2xl font-bold mt-0.5'>{user?.name} 👋</Text>
          </View>
          <TouchableOpacity onPress={() => navigate(ROUTES.NOTIFICATIONS)} className='relative'>
            <View className='w-11 h-11 bg-surface rounded-full items-center justify-center'>
              <Text className='text-xl'>🔔</Text>
            </View>
            {unreadCount > 0 && (
              <View className='absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full items-center justify-center'>
                <Text className='text-background text-xs font-bold'>
                  {unreadCount > MAX_BADGE_COUNT ? `${MAX_BADGE_COUNT}+` : unreadCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <BalanceCard balance={balance} name={user?.name ?? ''} />

        {/* Quick Actions */}
        <View className='mt-8 px-4'>
          <Text className='text-white font-semibold text-base mb-4'>Quick Actions</Text>
          <View className='flex-row justify-between'>
            {QUICK_ACTIONS.map((action) => (
              <QuickAction
                key={action.label}
                label={action.label}
                icon={action.icon}
                onPress={() => action.route && navigate(action.route)}
                highlighted={action.highlighted}
              />
            ))}
          </View>
        </View>

        {/* Recent Transactions */}
        <View className='mt-8 mb-8'>
          <View className='flex-row items-center justify-between px-4 mb-2'>
            <Text className='text-white font-semibold text-base'>Recent Transactions</Text>
            <TouchableOpacity onPress={() => navigate(ROUTES.HISTORY)}>
              <Text className='text-primary text-sm font-medium'>See All</Text>
            </TouchableOpacity>
          </View>

          <View className='bg-surface mx-4 rounded-2xl overflow-hidden'>
            {recentTransactions.map((tx, index) => (
              <View key={tx.id}>
                <TransactionItem transaction={tx} />
                {index < recentTransactions.length - 1 && (
                  <View className='h-px bg-surface-2 mx-4' />
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
