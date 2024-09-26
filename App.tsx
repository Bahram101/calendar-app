import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

import Navigation from '@/navigation/Navigation'
import DataProvider from '@/providers/DatatProvider'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<DataProvider>
				<SafeAreaProvider>
					<Navigation />
				</SafeAreaProvider>
			</DataProvider>
			<StatusBar
				backgroundColor='transparent'
			/>
			<Toast />
		</QueryClientProvider>
	)
}
