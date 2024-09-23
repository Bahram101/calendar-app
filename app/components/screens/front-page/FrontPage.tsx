import React, { FC, useEffect, useMemo, useState } from 'react'
import { Dimensions, Text, View, useWindowDimensions } from 'react-native'
import RenderHTML from 'react-native-render-html'
import { SwiperFlatList } from 'react-native-swiper-flatlist'

import Layout from '@/components/layout/Layout'
import { useData } from '@/components/screens/back-page/useData'
import Loader from '@/components/ui/Loader'

import { convertToHijriMonth, convertToMiladiMonth } from '@/utils/helpers'
import axios from 'axios'

interface UseDataResponse {
	data: any
	isLoading?: boolean
}

const FrontPage: FC = () => {
	const { width } = Dimensions.get('window')
	// const { width } = useWindowDimensions()
	const [currentData, setCurrentData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [dataList, setDataList] = useState([
		{
			id: 4364,
			date: '2024-09-23',
			history:
				'<p>Алматыда Қазақ Мемлекеттік өнер мұражайы ашылды (1935 ж).</p>\n',
			quote: `<p>Кімде-кім үйінен шығарда «Аят-ул курсиді» оқыса, Аллаһу та'ала жетпіс періштеге бұйрық береді, ол адам үйіне қайтқанша оған дұға мен истиғфар оқиды.</p>
              <p><strong>Хадис шәриф</strong></p>\n`,
			hijri_date: "20 Рабиул-әууәл 1446",
			year_month: "Қыркүйек / 2024 жыл",
			dayofweek: 'Дүйсенбі',
			day: 23,
		},
		{
			id: 4365,
			date: '2024-09-24',
			history:
				'<p>Алматыда Қазақ Мемлекеттік өнер мұражайы ашылды (1935 ж).</p>\n',
			quote: `<p>Кімде-кім үйінен шығарда «Аят-ул курсиді» оқыса, Аллаһу та'ала жетпіс періштеге бұйрық береді, ол адам үйіне қайтқанша оған дұға мен истиғфар оқиды.</p>
         <p><strong>Хадис шәриф</strong></p>\n`,
			hijri_date: "21 Рабиул-әууәл 1446",
			year_month: "Қыркүйек / 2024 жыл",
			dayofweek: 'Сейсенбі',
			day: 24,
		},
		{
			id: 4366,
			date: '2024-09-25',
			history:
				'<p>Алматыда Қазақ Мемлекеттік өнер мұражайы ашылды (1935 ж).</p>\n',
			quote: `<p>Кімде-кім үйінен шығарда «Аят-ул курсиді» оқыса, Аллаһу та'ала жетпіс періштеге бұйрық береді, ол адам үйіне қайтқанша оған дұға мен истиғфар оқиды.</p>
         <p><strong>Хадис шәриф</strong></p>\n`,
			hijri_date: "22 Рабиул-әууәл 1446",
			year_month: "Қыркүйек / 2024 жыл",
			dayofweek: 'Сәрсенбі',
			day: 25,
		}
	])

	// useEffect(() => {

	// }, [])


	const fetchData = async (date: string) => {
		try {
			setIsLoading(true);
			const response = await axios.get(`https://kuntizbe.kz/json/datas?date=${date}`);
			setCurrentData(response.data);
		} catch (error) {
			console.error('Error fetching data', error);
		} finally {
			setIsLoading(false);
		}
	};



	const handleChange = ({ index }: { index: number }) => {
		const currentSlide = dataList[index]
		console.log('INDEX', index)
		console.log('currentSlide',currentSlide)

		// // console.log('CURRENT_SLIDE', currentSlide)
		// if (currentSlide && currentSlide.date) {
		// 	fetchData(currentSlide.date);
		// }
	}

	// console.log('currentData', currentData)

	return <Layout>
		<SwiperFlatList
			onChangeIndex={(data)=>handleChange(data)}
			data={dataList}
			renderItem={({ item }) => (
				<View className={`items-center pt-8 px-5`} style={[{ width }]}>
					<Text className='text-xl font-bold uppercase selft-start'>
						{item.hijri_date}
					</Text>

					<Text className='font-bold mb-3 text-[180px] text-primary'>
						{item.day}
					</Text>

					<Text className='text-2xl font-bold uppercase mb-5'>
						{item.year_month}
					</Text>

					<RenderHTML contentWidth={width} source={{ html: item.history }} />

					<RenderHTML
						contentWidth={width}
						source={{ html: item.quote }}
					// tagsStyles={{ p: { textAlign: 'center' } }}
					/>
				</View>
			)}
		/>
	</Layout>

}

export default FrontPage
