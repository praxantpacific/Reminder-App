
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert, Platform, useColorScheme, Linking } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    // Fix for TS error: satisfy NotificationBehavior type
    shouldShowBanner: true,
    shouldShowList: false,
  }),
});

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    // For the alarm-like behavior, we set high importance. 
    // By not specifying a 'sound' file, it will use the system's default notification sound for this channel.
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    Alert.alert(
      'Permission Denied', 
      'Cannot set reminders without notification permissions. Please enable them in your device settings.',
      [
        { text: "Cancel" },
        { text: "Open Settings", onPress: () => Linking.openSettings() }
      ]
    );
    return false;
  }
  
  return true;
}


export default function CheckInScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    useEffect(() => {
        registerForPushNotificationsAsync();
    }, []);

    const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };
    
    const onTimeChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShowTimePicker(false);
        setDate(currentDate);
    };

    const handleSetReminder = async () => {
        if (!title.trim()) {
            Alert.alert('Input Required', 'Please enter a title for your reminder.');
            return;
        }

        const isGranted = await registerForPushNotificationsAsync();
        if (!isGranted) {
             return; // Alert is already shown in the permission function
        }

        if (date.getTime() <= Date.now()) {
            Alert.alert('Invalid Time', 'Please select a future time for the reminder.');
            return;
        }

        await Notifications.scheduleNotificationAsync({
            content: {
                title: `Reminder: ${title}`,
                body: description || 'You have an upcoming event.',
                // For iOS, leaving 'sound' null/undefined uses the default notification sound.
                // On Android, the sound is determined by the channel set above.
            },
            trigger: date, // Use the Date object directly as the trigger
        });

        Alert.alert('Success', `Reminder set for "${title}"`, [
          { text: 'OK', onPress: () => router.back() }
        ]);
        setTitle('');
        setDescription('');
    };
    
    const styles = getStyles(colorScheme);

    return (
        <View style={styles.container}>
            <ThemedText style={styles.header}>Set a Reminder</ThemedText>

            <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Reminder Title (Day)</ThemedText>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="e.g., Project Deadline"
                    placeholderTextColor={Colors[colorScheme].text}
                />
            </View>

            <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Description (Optional)</ThemedText>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Add more details..."
                    placeholderTextColor={Colors[colorScheme].text}
                    multiline
                />
            </View>
            
            <View style={styles.pickerContainer}>
                 <Pressable onPress={() => setShowDatePicker(true)} style={styles.pickerButton}>
                     <ThemedText style={styles.pickerButtonText}>Select Date</ThemedText>
                     <ThemedText style={styles.pickerValue}>{date.toLocaleDateString()}</ThemedText>
                 </Pressable>
                 <Pressable onPress={() => setShowTimePicker(true)} style={styles.pickerButton}>
                     <ThemedText style={styles.pickerButtonText}>Select Time</ThemedText>
                     <ThemedText style={styles.pickerValue}>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</ThemedText>
                 </Pressable>
            </View>
            
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                    minimumDate={new Date()}
                />
            )}
            
            {showTimePicker && (
                <DateTimePicker
                    value={date}
                    mode="time"
                    display="default"
                    onChange={onTimeChange}
                />
            )}
            
            <Pressable style={styles.submitButton} onPress={handleSetReminder}>
                <Text style={styles.submitButtonText}>Set Reminder Alarm</Text>
            </Pressable>
            
            <View style={styles.noteBox}>
                <Text style={styles.noteText}>
                    Note: This uses native notifications and requires a{' '}
                    <Text style={{fontWeight: 'bold'}}>development build</Text> to work correctly, not the Expo Go app.
                </Text>
            </View>
        </View>
    );
}

const getStyles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: Colors[colorScheme].background,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        backgroundColor: Colors[colorScheme].card,
        color: Colors[colorScheme].text,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: Colors[colorScheme].border,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    pickerButton: {
        backgroundColor: Colors[colorScheme].card,
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        width: '48%',
        borderWidth: 1,
        borderColor: Colors[colorScheme].border,
    },
    pickerButtonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    pickerValue: {
      marginTop: 4,
      color: Colors[colorScheme].tint,
    },
    submitButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 8,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    noteBox: {
        marginTop: 24,
        padding: 12,
        backgroundColor: Colors[colorScheme].card,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors[colorScheme].border,
    },
    noteText: {
        textAlign: 'center',
        fontSize: 12,
        color: Colors[colorScheme].text,
        lineHeight: 18,
    }
});
