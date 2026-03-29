import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigate } from 'react-router-native';
import { ContactItem } from '../components/ContactItem';
import { NumPad } from '../components/NumPad';
import { Button } from '../components/ui/Button';
import { useWalletStore } from '../store/useWalletStore';
import { useNotificationStore } from '../store/useNotificationStore';
import type { Contact } from '../types';

const SendScreen: React.FC = () => {
  const navigate = useNavigate();
  const { contacts, balance, sendTransfer } = useWalletStore();
  const { addNotification } = useNotificationStore();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [amount, setAmount] = useState('0');

  const handleSend = () => {
    if (!selectedContact) {
      Alert.alert('Select Contact', 'Please select a contact to send money to.');
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (parsedAmount <= 0) {
      Alert.alert('Enter Amount', 'Please enter a valid amount.');
      return;
    }
    if (parsedAmount > balance) {
      Alert.alert('Insufficient Balance', `You only have $${balance.toFixed(2)} available.`);
      return;
    }
    sendTransfer(selectedContact, parsedAmount);
    addNotification({
      title: 'Transfer Sent',
      message: `$${parsedAmount.toFixed(2)} sent to ${selectedContact.name}`,
      time: 'Just now',
      type: 'transfer',
    });
    Alert.alert('Transfer Successful! 🎉', `$${amount} sent to ${selectedContact.name}`, [
      { text: 'OK', onPress: () => navigate('/home') },
    ]);
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
        <Text className='text-white text-xl font-bold'>Send Money</Text>
      </View>

      <ScrollView className='flex-1' keyboardShouldPersistTaps='handled'>
        {/* Amount Display */}
        <View className='items-center py-8'>
          <Text className='text-text-secondary text-sm mb-2'>Enter Amount</Text>
          <Text className='text-white text-5xl font-bold'>${amount}</Text>
        </View>

        {/* NumPad */}
        <NumPad value={amount} onChange={setAmount} />

        {/* Selected Contact or Contact List */}
        {selectedContact ? (
          <View className='mx-4 mt-6 bg-surface rounded-2xl p-4'>
            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center'>
                <View
                  className='w-12 h-12 rounded-full items-center justify-center mr-3'
                  style={{ backgroundColor: `${selectedContact.color}30` }}
                >
                  <Text className='text-base font-bold' style={{ color: selectedContact.color }}>
                    {selectedContact.initials}
                  </Text>
                </View>
                <View>
                  <Text className='text-white font-semibold'>{selectedContact.name}</Text>
                  <Text className='text-text-secondary text-xs'>{selectedContact.username}</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setSelectedContact(null)}
                className='bg-surface-2 rounded-full px-3 py-1'
              >
                <Text className='text-text-secondary text-xs'>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className='mt-6 mb-4'>
            <Text className='text-white font-semibold px-4 mb-2'>Select Contact</Text>
            <View className='bg-surface mx-4 rounded-2xl overflow-hidden'>
              {contacts.map((contact, index) => (
                <View key={contact.id}>
                  <ContactItem contact={contact} onPress={setSelectedContact} showSendButton />
                  {index < contacts.length - 1 && <View className='h-px bg-surface-2 mx-4' />}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Send Button */}
        <View className='mx-4 mt-6 mb-8'>
          <Button
            title={`Send $${amount}`}
            onPress={handleSend}
            variant='primary'
            fullWidth
            size='lg'
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SendScreen;
