import { FC, useCallback, useEffect, useState } from 'react'
import { Dimensions, Text, View } from 'react-native'
import SwiperFlatList from 'react-native-swiper-flatlist'

import { useFetchData } from '@/hooks/useFetchData'
import { useGetContextData } from '@/hooks/useGetContextData'
import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'
import { getShiftedDate } from '@/utils/helpers'
import SwiperItem from './SwiperItem'
import { Data } from '@/types/fbdata.interface'

const BackPage: FC = () => { 
	const {
		setActiveSwiperDate,
		activeIndex,
		setActiveIndex,
		dataList,
		setDataList,
	} = useGetContextData()
	const { fetchData } = useFetchData()
	const [isFetching, setIsFetching] = useState(false)

	const handleChange = useCallback(
		async ({ index, prevIndex }: { index: number, prevIndex: number }) => {
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
						setDataList((prev:Data[] | undefined) => [...prev ?? [], newData])
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

	return dataList && dataList.length < 3 ? (
		<Loader />
	) : (
		<Layout className='px-5'>
			<SwiperFlatList
				index={activeIndex}
				data={dataList}
				onChangeIndex={data => handleChange(data)}
				renderItem={({ item }) => <SwiperItem item={item} />}
			/>
		</Layout>
	)
}

export default BackPage
