import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Settings</ThemedText>
      
      <ThemedView style={styles.settingSection}>
        <ThemedText type="subtitle">About</ThemedText>
        <ThemedText>Randomize Me is an app that helps you randomize various elements with a simple and fun interface.</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.settingSection}>
        <ThemedText type="subtitle">Theme</ThemedText>
        <ThemedText>Current theme: {colorScheme === 'dark' ? 'Dark' : 'Light'}</ThemedText>
        <ThemedText style={styles.note}>Your device settings determine the app theme.</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.settingSection}>
        <ThemedText type="subtitle">Version</ThemedText>
        <ThemedText>1.0.0</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  settingSection: {
    marginTop: 24,
    gap: 8,
  },
  note: {
    fontStyle: 'italic',
    marginTop: 4,
    opacity: 0.7,
  },
});