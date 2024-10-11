import * as SplashScreen from 'expo-splash-screen'
import {
	FC,
	PropsWithChildren,
	createContext,
	useEffect,
	useMemo,
	useState
} from 'react'

import { useFetchData } from '@/hooks/useFetchData'

import { getAdjacentDates } from '@/utils/helpers'

import { IContext, TypeDateState } from './data-provider.interface'
import { Data } from '@/types/fbdata.interface'

export const DataContext = createContext({} as IContext)

const DataProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [dateToday, setDateToday] = useState<TypeDateState>(null)
	const [activeSwiperDate, setActiveSwiperDate] = useState<TypeDateState>(null)
	const [activeIndex, setActiveIndex] = useState<number>(1)
	const [dataList, setDataList] = useState<Data[] | undefined>(undefined);
	const { fetchData } = useFetchData()

	useEffect(() => {
		const tdy = new Date()
		const today = tdy.toISOString().split('T')[0].toString()
		setDateToday(today)

		const date = new Date()
		const activeSwiperDate = date.toISOString().split('T')[0].toString()
		const dates = getAdjacentDates(activeSwiperDate)

		const fetchDateList = async () => {
			const fetchedDataList: Data[] = []
			for (const item of dates) {
				const data = await fetchData(item)
				if (data) {
					fetchedDataList.push(data)
				}
			}
			setDataList(fetchedDataList)
		}
		fetchDateList()
		setActiveSwiperDate(activeSwiperDate)
	}, [])

	const value = useMemo(
		() => ({
			dateToday,
			setDateToday,
			activeSwiperDate,
			setActiveSwiperDate,
			activeIndex,
			setActiveIndex,
			dataList,
			setDataList
		}),
		[dateToday, activeSwiperDate, activeIndex, dataList]
	)

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export default DataProvider
