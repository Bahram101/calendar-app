import * as SplashScreen from 'expo-splash-screen'
import {
	FC,
	PropsWithChildren,
	createContext,
	useState,
	useEffect,
	useMemo
} from 'react'
import { IContext, TypeUserState } from './data-provider.interface'
export const DataContext = createContext({} as IContext)

const DataProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [date, setDate] = useState<TypeUserState>(null)
	useEffect(()=>{
		const today = new Date()
		const currentDate = today.toISOString().split('T')[0]
		setDate(currentDate) 
	}, [])  

	return (
		<DataContext.Provider value={{date, setDate}}>
			{children}
		</DataContext.Provider>
	)
}

export default DataProvider
