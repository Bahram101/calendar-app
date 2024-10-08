import React, { FC, useCallback, useEffect, useState } from 'react'
import { Dimensions, Text, View } from 'react-native'
import RenderHTML from 'react-native-render-html'
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
		dataListFromCtx,
		setDataListFromCtx
	} = useGetContextData()

	const { isLoading, fetchData } = useFetchData()
	const [isFetching, setIsFetching] = useState<boolean>(false)
	const [renderTrigger, setRenderTrigger] = useState<boolean>(false);

	useEffect(() => {
		setRenderTrigger(prev => !prev);
	}, [activeIndex]);

	const handleChange = useCallback(
		async ({ index, prevIndex }: { index: number, prevIndex: number }) => {
			if (!isFetching && index > prevIndex) {
				setIsFetching(true)

				const currentActiveDate = dataListFromCtx[index]?.front.date
				const nextDate = getShiftedDate(currentActiveDate, 1)

				if (currentActiveDate) {
					setActiveSwiperDate(currentActiveDate)
				}

				const nextDateDataExists = dataListFromCtx.some(
					item => item?.front?.date === nextDate
				)

				if (!nextDateDataExists) {
					const newData = await fetchData(nextDate)
					if (newData) {
						setDataListFromCtx((prev: any) => [...prev, newData])
					}
				}
				setActiveIndex(index)
				setIsFetching(false)
			} else if (index < prevIndex) {
				const currentActiveDate = dataListFromCtx[index]?.front.date
				setActiveSwiperDate(currentActiveDate)
				setActiveIndex(index)
			}
		},
		[dataListFromCtx, isFetching]
	)

	const getColorForDate = (itemDate: string) => {
		return itemDate === dateToday ? 'text-primary' : 'text-gray-400';
	};

	return isLoading && dataListFromCtx.length < 3 ? (
		<Loader />
	) : (
		<Layout className='px-5'>
			<SwiperFlatList
				key={renderTrigger ? "true" : "false"}
				onChangeIndex={data => handleChange(data)}
				data={dataListFromCtx}
				index={activeIndex}
				renderItem={({ item }) => {
					const textColor = getColorForDate(item?.front.date);
					return (
						<View className={`items-center pt-8 px-5`} style={[{ width }]}>
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
											// lineHeight: 23,
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
