import React from "react";
import { View, ViewStyle } from "react-native";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: ViewStyle;
  elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = "", style, elevated = false }) => {
  return (
    <View
      className={`bg-surface rounded-2xl p-4 ${elevated ? "shadow-lg" : ""} ${className}`}
      style={style}
    >
      {children}
    </View>
  );
};
