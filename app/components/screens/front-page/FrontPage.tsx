import React, { FC, useCallback, useEffect, useState } from 'react'
import { Dimensions, Text, View } from 'react-native'
import RenderHTML from 'react-native-render-html'
import { SwiperFlatList } from 'react-native-swiper-flatlist'

import Layout from '@/components/layout/Layout'
import { useData } from '@/components/screens/back-page/useData'
import Loader from '@/components/ui/Loader'
import { useAuth } from '@/components/hooks/useAuth'
import { getNextDate } from '@/utils/helpers'


// interface UseDataResponse {
// 	data: any
// 	isLoading?: boolean
// }

const FrontPage: FC = () => {
	const { width } = Dimensions.get('window')
	const [activeIndex, setActiveIndex] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const { setDate } = useAuth()
	const [dataList, setDataList] = useState([])
 

	const fetchData = async (date: any) => {
		if (dataList.some((item: any) => item.date === date)) return;
		setIsLoading(true);
		try {
			const response = await fetch(`https://kuntizbe.kz/json/datas?date=${date}`);
			const res = await response.json()
			setDataList(prev => [...prev, res.front])
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const fetchDataInOrder = async () => {
			let prev = new Date()
			let today = new Date()
			let next = new Date()

			prev = new Date(prev.setDate(prev.getDate() - 1)).toISOString().split('T')[0].toString()
			today = today.toISOString().split('T')[0].toString()
			next = new Date(next.setDate(next.getDate() + 1)).toISOString().split('T')[0].toString()
			const days = [prev, today, next]
			console.log('DAYS', days)
			setIsLoading(true);
			for (const day of days) {
				await fetchData(day);
			}
			setIsLoading(false);
		}
		fetchDataInOrder();
	}, [])

	const handleChange = useCallback(({ index }: { index: number }) => {
		setActiveIndex(index);

		if (index === dataList.length - 1 && !isLoading) {
			const lastItem = dataList[dataList.length - 1];
			const nextDate = getNextDate(lastItem.date);

			setDate(nextDate)
			fetchData(nextDate);
		}
	}, [dataList, isLoading]);

	console.log('DATA_LIST', JSON.stringify(dataList, null, 2));


	return isLoading && dataList.length < 1 ? <Loader /> : (<Layout>
		<SwiperFlatList
			onChangeIndex={(data) => handleChange(data)}
			data={dataList}
			index={dataList.length > 1 ? activeIndex : 0}
			renderItem={({ item }) => {
				return <View key={item.id} className={`items-center pt-8 px-5`} style={[{ width }]}>
					<Text className='text-xl font-bold uppercase selft-start'>
						{item.hijri_date}
					</Text>

					<Text className='font-bold mb-3 text-[180px] text-primary'>
						{item.day}
					</Text>

					<Text className='text-2xl font-bold uppercase mb-5'>
						{item.year_month}
					</Text>

					<Text style={{ width }}>
						{item.history}
					</Text>

					<Text style={{ width }}>
						{item.quote}
					</Text>
				</View>
			}}
		/>
	</Layout>)
}



export default FrontPage
