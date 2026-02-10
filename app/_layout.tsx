import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { RefreshProvider } from '@/contexts/reloadContext/reloadContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import connection from '@/infra/connection';
import { SQLiteProvider } from 'expo-sqlite';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SQLiteProvider databaseName="schedule.db" onInit={connection}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RefreshProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
        </RefreshProvider> 
        <StatusBar style="auto" />
      </ThemeProvider>
    </SQLiteProvider>
  );
}
