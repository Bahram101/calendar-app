import { FC, useCallback, useEffect, useState } from 'react'
import { Dimensions, Text, View } from 'react-native'
import SwiperFlatList from 'react-native-swiper-flatlist'

import { useFetchData } from '@/components/hooks/useFetchData'
import { useGetContextData } from '@/components/hooks/useGetContextData'
import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'

import { getShiftedDate } from '@/utils/helpers'

const BackPage: FC = () => {
	const { width } = Dimensions.get('window')
	const [prevIndex, setPrevIndex] = useState<number | null>(null)
	const {
		date,
		setDate,
		dataListFromCtx,
		setDataListFromCtx,
		activeIndex,
		setActiveIndex,
	} = useGetContextData()
	const { isLoading, fetchData } = useFetchData()
	const [isFetching, setIsFetching] = useState(false) 

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
						setDataListFromCtx(prev => [...prev, newData])
					}
				}
				setActiveIndex(index)
				setPrevIndex(index)
				setIsFetching(false)
			} else {
				console.log('ELSE')
        setActiveIndex(index); // Обновляем только activeIndex
        setPrevIndex(index); // Обновляем prevIndex
      }
		},
		[prevIndex, dataListFromCtx, isFetching]
	)

	// console.log('Back_DATA_LIST_CTX', JSON.stringify(dataListFromCtx, null, 2))
	console.log('B-activeIndex', activeIndex)

	return isLoading && dataListFromCtx.length < 3 ? (
		<Loader />
	) : (
		<Layout className='px-5'>
			<SwiperFlatList
				onChangeIndex={data => handleChange(data)}
				data={dataListFromCtx}
				index={ activeIndex }
				renderItem={({ item }) => {
					return (
						<View
							key={item.front.id}
							className={`items-center pt-8 px-5 bg-blue-50`}
							style={[{ width }]}
						>
							{item.back.map((backItem: any) => (
								<View key={backItem.id} className='mb-5'>
									<Text>{date}</Text>
									<Text className='font-bold uppercase  text-center'>
										{backItem.category}
									</Text>
									<Text className='font-bold mb-3 uppercase text-primary text-center'>
										{backItem?.title}
									</Text>
									<Text>{backItem?.content}</Text>
								</View>
							))}
						</View>
					)
				}}
			/>
		</Layout>
	)
}

export default BackPage
