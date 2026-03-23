import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface BalanceCardProps {
  balance: number;
  name: string;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ balance, name }) => {
  const [visible, setVisible] = useState(true);

  const formatBalance = (value: number) =>
    value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <View className="bg-surface rounded-3xl p-6 mx-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <View>
          <Text className="text-text-secondary text-sm">Total Balance</Text>
          <Text className="text-white text-xs mt-0.5">{name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => setVisible(!visible)}
          className="bg-surface-2 rounded-full px-3 py-1.5"
        >
          <Text className="text-text-secondary text-xs">{visible ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>

      {/* Balance */}
      <View className="mb-6">
        <Text className="text-white text-4xl font-bold">
          {visible ? `$${formatBalance(balance)}` : "••••••"}
        </Text>
        <View className="flex-row items-center mt-2">
          <View className="w-2 h-2 rounded-full bg-primary mr-2" />
          <Text className="text-primary text-sm">+2.4% this month</Text>
        </View>
      </View>

      {/* Card number */}
      <View className="flex-row items-center justify-between">
        <Text className="text-text-muted text-sm tracking-widest">•••• •••• •••• 4291</Text>
        <View className="flex-row">
          <View className="w-8 h-8 rounded-full bg-primary/40 -mr-3" />
          <View className="w-8 h-8 rounded-full bg-primary/70" />
        </View>
      </View>
    </View>
  );
};
