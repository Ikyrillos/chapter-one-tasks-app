import { Stack } from 'expo-router';
import React from 'react';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        // Hide the top header if you want a full-screen look
        headerShown: false,
      }}
    />
  );
}