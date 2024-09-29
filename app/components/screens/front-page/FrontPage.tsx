import React, { FC, useCallback, useEffect, useState } from 'react'
import { Dimensions, Text, View } from 'react-native'
import RenderHTML from 'react-native-render-html'
import { SwiperFlatList } from 'react-native-swiper-flatlist'

import { useDate } from '@/components/hooks/useDate'
import Layout from '@/components/layout/Layout'
import { useGetData } from '@/components/screens/back-page/useGetData'
import Loader from '@/components/ui/Loader'

import { getAdjacentDates, getNextDate } from '@/utils/helpers'

// interface UseDataResponse {
// 	data: any
// 	isLoading?: boolean
// }

const FrontPage: FC = () => {
	const { width } = Dimensions.get('window')
	const [activeIndex, setActiveIndex] = useState(1)
	const [isLoading, setIsLoading] = useState(false)
	const { date, setDate } = useDate()
	const [dataList, setDataList] = useState([])

	const fetchData = async (date: any) => {
		// if (dataList.some((item: any) => item.date === date)) return
		setIsLoading(true)
		try {
			const response = await fetch(
				`https://kuntizbe.kz/json/datas?date=${date}`
			)
			const res = await response.json()
			setDataList(prev => [...prev, res.front])
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		// const today = new Date()
		// const currentDate = today.toISOString().split('T')[0]
		const dates = getAdjacentDates(date)

		const fetchDateList = async () => {
			for (const item of dates) {
				await fetchData(item)
			}
			// setDate(currentDate)
		}
		fetchDateList()
	}, [])

	const handleChange = useCallback(
		({ index }: { index: number }) => {
			const activeItem = dataList[index]

			if (index === dataList.length - 1 && !isLoading) {
				const lastItem = dataList[dataList.length - 1]
				const nextDate = getNextDate(lastItem.date)
				setDate(activeItem.date)
				fetchData(nextDate)
			}
		},
		[dataList, isLoading, setDate, fetchData]
	)

	console.log('DATA_LIST', JSON.stringify(dataList, null, 2))
	console.log('DATE_FRONT_CTX', date)

	return isLoading && dataList.length < 3 ? (
		<Loader />
	) : (
		<Layout className='px-5'>
			<SwiperFlatList
				onChangeIndex={data => handleChange(data)}
				data={dataList}
				index={dataList.length > 1 ? activeIndex : undefined}
				renderItem={({ item }) => {
					return (
						<View className={`items-center pt-8 px-5`} style={[{ width }]}>
							<Text className='text-xl font-bold uppercase selft-start'>
								{item.hijri_date}
							</Text>

							<Text className='font-bold mb-3 text-[180px] text-primary'>
								{item.day}
							</Text>

							<Text className='text-2xl font-bold uppercase mb-5'>
								{item.year_month}
							</Text>

							<Text style={{ width }}>{item.history}</Text>

							<Text style={{ width }}>{item.quote}</Text>
						</View>
					)
				}}
			/>
		</Layout>
	)
}

export default FrontPage
