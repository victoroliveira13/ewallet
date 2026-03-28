import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Share } from 'react-native';
import { useNavigate } from 'react-router-native';
import { currentUser } from '../constants/mockData';

const WALLET_ADDRESS = '0x1A2b3C4d5E6f7A8b9C0d';

const ReceiveScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleShare = () => {
    Share.share({
      message: `Send me money on E-Wallet!\nUsername: ${currentUser.username}\nWallet: ${WALLET_ADDRESS}`,
    });
  };

  return (
    <SafeAreaView className='flex-1 bg-background'>
      {/* Header */}
      <View className='flex-row items-center px-4 pt-4 pb-4'>
        <TouchableOpacity
          onPress={() => navigate('/home')}
          className='w-10 h-10 bg-surface rounded-full items-center justify-center mr-4'
        >
          <Text className='text-white text-lg'>←</Text>
        </TouchableOpacity>
        <Text className='text-white text-xl font-bold'>Receive Money</Text>
      </View>

      <View className='flex-1 items-center justify-center px-6'>
        {/* User info */}
        <View className='items-center mb-8'>
          <View className='w-20 h-20 rounded-full bg-primary/20 items-center justify-center mb-3'>
            <Text className='text-primary text-2xl font-bold'>{currentUser.initials}</Text>
          </View>
          <Text className='text-white text-xl font-bold'>{currentUser.name}</Text>
          <Text className='text-text-secondary text-sm mt-1'>{currentUser.username}</Text>
        </View>

        {/* QR Code placeholder */}
        <View className='bg-surface rounded-3xl p-6 w-full items-center'>
          <View className='w-52 h-52 bg-white rounded-2xl items-center justify-center mb-4 p-3'>
            {/* QR code grid pattern */}
            <View className='flex-1 w-full'>
              {Array.from({ length: 7 }).map((_, row) => (
                <View key={row} className='flex-row flex-1 justify-between'>
                  {Array.from({ length: 7 }).map((_, col) => {
                    const isCorner =
                      (row < 2 && col < 2) || (row < 2 && col > 4) || (row > 4 && col < 2);
                    const isDark = isCorner || Math.random() > 0.5;
                    return (
                      <View
                        key={col}
                        className='flex-1 m-0.5 rounded-sm'
                        style={{ backgroundColor: isDark ? '#0D0E18' : 'transparent' }}
                      />
                    );
                  })}
                </View>
              ))}
            </View>
          </View>

          <Text className='text-white font-semibold text-base mb-1'>Scan to Pay</Text>
          <Text className='text-text-secondary text-xs text-center'>{WALLET_ADDRESS}</Text>

          {/* Copy button */}
          <TouchableOpacity className='mt-4 bg-surface-2 rounded-xl px-6 py-3 flex-row items-center'>
            <Text className='text-primary mr-2'>📋</Text>
            <Text className='text-primary font-semibold text-sm'>Copy Address</Text>
          </TouchableOpacity>
        </View>

        {/* Share button */}
        <TouchableOpacity
          className='mt-6 bg-primary w-full rounded-2xl py-4 items-center'
          onPress={handleShare}
          activeOpacity={0.8}
        >
          <Text className='text-background font-bold text-base'>Share Payment Info</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ReceiveScreen;
