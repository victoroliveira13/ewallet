import React from 'react';
import { View, Text } from 'react-native';

interface BadgeProps {
  label: string;
  variant?: 'success' | 'danger' | 'warning' | 'info' | 'default';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'default', size = 'md' }) => {
  const variantStyles = {
    success: 'bg-primary/20',
    danger: 'bg-danger/20',
    warning: 'bg-warning/20',
    info: 'bg-info/20',
    default: 'bg-surface-2',
  };

  const textVariantStyles = {
    success: 'text-primary',
    danger: 'text-danger',
    warning: 'text-warning',
    info: 'text-info',
    default: 'text-text-secondary',
  };

  const sizeStyles = { sm: 'px-2 py-0.5', md: 'px-3 py-1' };
  const textSizeStyles = { sm: 'text-xs', md: 'text-xs' };

  return (
    <View className={`rounded-full ${variantStyles[variant]} ${sizeStyles[size]}`}>
      <Text className={`${textVariantStyles[variant]} ${textSizeStyles[size]} font-semibold`}>
        {label}
      </Text>
    </View>
  );
};
