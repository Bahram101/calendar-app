import * as SplashScreen from 'expo-splash-screen'
import {
	FC,
	PropsWithChildren,
	createContext,
	useState
} from 'react'
import { IContext, TypeUserState } from './data-provider.interface'
export const DataContext = createContext({} as IContext)

const DataProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [date, setDate] = useState<TypeUserState>(null)

	return (
		<DataContext.Provider value={{ date, setDate }}>
			{children}
		</DataContext.Provider>
	)
}

export default DataProvider
