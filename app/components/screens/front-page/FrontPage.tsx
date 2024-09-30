import React, { FC, useCallback, useEffect, useState } from 'react'
import { Dimensions, Text, View } from 'react-native'
import RenderHTML from 'react-native-render-html'
import { SwiperFlatList } from 'react-native-swiper-flatlist'

import { useGetActiveSwiperDate } from '@/components/hooks/useGetActiveSwiperDate'
import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'

import { getAdjacentDates, getNextDate } from '@/utils/helpers'
import { useFetchData } from '@/components/hooks/useFetchData'

const FrontPage: FC = () => {
	const { width } = Dimensions.get('window')
	const [activeIndex, setActiveIndex] = useState(1)
	const { date, setDate } = useGetActiveSwiperDate()
	const { dataList, isLoading, fetchData } = useFetchData();

	useEffect(() => {
		const dates = getAdjacentDates(date);
		const fetchDateList = async () => {
			for (const item of dates) {
				await fetchData(item,);
			}
			setDate(date);
		};
		fetchDateList();
	}, []);

	const handleChange = useCallback(
		({ index }: { index: number }) => {
			const activeItem = dataList[index]
			if (index === dataList.length - 1 && !isLoading) {
				const lastItem = dataList[dataList.length - 1]
				const nextDate = getNextDate(lastItem.front.date)
				setDate(activeItem.front.date)
				fetchData(nextDate)
			}
		},
		[isLoading]
	)

	console.log('DATA_LIST', JSON.stringify(dataList, null, 2))


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
								{item.front.hijri_date}
							</Text>
							<Text className='font-bold mb-3 text-[180px] text-primary'>
								{item.front.day}
							</Text>
							<Text className='text-2xl font-bold uppercase mb-5'>
								{item.front.year_month}
							</Text>
							<Text style={{ width }}>{item.front.history}</Text>
							<Text style={{ width }}>{item.front.quote}</Text>
						</View>
					)
				}}
			/>
		</Layout>
	)
}

export default FrontPage
