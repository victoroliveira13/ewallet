import React from 'react';
import { View, Text } from 'react-native';

interface ErrorMessageProps {
  message: string | null | undefined;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <View className='flex-row items-center bg-danger/10 rounded-xl px-4 py-3 mt-2 gap-2'>
      <Text className='text-danger text-sm'>⚠️</Text>
      <Text className='text-danger text-sm flex-1'>{message}</Text>
    </View>
  );
};
