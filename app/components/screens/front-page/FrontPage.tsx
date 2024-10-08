import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Dimensions, Text, View } from 'react-native'
import HTMLView from 'react-native-htmlview';
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import { useFetchData } from '@/components/hooks/useFetchData'
import { useGetContextData } from '@/components/hooks/useGetContextData'
import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'

import { getShiftedDate } from '@/utils/helpers'

const FrontPage: FC = () => {
	const { width } = Dimensions.get('window')
	const {
		dateToday,
		activeSwiperDate,
		setActiveSwiperDate,
		activeIndex,
		setActiveIndex,
		dataList,
		setDataList
	} = useGetContextData()

	const { isLoading, fetchData } = useFetchData()
	const [isFetching, setIsFetching] = useState<boolean>(false)
	const [renderTrigger, setRenderTrigger] = useState<boolean>(false);

	const handleChange = useCallback(
		async ({ index, prevIndex }: { index: number, prevIndex: number }) => {
			if (!isFetching && index > prevIndex) {
				setIsFetching(true)

				const currentActiveDate = dataList[index]?.front.date
				const nextDate = getShiftedDate(currentActiveDate, 1)

				if (currentActiveDate) {
					setActiveSwiperDate(currentActiveDate)
				}

				const nextDateDataExists = dataList.some(
					item => item?.front?.date === nextDate
				)

				if (!nextDateDataExists) {
					const newData = await fetchData(nextDate)
					if (newData) {
						setDataList((prev: any) => [...prev, newData])
					}
				}
				setActiveIndex(index)
				setIsFetching(false)
			} else if (index < prevIndex) {
				const currentActiveDate = dataList[index]?.front.date
				setActiveSwiperDate(currentActiveDate)
				setActiveIndex(index)
			}
		},
		[dataList, isFetching]
	)

	const getColorForDate = (itemDate: string) => {
		return itemDate === dateToday ? 'text-primary' : 'text-gray-400';
	};

	console.log('FFactiveIndex', activeIndex)

	return isLoading && dataList.length < 3 ? (
		<Loader />
	) : (
		<Layout className='px-5'>
			<SwiperFlatList
				// key={activeIndex}	 
				index={activeIndex}
				data={dataList}
				onChangeIndex={data => handleChange(data)}
				renderItem={({ item }) => {
					const textColor = getColorForDate(item?.front.date);
					return (
						<View
							key={item.front.id}
							className={`items-center pt-8 px-5`}
							style={[{ width }]}
						>
							<Text className='text-xl font-bold uppercase selft-start'>
								{item?.front.hijri_date}
							</Text>
							<Text className={`font-bold mb-3 text-[180px] ${textColor}`}>
								{item?.front.day}
							</Text>
							<Text className='text-2xl font-bold uppercase'>
								{item?.front.year_month}
							</Text>
							<Text className={`uppercase text-2xl font-bold mb-[40px] ${textColor}`}>
								{item.front.dayofweek}</Text>
							<View className='mb-[20px] w-full border-b border-gray-300 pb-4' >
								<HTMLView
									value={item?.front.history.replace(/\n/g, '')}
									stylesheet={{
										p: {
											textAlign: 'center',
										},
									}}
								/>
							</View>
							<View className='w-full text-center'>
								<HTMLView
									value={item?.front.quote.replace(/\n/g, '')}
									stylesheet={{
										p: {
											textAlign: 'center',
											marginBottom: -17,
										},
									}}
								/>
							</View>
						</View>
					)
				}}
			/>
		</Layout>
	)
}

export default FrontPage
