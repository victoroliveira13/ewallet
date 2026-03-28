import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { Transaction } from '../types';
import { Colors } from '../constants/colors';

interface TransactionItemProps {
  transaction: Transaction;
  onPress?: () => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onPress }) => {
  const isCredit = transaction.type === 'credit';
  const categoryColor = Colors.categories[transaction.category];

  return (
    <TouchableOpacity
      className='flex-row items-center py-3.5 px-4'
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Icon */}
      <View
        className='w-12 h-12 rounded-2xl items-center justify-center mr-4'
        style={{ backgroundColor: `${categoryColor}20` }}
      >
        <Text className='text-xl'>{transaction.icon}</Text>
      </View>

      {/* Info */}
      <View className='flex-1'>
        <Text className='text-white font-semibold text-base'>{transaction.title}</Text>
        <Text className='text-text-secondary text-xs mt-0.5'>{transaction.date}</Text>
      </View>

      {/* Amount */}
      <Text className={`font-bold text-base ${isCredit ? 'text-primary' : 'text-white'}`}>
        {isCredit ? '+' : ''}
        {isCredit ? '$' : '-$'}
        {Math.abs(transaction.amount).toFixed(2)}
      </Text>
    </TouchableOpacity>
  );
};
