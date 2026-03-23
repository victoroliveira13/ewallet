import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Contact } from "../types";

interface ContactItemProps {
  contact: Contact;
  onPress: (contact: Contact) => void;
  showSendButton?: boolean;
}

export const ContactItem: React.FC<ContactItemProps> = ({ contact, onPress, showSendButton = false }) => {
  return (
    <TouchableOpacity
      className="flex-row items-center py-3 px-4"
      onPress={() => onPress(contact)}
      activeOpacity={0.7}
    >
      {/* Avatar */}
      <View
        className="w-12 h-12 rounded-full items-center justify-center mr-4"
        style={{ backgroundColor: `${contact.color}30` }}
      >
        <Text className="text-base font-bold" style={{ color: contact.color }}>
          {contact.initials}
        </Text>
      </View>

      {/* Info */}
      <View className="flex-1">
        <Text className="text-white font-semibold text-base">{contact.name}</Text>
        <Text className="text-text-secondary text-xs mt-0.5">{contact.username}</Text>
      </View>

      {showSendButton && (
        <View className="bg-primary/20 rounded-full px-3 py-1.5">
          <Text className="text-primary text-xs font-semibold">Send</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
