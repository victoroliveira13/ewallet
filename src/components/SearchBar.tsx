import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search transactions...',
}) => {
  return (
    <View className='flex-row items-center bg-surface rounded-2xl px-4 py-3 gap-3'>
      <Text className='text-text-secondary text-base'>🔍</Text>
      <TextInput
        className='flex-1 text-white text-sm'
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor='#6B7280'
        returnKeyType='search'
        autoCorrect={false}
        autoCapitalize='none'
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => onChangeText('')}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text className='text-text-secondary text-base'>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
