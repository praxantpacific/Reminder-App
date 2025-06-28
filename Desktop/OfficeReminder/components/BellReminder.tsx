
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, useColorScheme, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';

export function BellReminder() {
    const colorScheme = useColorScheme() ?? 'light';
    
    return (
        <Pressable onPress={() => Alert.alert('Notifications', 'No new notifications.')}>
            <Ionicons name="notifications-outline" size={24} color={Colors[colorScheme].text} />
        </Pressable>
    )
}
