import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigate } from 'react-router-native';
import { BalanceCard } from '../components/BalanceCard';
import { QuickAction } from '../components/QuickAction';
import { TransactionItem } from '../components/TransactionItem';
import { currentUser, transactions } from '../constants/mockData';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  const recentTransactions = transactions.slice(0, 4);

  return (
    <SafeAreaView className='flex-1 bg-background'>
      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className='flex-row items-center justify-between px-4 pt-4 pb-6'>
          <View>
            <Text className='text-text-secondary text-sm'>Good Morning,</Text>
            <Text className='text-white text-2xl font-bold mt-0.5'>{currentUser.name} 👋</Text>
          </View>
          <TouchableOpacity onPress={() => navigate('/notifications')} className='relative'>
            <View className='w-11 h-11 bg-surface rounded-full items-center justify-center'>
              <Text className='text-xl'>🔔</Text>
            </View>
            {/* Notification badge */}
            <View className='absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full items-center justify-center'>
              <Text className='text-background text-xs font-bold'>2</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <BalanceCard balance={currentUser.balance} name={currentUser.name} />

        {/* Quick Actions */}
        <View className='mt-8 px-4'>
          <Text className='text-white font-semibold text-base mb-4'>Quick Actions</Text>
          <View className='flex-row justify-between'>
            <QuickAction label='Send' icon='↑' onPress={() => navigate('/send')} highlighted />
            <QuickAction label='Receive' icon='↓' onPress={() => navigate('/receive')} />
            <QuickAction label='Top Up' icon='+' onPress={() => {}} />
            <QuickAction label='More' icon='•••' onPress={() => {}} />
          </View>
        </View>

        {/* Recent Transactions */}
        <View className='mt-8 mb-8'>
          <View className='flex-row items-center justify-between px-4 mb-2'>
            <Text className='text-white font-semibold text-base'>Recent Transactions</Text>
            <TouchableOpacity onPress={() => navigate('/history')}>
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
