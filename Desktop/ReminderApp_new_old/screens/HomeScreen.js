// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { Appbar } from 'react-native-paper';
import { View, FlatList } from 'react-native';
import { FAB, Snackbar, Title } from 'react-native-paper';
import ReminderCard from '../components/ReminderCard';
import ReminderFormModal from '../components/ReminderFormModal';
import { loadReminders, saveReminders } from '../utils/storageManager';
import { scheduleNotification, cancelNotification, snoozeReminder } from '../utils/alarmManager';

const HomeScreen = () => {
  const [reminders, setReminders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    loadReminders().then(data => {
      if (data?.length) setReminders(data);
    });
  }, []);

  const handleSave = async (reminder) => {
    const updated = editing ? reminders.map(r => r.id === reminder.id ? reminder : r) : [...reminders, reminder];
    setReminders(updated);
    await saveReminders(updated);
    scheduleNotification(reminder);
    setSnackbarVisible(true);
  };

  const handleDelete = async (id) => {
    const updated = reminders.filter(r => r.id !== id);
    setReminders(updated);
    await saveReminders(updated);
    cancelNotification(id);
  };

  const handleSnooze = async (reminder) => {
    snoozeReminder(reminder);
  };

  return (

    // <View>
    //   <Title style={{ textAlign: 'center', marginVertical: 10 }}>Reminders</Title>
    //   <FlatList
    //     data={reminders}
    //     keyExtractor={item => item.id}
    //     renderItem={({ item }) => (
    //       <ReminderCard
    //         reminder={item}
    //         onDelete={handleDelete}
    //         onEdit={(r) => { setEditing(r); setModalVisible(true); }}
    //         onSnooze={handleSnooze}
    //         onDone={handleDelete}
    //       />
    //     )}
    //   />


<View style={{ flex: 1 }}>
  <Appbar.Header>
    <Appbar.Content title="Reminders" />
    <Appbar.Action icon="cog" onPress={() => navigation.navigate('Settings')} />
  </Appbar.Header>

      <FAB
        icon="plus"
        style={{ position: 'absolute', right: 20, bottom: 30 }}
        onPress={() => { setEditing(null); setModalVisible(true); }}
      />
      <ReminderFormModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        onSave={handleSave}
        existingReminder={editing}
      />
      <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)}>
        Reminder saved!
      </Snackbar>
    </View>
  );
};

export default HomeScreen;