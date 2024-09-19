import Navigation from '@/navigation/Navigation';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
      <StatusBar style="light" />
      <Toast/>
    </>
  );
}

