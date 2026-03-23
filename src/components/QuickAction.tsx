import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface QuickActionProps {
  label: string;
  icon: string;
  onPress: () => void;
  highlighted?: boolean;
}

export const QuickAction: React.FC<QuickActionProps> = ({ label, icon, onPress, highlighted = false }) => {
  return (
    <TouchableOpacity className="items-center" onPress={onPress} activeOpacity={0.8}>
      <View
        className={`w-14 h-14 rounded-2xl items-center justify-center mb-2 ${
          highlighted ? "bg-primary" : "bg-surface"
        }`}
      >
        <Text className="text-2xl">{icon}</Text>
      </View>
      <Text className={`text-xs font-medium ${highlighted ? "text-primary" : "text-text-secondary"}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
