import { FC, useCallback, useEffect, useState } from 'react'
import { Dimensions, Text, View } from 'react-native'
import SwiperFlatList from 'react-native-swiper-flatlist'

import { useFetchData } from '@/components/hooks/useFetchData'
import { useGetContextData } from '@/components/hooks/useGetContextData'
import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'

import { getShiftedDate } from '@/utils/helpers'
import HTMLView from 'react-native-htmlview'

const BackPage: FC = () => {
	const { width } = Dimensions.get('window')
	const [prevIndex, setPrevIndex] = useState<number | null>(null)
	const {
		activeSwiperDate,
		setActiveSwiperDate,
		activeIndex,
		setActiveIndex,
		dataListFromCtx,
		setDataListFromCtx,
	} = useGetContextData()
	const { isLoading, fetchData } = useFetchData()
	const [isFetching, setIsFetching] = useState(false)

	const handleChange = useCallback(
		async ({ index, prevIndex }: { index: number, prevIndex: number }) => {
			if (!isFetching && (prevIndex === null || index > prevIndex)) {
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
						setDataListFromCtx(prev => [...prev, newData])
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

	return isLoading && dataListFromCtx.length < 3 ? (
		<Loader />
	) : (
		<Layout className='px-5'>
			<SwiperFlatList
				onChangeIndex={data => handleChange(data)}
				data={dataListFromCtx}
				index={activeIndex}
				renderItem={({ item }) => {
					const month = item.front.year_month.split(' / ')[0]
					const year = item.front.year_month.split(' / ')[1]
					return (
						<View
							key={item.front.id}
							className={`items-center pt-4 px-5`}
							style={[{ width }]}
						>
							<View className='border-b border-gray-400 mb-2'>
								<Text className='uppercase font-bold text-gray-500 text-xs mb-1'>
									<Text>{`${item.front.day}-${month} ${year}`}</Text>
									<Text> | </Text>
									<Text>{`${item.front.hijri_date}`}</Text>
								</Text>
							</View>
							{item.back.map((backItem: any) => {
								return (
									<View key={backItem.id} className='mb-5'>
										<Text className='font-bold uppercase text-center mb-1'>
											{backItem.category}
										</Text>
										<Text className='font-bold mb-3 uppercase text-primary text-center text-lg'>
											{backItem?.title}
										</Text>
										<View style={{}} className='text-justify'>
											<HTMLView
												value={backItem?.content?.replace(/\n/g, '')}
												stylesheet={{
													p: {
														textAlign: 'justify',
														marginBottom: -15,
														lineHeight: 18
													},
												}}
											/>
										</View>
									</View>
								)
							})}
						</View>
					)
				}}
			/>
		</Layout>
	)
}

export default BackPage
