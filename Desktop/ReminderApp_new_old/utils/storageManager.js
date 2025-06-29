// utils/storageManager.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveReminders = async (data) => {
  try {
    await AsyncStorage.setItem('@reminders', JSON.stringify(data));
  } catch (e) {
    console.error("Save error:", e);
  }
};

export const loadReminders = async () => {
  try {
    const data = await AsyncStorage.getItem('@reminders');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Load error:", e);
    return [];
  }
};