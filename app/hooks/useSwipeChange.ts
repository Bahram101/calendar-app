import { useCallback, useState } from 'react'

import { Data } from '@/types/fbdata.interface'

import { getShiftedDate } from '@/utils/helpers'

import { useFetchData } from './useFetchData'
import { useGetContextData } from './useGetContextData'

export const useSwipeChange = () => {
	const {
		setActiveSwiperDate, 
		setActiveIndex,
		dataList,
		setDataList
	} = useGetContextData()

	const { fetchData } = useFetchData()
	const [isFetching, setIsFetching] = useState<boolean>(false)

	const handleChange = useCallback(
		async ({ index, prevIndex }: { index: number; prevIndex: number }) => {
			if (!isFetching && index > prevIndex) {
				setIsFetching(true)

				const currentActiveDate = dataList && dataList[index]?.front.date
				const nextDate = getShiftedDate(currentActiveDate, 1)

				if (currentActiveDate) {
					setActiveSwiperDate(currentActiveDate)
				}

				const nextDateDataExists = dataList?.some(
					item => item?.front?.date === nextDate
				)

				if (!nextDateDataExists) {
					const newData = await fetchData(nextDate)
					if (newData) {
						setDataList((prev: Data[] | undefined) => [
							...(prev ?? []),
							newData
						])
					}
				}
				setActiveIndex(index)
				setIsFetching(false)
			} else if (index < prevIndex) {
				const currentActiveDate = dataList && dataList[index]?.front.date
				setActiveSwiperDate(currentActiveDate)
				setActiveIndex(index)
			}
		},
		[dataList, isFetching]
	)

	return { handleChange }
}
