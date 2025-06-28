
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

export default function RemindersScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Reminders</ThemedText>
      <ThemedText style={styles.subtitle}>This feature is under development.</ThemedText>
      <Pressable onPress={() => router.back()} style={styles.button}>
        <ThemedText style={styles.buttonText}>Go Back</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  subtitle: {
    marginTop: 16,
    fontSize: 16,
  },
  button: {
      marginTop: 32,
      backgroundColor: '#007AFF',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 8,
  },
  buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
  }
});
