import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface NumPadProps {
  value: string;
  onChange: (value: string) => void;
}

export const NumPad: React.FC<NumPadProps> = ({ value, onChange }) => {
  const keys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    [".", "0", "⌫"],
  ];

  const handlePress = (key: string) => {
    if (key === "⌫") {
      onChange(value.length > 1 ? value.slice(0, -1) : "0");
    } else if (key === "." && value.includes(".")) {
      return;
    } else if (value === "0" && key !== ".") {
      onChange(key);
    } else {
      // Limit to 2 decimal places
      const parts = value.split(".");
      if (parts[1] !== undefined && parts[1].length >= 2) return;
      onChange(value + key);
    }
  };

  return (
    <View className="px-6">
      {keys.map((row, rowIndex) => (
        <View key={rowIndex} className="flex-row justify-between mb-3">
          {row.map((key) => (
            <TouchableOpacity
              key={key}
              className="w-20 h-14 bg-surface rounded-2xl items-center justify-center"
              onPress={() => handlePress(key)}
              activeOpacity={0.7}
            >
              <Text className="text-white text-xl font-semibold">{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};
