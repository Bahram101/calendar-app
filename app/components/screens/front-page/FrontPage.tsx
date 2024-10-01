import React, { FC, useCallback, useEffect, useState } from 'react'
import { Dimensions, Text, View } from 'react-native'
import RenderHTML from 'react-native-render-html'
import { SwiperFlatList } from 'react-native-swiper-flatlist'

import { useGetActiveSwiperDate } from '@/components/hooks/useGetActiveSwiperDate'
import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'

import { getAdjacentDates, getNextDate, getShiftedDate } from '@/utils/helpers'
import { useFetchData } from '@/components/hooks/useFetchData'

const FrontPage: FC = () => {
	const { width } = Dimensions.get('window')
	const [activeIndex, setActiveIndex] = useState(1)
	const [prevIndex, setPrevIndex] = useState<number | null>(null);
	const [isFirstSwipe, setIsFirstSwipe] = useState(true); // Для первого свайпа
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
			// Логика для первого свайпа
			if (prevIndex === null) {
				// Сравниваем с начальным индексом
				if (index > activeIndex) {
					console.log('First swipe right'); 
					const currentActiveDate = dataList[index].front.date;
					const nextDate = getShiftedDate(currentActiveDate, 1);
					console.log('nextDate1',nextDate)
					setDate(dataList[index].front.date);
					fetchData(nextDate);
				} else if (index < activeIndex) {
					console.log('First swipe left'); // Первый свайп влево					
					const currentActiveDate = dataList[index].front.date;
					const previousDate = getShiftedDate(currentActiveDate, -1);
					console.log('index', index); 
					console.log('activeIndex', activeIndex);
					console.log('currentActiveDate', currentActiveDate)
					console.log('prevDate1', previousDate)
					console.log('currentActiveDate', currentActiveDate)
					setDate(currentActiveDate);
					fetchData(previousDate, 'left');	
				}
				setPrevIndex(index); 
			} else {
				if (index > prevIndex) {
					console.log('Swiped right');
					if (index === dataList.length - 1 && !isLoading) {
						const currentActiveDate = dataList[index].front.date;
						const nextDate = getShiftedDate(currentActiveDate, 1);
						setDate(currentActiveDate);
						fetchData(nextDate);
					}
				} else if (index < prevIndex) {
					console.log('Swiped left');
					if (!isLoading) {
						const previousDate = getShiftedDate(dataList[index].front.date, -1);
						console.log('prevDate2', previousDate)
						setDate(dataList[index].front.date);
						fetchData(previousDate, 'left');
					} else {
						console.log('ELSE')
					}
				}
				setPrevIndex(index); // Обновляем предыдущий индекс
			}
		},
		[isFirstSwipe, prevIndex, isLoading]
	);

	// console.log('DATA_LIST', JSON.stringify(dataList, null, 2))
	console.log('date2',date)



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
