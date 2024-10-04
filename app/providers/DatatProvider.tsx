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
import { useFetchData } from '@/components/hooks/useFetchData';
export const DataContext = createContext({} as IContext)

const DataProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [date, setDate] = useState<TypeUserState>(null);
	const { dataList, isLoading, fetchData } = useFetchData(); 
	const [dataListFromCtx, setDataListFromCtx] = useState<any[]>(dataList);

	useEffect(() => {
		const today = new Date();
		const currentDate = today.toISOString().split('T')[0];
		setDate(currentDate);
	}, []);

	useEffect(() => {
		const fetchInitialData = async () => {
			if (date) {
				await fetchData(date);
			}
		};
		fetchInitialData();
	}, [date]); 

	useEffect(() => {
		if (dataList.length > 0) {
			setDataListFromCtx(dataList);
		}
	}, [dataList]);

	console.log('dataListFromCtx:', JSON.stringify(dataListFromCtx, null, 2));

	const value = useMemo(
		() => ({
			date,
			setDate,
			dataListFromCtx,
			setDataListFromCtx,
		}),
		[date, dataListFromCtx]
	);

	return (
		<DataContext.Provider value={value}>
			{children}
		</DataContext.Provider>
	);
};

export default DataProvider;
