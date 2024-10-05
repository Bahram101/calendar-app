import React, { FC, useCallback, useEffect, useState } from 'react'
import { Dimensions, Text, View } from 'react-native'
import RenderHTML from 'react-native-render-html'
import { SwiperFlatList } from 'react-native-swiper-flatlist'

import { useFetchData } from '@/components/hooks/useFetchData'
import { useGetActiveSwiperDate } from '@/components/hooks/useGetActiveSwiperDate'
import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'

import { getAdjacentDates, getShiftedDate } from '@/utils/helpers'

const FrontPage: FC = React.memo(() => {
	const { width } = Dimensions.get('window')
	const [activeIndex, setActiveIndex] = useState(1)
	const [prevIndex, setPrevIndex] = useState<number | null>(null)
	const { date, setDate, dataListFromCtx, setDataListFromCtx } =
		useGetActiveSwiperDate()
	const { dataList, isLoading, fetchData } = useFetchData()
	const [isFetching, setIsFetching] = useState(false)

	const handleChange = useCallback(
		async ({ index }: { index: number }) => {
			if (!isFetching && (prevIndex === null || index > prevIndex)) {
				setIsFetching(true) 

				const currentActiveDate = dataListFromCtx[index]?.front.date
				const nextDate = getShiftedDate(currentActiveDate, 1)
				console.log('nextDate',nextDate)
				// Проверяем, существует ли следующая дата
				if (currentActiveDate) {
					setDate(currentActiveDate)
				}

				// Проверяем, если данные уже существуют для следующей даты
				const nextDateDataExists = dataListFromCtx.some(
					(item) => item?.front?.date === nextDate
				)

				if (!nextDateDataExists) { 
					const newData = await fetchData(nextDate)
					if (newData) {
						setDataListFromCtx((prev) => [...prev, newData])
					}
				} 

				// Обновляем индексы и отключаем блокировку
				setPrevIndex(index)
				setActiveIndex(index)
				setIsFetching(false)
			}
		},
		[prevIndex, dataListFromCtx, fetchData, setDate, setDataListFromCtx, isFetching]
	)

	console.log('Front_DATA_LIST_CTX', JSON.stringify(dataListFromCtx, null, 2))
	// console.log('date2', date)

	return isLoading && dataListFromCtx.length < 3 ? (
		<Loader />
	) : (
		<Layout className='px-5'>
			<SwiperFlatList
				onChangeIndex={data => handleChange(data)}
				data={dataListFromCtx}
				index={dataListFromCtx.length > 1 ? activeIndex : undefined}
				renderItem={({ item }) => {
					return (
						<View className={`items-center pt-8 px-5`} style={[{ width }]}>
							<Text className='text-xl font-bold uppercase selft-start'>
								{item?.front.hijri_date}
							</Text>
							<Text className='font-bold mb-3 text-[180px] text-primary'>
								{item?.front.day}
							</Text>
							<Text className='text-2xl font-bold uppercase mb-5'>
								{item?.front.year_month}
							</Text>
							<Text style={{ width }}>{item?.front.history}</Text>
							<Text style={{ width }}>{item?.front.quote}</Text>
						</View>
					)
				}}
			/>
		</Layout>
	)
})

export default FrontPage
