import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLAyout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="sign-up"
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLAyout;

const styles = StyleSheet.create({});
