
import { BellReminder } from '@/components/BellReminder';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import { Pressable, StyleSheet, useColorScheme, View } from 'react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <View style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          // Ensure you have this image at the specified path
          <Image
            source={require('@/assets/images/mahavir-logo.png')}
            style={styles.reactLogo}
            contentFit="contain"
          />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Office Reminder</ThemedText>
          <BellReminder />
        </ThemedView>

        <SectionButton
          title="Daily Check-In"
          iconName="create-outline"
          buttonColor="#007aff"
          href="/checkin"
        />
        <SectionButton
          title="Today's Tasks"
          iconName="checkmark-done-outline"
          buttonColor="#34c759"
          href="/tasks"
        />
        <SectionButton
          title="Reminders"
          iconName="notifications-outline"
          buttonColor="#ff9500"
          href="/reminders"
        />
      </ParallaxScrollView>

      <Link href="/add-task" asChild>
        <Pressable style={[styles.floatingAddButton, { borderColor: Colors[colorScheme].tint }]}>
          <Ionicons name="add" size={32} color={Colors[colorScheme].tint} />
        </Pressable>
      </Link>
    </View>
  );
}

const SectionButton = ({ title, iconName, buttonColor, href }: { title: string, iconName: keyof typeof Ionicons.glyphMap, buttonColor: string, href: string }) => (
  <ThemedView style={styles.sectionContainer}>
    <View style={styles.sectionHeader}>
      <Ionicons name={iconName} size={20} color={buttonColor} />
      <ThemedText type="subtitle" style={styles.sectionTitle}>
        {title}
      </ThemedText>
    </View>
    <Pressable style={[styles.button, { backgroundColor: buttonColor }]} onPress={() => router.push(href as any)}>
      <ThemedText type="defaultSemiBold" style={styles.buttonText}>
        {title === 'Daily Check-In' ? 'Start Check-In' : `View ${title.split(' ')[1]}`}
      </ThemedText>
    </Pressable>
  </ThemedView>
);

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 24,
  },
  sectionContainer: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
  },
  reactLogo: {
    height: 178,
    width: 290,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  floatingAddButton: {
    position: 'absolute',
    bottom: 30,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
