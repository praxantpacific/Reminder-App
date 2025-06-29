// components/ReminderFormModal.js
import React, { useState } from 'react';
import { Modal, Portal, TextInput, Button, Divider, Title, HelperText } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const ReminderFormModal = ({ visible, onDismiss, onSave, existingReminder }) => {
  const [title, setTitle] = useState(existingReminder?.title || '');
  const [description, setDescription] = useState(existingReminder?.description || '');
  const [tags, setTags] = useState(existingReminder?.tags?.join(', ') || '');
  const [repeat, setRepeat] = useState(existingReminder?.repeat || false);
  const [repeatType, setRepeatType] = useState(existingReminder?.repeatType || 'daily');
  const [date, setDate] = useState(existingReminder ? new Date(existingReminder.date) : new Date());
  const [showPick, setShowPick] = useState(false);

  const save = () => {
    const tagsList = tags.split(',').map(tag => tag.trim());
    const data = {
      id: existingReminder?.id || Date.now().toString(),
      title,
      description,
      tags: tagsList,
      repeat,
      repeatType,
      date,
    };
    onSave(data);
    onDismiss();
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={{ backgroundColor: 'white', margin: 20, padding: 20, borderRadius: 10 }}>
        <ScrollView>
          <Title>Add / Edit Reminder</Title>
          <TextInput label="Title" value={title} onChangeText={setTitle} style={{ marginVertical: 10 }} />
          <TextInput label="Description" value={description} multiline onChangeText={setDescription} />
          <TextInput
            label="Tags (comma separated)"
            value={tags}
            onChangeText={setTags}
            style={{ marginVertical: 10 }}
          />
          <Button onPress={() => setShowPick(true)}>Pick Date & Time</Button>
          {showPick && (
            <DateTimePicker
              value={date}
              mode="datetime"
              onChange={(e, selectedDate) => {
                if (selectedDate) setDate(selectedDate);
                setShowPick(false);
              }}
            />
          )}

          <TextInput
            label="Repeat (e.g. daily, weekly)"
            value={repeatType}
            onChangeText={setRepeatType}
          />
          <HelperText type="info">Leave blank if non-repeating</HelperText>
          <Divider style={{ marginVertical: 10 }} />
          <Button mode="contained" onPress={save}>Save</Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

export default ReminderFormModal;