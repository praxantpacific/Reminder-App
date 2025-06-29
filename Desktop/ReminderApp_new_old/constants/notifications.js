// constants/notifications.js
export const NOTIFICATION_CHANNEL_ID = 'reminder-channel';

export const DEFAULT_SNOOZE_MINUTES = 10;

export const NOTIFICATION_CHANNEL_CONFIG = {
  channelId: NOTIFICATION_CHANNEL_ID,
  channelName: 'Reminders',
  channelDescription: 'Reminder notifications',
  playSound: true,
  soundName: 'default',
  vibrate: true,
  importance: 4,
  visibility: 'public',
};