import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pblack" >Tengo un Dodge Demon 1971, motor 318</Text>
      <Link href="/profile">Profile</Link>
    </View>
  );
};

export default RootLayout;
