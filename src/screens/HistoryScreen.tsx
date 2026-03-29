import React, { useState } from 'react';
import { View, Text, SectionList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TransactionItem } from '../components/TransactionItem';
import { useWalletStore } from '../store/useWalletStore';
import { groupTransactionsByDate } from '../utils/groupTransactionsByDate';

const FILTERS = ['All', 'Income', 'Expense'];

const HistoryScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const { transactions } = useWalletStore();

  const filtered = transactions.filter((tx) => {
    if (activeFilter === 'Income') return tx.type === 'credit';
    if (activeFilter === 'Expense') return tx.type === 'debit';
    return true;
  });

  const sections = groupTransactionsByDate(filtered);

  const totalIncome = transactions
    .filter((t) => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'debit')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <SafeAreaView className='flex-1 bg-background'>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={
          <>
            {/* Header */}
            <View className='px-4 pt-4 pb-2'>
              <Text className='text-white text-2xl font-bold'>Transaction History</Text>
              <Text className='text-text-secondary text-sm mt-1'>All your transactions</Text>
            </View>

            {/* Summary cards */}
            <View className='flex-row px-4 mt-4 gap-3'>
              <View className='flex-1 bg-surface rounded-2xl p-4'>
                <Text className='text-text-secondary text-xs mb-1'>Total Income</Text>
                <Text className='text-primary font-bold text-lg'>+${totalIncome.toFixed(2)}</Text>
              </View>
              <View className='flex-1 bg-surface rounded-2xl p-4'>
                <Text className='text-text-secondary text-xs mb-1'>Total Expense</Text>
                <Text className='text-danger font-bold text-lg'>-${totalExpense.toFixed(2)}</Text>
              </View>
            </View>

            {/* Filters */}
            <View className='flex-row px-4 mt-6 gap-2'>
              {FILTERS.map((filter) => (
                <TouchableOpacity
                  key={filter}
                  onPress={() => setActiveFilter(filter)}
                  className={`px-5 py-2 rounded-full ${
                    activeFilter === filter ? 'bg-primary' : 'bg-surface'
                  }`}
                >
                  <Text
                    className={`text-sm font-semibold ${
                      activeFilter === filter ? 'text-background' : 'text-text-secondary'
                    }`}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        }
        renderSectionHeader={({ section: { title } }) => (
          <View className='px-4 pt-6 pb-2'>
            <Text className='text-text-secondary text-xs font-semibold uppercase tracking-widest'>
              {title}
            </Text>
          </View>
        )}
        renderItem={({ item, index, section }) => (
          <View className='mx-4'>
            <View
              className={`bg-surface overflow-hidden ${
                index === 0 ? 'rounded-t-2xl' : ''
              } ${index === section.data.length - 1 ? 'rounded-b-2xl' : ''}`}
            >
              <TransactionItem transaction={item} />
              {index < section.data.length - 1 && <View className='h-px bg-surface-2 mx-4' />}
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View className='py-12 items-center'>
            <Text className='text-4xl mb-3'>📭</Text>
            <Text className='text-text-secondary'>No transactions found</Text>
          </View>
        }
        ListFooterComponent={<View className='h-8' />}
      />
    </SafeAreaView>
  );
};

export default HistoryScreen;
