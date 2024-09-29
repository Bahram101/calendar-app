import { FC, useCallback, useEffect, useState } from 'react'
import { Dimensions, Text, View } from 'react-native'
import SwiperFlatList from 'react-native-swiper-flatlist'
import { jsx } from 'react/jsx-runtime'

import { useDate } from '@/components/hooks/useDate'
import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'

import { getAdjacentDates, getNextDate } from '@/utils/helpers'

import { useData } from './useData'

interface UseDataResponse {
	data: any
	isLoading: boolean
}

const BackPage: FC = () => {
	const { width } = Dimensions.get('window')
	const { date, setDate } = useDate()
	const [activeIndex, setActiveIndex] = useState(1)
	const [isLoading, setIsLoading] = useState(false)
	const [dataList, setDataList] = useState([])

	const fetchData = async (date: string | null) => {
		if (dataList.some((item: any) => item.date === date)) return
		setIsLoading(true)
		try {
			const response = await fetch(
				`https://kuntizbe.kz/json/datas?date=${date}`
			)
			const res = await response.json()
			setDataList(prev => [...prev, res.back])
			setIsLoading(false)
		} catch (error) {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		const dates = getAdjacentDates(date)

		const fetchDateList = async () => {
			for (const item of dates) {
				await fetchData(item)
			}
			setDate(date)
		}
		fetchDateList()
	}, [])

	const handleChange = useCallback(
		({ index }: { index: number }) => {
			const activeItem = dataList[index]
			console.log('activeItemBack', activeItem)

			if (index === dataList.length - 1 && !isLoading) {
				// const lastItem = dataList[dataList.length - 1]
				// console.log('lastItem.date',lastItem.date)
				const nextDate = getNextDate(date)
				// setDate(activeItem.date)
				fetchData(nextDate)
			}
		},
		[dataList, isLoading, setDate, fetchData]
	)

	console.log('DATA_LIST_BACK', JSON.stringify(dataList.flat(), null, 2))
	console.log('DATE_BACK_CTX', date)

	return isLoading && dataList.length < 3 ? (
		<Loader />
	) : (
		<Layout>
			<SwiperFlatList
				onChangeIndex={data => handleChange(data)}
				data={dataList.flat()}
				index={dataList.length > 1 ? activeIndex : undefined}
				renderItem={({ item }) => {
					return (
						<View
							className={`items-center pt-8 px-5 bg-blue-50`}
							style={[{ width }]}
						>
							<Text className='font-bold uppercase selft-start'>
								{item?.category}
							</Text>

							<Text className='font-bold mb-3 uppercase text-primary'>
								{item?.title}
							</Text>

							<Text className=' mb-5'>{item?.content}</Text>
						</View>
					)
				}}
			/>
		</Layout>
	)
}

export default BackPage
