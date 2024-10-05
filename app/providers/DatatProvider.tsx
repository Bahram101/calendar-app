import * as SplashScreen from 'expo-splash-screen'
import {
	FC,
	PropsWithChildren,
	createContext,
	useEffect,
	useMemo,
	useState
} from 'react'

import { useFetchData } from '@/components/hooks/useFetchData'

import { getAdjacentDates } from '@/utils/helpers'

import { IContext, TypeUserState } from './data-provider.interface'

export const DataContext = createContext({} as IContext)

const DataProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [date, setDate] = useState<TypeUserState>(null)
	const { dataList, fetchData } = useFetchData()
	const [dataListFromCtx, setDataListFromCtx] = useState<any[]>([])

	useEffect(() => {
		const today = new Date()
		const currentDate = today.toISOString().split('T')[0].toString()
		const dates = getAdjacentDates(currentDate)

		const fetchDateList = async () => {
      const fetchedDataList = []  // Временный массив для сохранения данных
      for (const item of dates) {
        const data = await fetchData(item)
        if (data) {
          fetchedDataList.push(data)  // Добавляем полученные данные
        }
      }
      setDataListFromCtx(fetchedDataList)  // Сохраняем в состояние
    }

    fetchDateList()
    setDate(currentDate)
	}, [])

	// console.log('dataListFromCtx:', JSON.stringify(dataListFromCtx, null, 2));
	// console.log('firstDateCtx', JSON.stringify(dataList[0]?.front.date, null, 2));
	// console.log('lastDateCtx', JSON.stringify(dataList, null, 2));

	const value = useMemo(
		() => ({
			date,
			setDate,
			dataListFromCtx,
			setDataListFromCtx
		}),
		[date, dataListFromCtx]
	)

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export default DataProvider
