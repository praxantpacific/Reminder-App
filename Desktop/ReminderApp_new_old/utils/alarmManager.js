// utils/alarmManager.js
import PushNotification from 'react-native-push-notification';
import { NOTIFICATION_CHANNEL_ID, DEFAULT_SNOOZE_MINUTES, NOTIFICATION_CHANNEL_CONFIG } from '../constants/notifications';

export const scheduleNotification = (reminder) => {
  PushNotification.localNotificationSchedule({
    channelId: NOTIFICATION_CHANNEL_ID,
    title: 'Reminder',
    message: reminder.title,
    date: new Date(reminder.date),
    allowWhileIdle: true,
    id: reminder.id,
    repeatType: reminder.repeat ? reminder.repeatType : null,
  });
};

export const cancelNotification = (id) => {
  PushNotification.cancelLocalNotifications({ id });
};

export const snoozeReminder = (reminder, mins = DEFAULT_SNOOZE_MINUTES) => {
  const newTime = new Date(Date.now() + mins * 60000);
  PushNotification.localNotificationSchedule({
    channelId: NOTIFICATION_CHANNEL_ID,
    title: 'Snoozed Reminder',
    message: reminder.title,
    date: newTime,
    allowWhileIdle: true,
  });
};

PushNotification.createChannel(NOTIFICATION_CHANNEL_CONFIG, (created) =>
  console.log(`channel '${NOTIFICATION_CHANNEL_ID}' created:`, created)
);