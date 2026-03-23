import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
}) => {
  const baseStyle = "flex-row items-center justify-center rounded-2xl";

  const variantStyles = {
    primary: "bg-primary",
    secondary: "bg-surface-2",
    outline: "border border-primary bg-transparent",
    ghost: "bg-transparent",
    danger: "bg-danger",
  };

  const textVariantStyles = {
    primary: "text-background font-bold",
    secondary: "text-text-primary font-semibold",
    outline: "text-primary font-semibold",
    ghost: "text-text-secondary",
    danger: "text-white font-bold",
  };

  const sizeStyles = {
    sm: "px-4 py-2",
    md: "px-6 py-3.5",
    lg: "px-8 py-4",
  };

  const textSizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const opacityStyle = disabled || loading ? "opacity-50" : "";
  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <TouchableOpacity
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${opacityStyle} ${widthStyle}`}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === "primary" ? "#0D0E18" : "#00D97E"} />
      ) : (
        <>
          {icon && <View className="mr-2">{icon}</View>}
          <Text className={`${textVariantStyles[variant]} ${textSizeStyles[size]}`}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};
