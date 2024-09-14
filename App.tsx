import Home from '@/Home';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <Text>Home</Text>
      </SafeAreaProvider>
      <StatusBar style="light" />
    </>
  );
}

