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
	// const [dataList, setDataList] = useState([
	// 	{
	// 		id: 4364,
	// 		date: '2024-09-23',
	// 		history:
	// 			'<p>Алматыда Қазақ Мемлекеттік өнер мұражайы ашылды (1935 ж).</p>\n',
	// 		quote: `<p>Кімде-кім үйінен шығарда «Аят-ул курсиді» оқыса, Аллаһу та'ала жетпіс періштеге бұйрық береді, ол адам үйіне қайтқанша оған дұға мен истиғфар оқиды.</p>
	//             <p><strong>Хадис шәриф</strong></p>\n`,
	// 		hijri_date: "20 Рабиул-әууәл 1446",
	// 		year_month: "Қыркүйек / 2024 жыл",
	// 		dayofweek: 'Дүйсенбі',
	// 		day: 23,

	// 	},
	// 	{

	// 		id: 4365,
	// 		date: '2024-09-24',
	// 		history:
	// 			'<p>Алматыда Қазақ Мемлекеттік өнер мұражайы ашылды (1935 ж).</p>\n',
	// 		quote: `<p>Кімде-кім үйінен шығарда «Аят-ул курсиді» оқыса, Аллаһу та'ала жетпіс періштеге бұйрық береді, ол адам үйіне қайтқанша оған дұға мен истиғфар оқиды.</p>
	//        <p><strong>Хадис шәриф</strong></p>\n`,
	// 		hijri_date: "21 Рабиул-әууәл 1446",
	// 		year_month: "Қыркүйек / 2024 жыл",
	// 		dayofweek: 'Сейсенбі',
	// 		day: 24,

	// 	},
	// 	{

	// 		id: 4366,
	// 		date: '2024-09-25',
	// 		history:
	// 			'<p>Алматыда Қазақ Мемлекеттік өнер мұражайы ашылды (1935 ж).</p>\n',
	// 		quote: `<p>Кімде-кім үйінен шығарда «Аят-ул курсиді» оқыса, Аллаһу та'ала жетпіс періштеге бұйрық береді, ол адам үйіне қайтқанша оған дұға мен истиғфар оқиды.</p>
	//        <p><strong>Хадис шәриф</strong></p>\n`,
	// 		hijri_date: "22 Рабиул-әууәл 1446",
	// 		year_month: "Қыркүйек / 2024 жыл",
	// 		dayofweek: 'Сәрсенбі',
	// 		day: 25,

	// 	}
	// ])

	const fetchData = async (date: string) => {
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
		const date = new Date()
		const previousDate = new Date(date.setDate(date.getDate() - 1)).toISOString().split('T')[0].toString()
		const currentDate = date.toISOString().split('T')[0].toString()
		const nextDate = new Date(date.setDate(date.getDate() + 1)).toISOString().split('T')[0].toString()
		const days = [previousDate, currentDate, nextDate]
		fetchData(currentDate)
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


	return <Layout>
		<SwiperFlatList
			onChangeIndex={(data) => handleChange(data)}
			data={dataList}
			index={activeIndex}
			renderItem={({ item }) => {
				return <View className={`items-center pt-8 px-5`} style={[{ width }]}>
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
	</Layout>

}

export default FrontPage
