// screens/SettingsScreen.js
import React from 'react';
import { View, ScrollView, Linking } from 'react-native';
import { Text, Button, List, Title, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation }) => {
  const clearData = async () => {
    await AsyncStorage.clear();
    alert("All reminders cleared.");
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Title>Settings & Help</Title>

      <List.Section>
        <List.Subheader>Battery Optimization (MIUI)</List.Subheader>
        <Text>
          Some MIUI versions kill background reminders. To ensure reminders work:
        </Text>
        <List.Item
          title="Disable Battery Optimization"
          description="Settings > Battery & Performance > Choose App > No Restrictions"
          left={props => <List.Icon {...props} icon="battery" />}
        />
        <List.Item
          title="Enable Auto-start"
          description="Settings > Apps > Manage > Auto-start > Your App"
          left={props => <List.Icon {...props} icon="android" />}
        />
      </List.Section>

      <Divider />

      <Button icon="delete" mode="outlined" onPress={clearData} style={{ marginTop: 20 }}>
        Clear All Reminders
      </Button>

      <Text style={{ marginTop: 20, fontSize: 12, color: "gray" }}>ReminderApp v1.0</Text>
    </ScrollView>
  );
};

export default SettingsScreen;