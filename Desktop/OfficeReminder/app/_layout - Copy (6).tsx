
import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="checkin" options={{ title: 'Daily Check-In', presentation: 'modal' }} />
      <Stack.Screen name="tasks" options={{ title: "Today's Tasks", presentation: 'modal' }} />
      <Stack.Screen name="reminders" options={{ title: 'Reminders', presentation: 'modal' }} />
      <Stack.Screen name="add-task" options={{ title: 'Add New Task', presentation: 'modal' }} />
    </Stack>
  );
}
