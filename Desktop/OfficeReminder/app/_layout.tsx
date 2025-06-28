
import { Stack, router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

export default function RootLayout() {
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    // This listener handles notifications that are received while the app is open and in the foreground.
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received while app is foregrounded:', notification);
      // Here, you could display an in-app banner or update UI
    });

    // This listener handles what happens when a user taps on a notification.
    // It works whether the app is in the foreground, background, or was just opened by the notification.
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response received:', response);
      const title = response.notification.request.content.title;
      
      // For demonstration, we'll show an alert. In a real app, you might navigate to a specific screen.
      Alert.alert(title ?? 'Reminder', 'You tapped on the notification!', [{ text: 'OK' }]);
      // Example navigation: router.push('/reminders');
    });

    // It's important to clean up the listeners when the component unmounts.
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

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
