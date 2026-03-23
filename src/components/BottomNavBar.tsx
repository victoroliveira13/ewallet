import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { useLocation, useNavigate } from "react-router-native";

const navItems = [
  { path: "/home", label: "Home", icon: "🏠" },
  { path: "/history", label: "History", icon: "📋" },
  { path: "/send", label: "Send", icon: "➤", isCenter: true },
  { path: "/receive", label: "Receive", icon: "📥" },
  { path: "/profile", label: "Profile", icon: "👤" },
];

export const BottomNavBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <View
      className="flex-row items-center bg-surface border-t border-surface-2"
      style={{ paddingBottom: Platform.OS === "ios" ? 20 : 8 }}
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;

        if (item.isCenter) {
          return (
            <TouchableOpacity
              key={item.path}
              className="flex-1 items-center -mt-6"
              onPress={() => navigate(item.path)}
              activeOpacity={0.8}
            >
              <View className="w-16 h-16 rounded-full bg-primary items-center justify-center shadow-lg">
                <Text className="text-background text-2xl font-bold">↑</Text>
              </View>
              <Text className="text-primary text-xs mt-1 font-semibold">{item.label}</Text>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={item.path}
            className="flex-1 items-center py-3"
            onPress={() => navigate(item.path)}
            activeOpacity={0.8}
          >
            <Text className={`text-xl mb-1 ${isActive ? "opacity-100" : "opacity-40"}`}>
              {item.icon}
            </Text>
            <Text
              className={`text-xs font-medium ${
                isActive ? "text-primary" : "text-text-muted"
              }`}
            >
              {item.label}
            </Text>
            {isActive && (
              <View className="absolute bottom-0 w-1 h-1 rounded-full bg-primary" />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
