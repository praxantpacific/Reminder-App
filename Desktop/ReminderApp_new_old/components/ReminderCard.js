// components/ReminderCard.js
import React from 'react';
import { Card, Button, Paragraph, Chip } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import moment from 'moment';

const ReminderCard = ({ reminder, onDone, onEdit, onDelete, onSnooze }) => {
  const formattedDate = moment(reminder.date).format('MMM Do, h:mm A');
  const timeLeft = moment(reminder.date).fromNow();

  return (
    <Card style={styles.card}>
      <Card.Title
        title={reminder.title}
        subtitle={`${formattedDate} • ${timeLeft}`}
      />
      <Card.Content>
        {reminder.description ? (
          <Paragraph>{reminder.description}</Paragraph>
        ) : null}
        <View style={styles.tagsContainer}>
          {reminder.tags?.map((tag, idx) => (
            <Chip key={idx} style={styles.chip}>{tag}</Chip>
          ))}
          {reminder.repeat ? (
            <Chip icon="repeat" style={styles.repeatChip}>Repeats {reminder.repeatType}</Chip>
          ) : null}
        </View>
      </Card.Content>
      <Card.Actions>
        <Button icon="check" onPress={() => onDone(reminder.id)}>Done</Button>
        <Button icon="alarm-snooze" onPress={() => onSnooze(reminder)}>Snooze</Button>
        <Button icon="pencil" onPress={() => onEdit(reminder)}>Edit</Button>
        <Button icon="delete" onPress={() => onDelete(reminder.id)} textColor="red">Delete</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { margin: 8 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  chip: { marginRight: 5, marginTop: 4 },
  repeatChip: { marginLeft: 'auto', backgroundColor: '#e0f7fa' },
});

export default ReminderCard;