import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function RandomizersLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({ light: '#f0f0f0', dark: '#121212' });
  const headerTintColor = useThemeColor({ light: '#000000', dark: '#FFFFFF' });

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor,
        },
        headerTintColor,
        headerBackTitle: 'Back',
        headerBackTitleVisible: true,
        headerShadowVisible: false,
      }}
    />
  );
}