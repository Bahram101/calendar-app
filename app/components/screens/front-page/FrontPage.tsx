import React, { FC, useCallback, useEffect, useState } from 'react'
import { Dimensions, Text, View } from 'react-native'
import RenderHTML from 'react-native-render-html'
import { SwiperFlatList } from 'react-native-swiper-flatlist'

import { useFetchData } from '@/components/hooks/useFetchData'
import { useGetContextData } from '@/components/hooks/useGetContextData'
import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'

import { getShiftedDate } from '@/utils/helpers'

const FrontPage: FC = () => {
	const { width } = Dimensions.get('window')
	const [prevIndex, setPrevIndex] = useState<number | null>(null)
	const {
		date,
		setDate,
		activeIndex,
		setActiveIndex,
		dataListFromCtx,
		setDataListFromCtx
	} = useGetContextData()
	const { isLoading, fetchData } = useFetchData()
	const [isFetching, setIsFetching] = useState(false)

	const [renderTrigger, setRenderTrigger] = useState(false);

	useEffect(() => {
		setRenderTrigger(prev => !prev); // Это триггерит рендеринг
	}, [activeIndex]);


	const handleChange = useCallback(
		async ({ index }: { index: number }) => {
			if (!isFetching && (prevIndex === null || index > prevIndex)) {
				setIsFetching(true)

				const currentActiveDate = dataListFromCtx[index]?.front.date
				const nextDate = getShiftedDate(currentActiveDate, 1)

				if (currentActiveDate) {
					setDate(currentActiveDate)
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
				setPrevIndex(index)
				setIsFetching(false)
			} else {
				console.log('ELSE')
				// setActiveIndex(index);
				// setPrevIndex(index);
			}
		},
		[prevIndex, dataListFromCtx, isFetching]
	)

	// console.log('Front_DATA_LIST_CTX', JSON.stringify(dataListFromCtx, null, 2))
	console.log('F-activeIndex', activeIndex)
	// console.log('date', date)

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
}

export default FrontPage
