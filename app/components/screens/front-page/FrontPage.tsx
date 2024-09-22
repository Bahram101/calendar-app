import React, { FC, useMemo } from 'react'
import { Dimensions, Text, View, useWindowDimensions } from 'react-native'
import RenderHTML from 'react-native-render-html'
import { SwiperFlatList } from 'react-native-swiper-flatlist'

import Layout from '@/components/layout/Layout'
import { useData } from '@/components/screens/back-page/useData'
import Loader from '@/components/ui/Loader'

import { convertToHijriMonth, convertToMiladiMonth } from '@/utils/helpers'

interface UseDataResponse {
	data: any
	isLoading?: boolean
}

const FrontPage: FC = React.memo(() => {
	const { data = null, isLoading = true } = useData(
		'2024-09-20'
	) as UseDataResponse

	// const { width } = useWindowDimensions()
	const { width } = Dimensions.get('window')

	const slidesData = [
		{
			id: 4364,
			date: '2024-09-23',
			history:
				'<p>Алматыда Қазақ Мемлекеттік өнер мұражайы ашылды (1935 ж).</p>\n',
			quote: `<p>Кімде-кім үйінен шығарда «Аят-ул курсиді» оқыса, Аллаһу та'ала жетпіс періштеге бұйрық береді, ол адам үйіне қайтқанша оған дұға мен истиғфар оқиды.</p>
              <p><strong>Хадис шәриф</strong></p>\n`,
			hijri_date: '1446-03-20'
		},
		{
			id: 4365,
			date: '2024-09-24',
			history:
				'<p>Алматыда Қазақ Мемлекеттік өнер мұражайы ашылды (1935 ж).</p>\n',
			quote: `<p>Кімде-кім үйінен шығарда «Аят-ул курсиді» оқыса, Аллаһу та'ала жетпіс періштеге бұйрық береді, ол адам үйіне қайтқанша оған дұға мен истиғфар оқиды.</p>
         <p><strong>Хадис шәриф</strong></p>\n`,
			hijri_date: '1446-03-21'
		},
		{
			id: 4366,
			date: '2024-09-25',
			history:
				'<p>Алматыда Қазақ Мемлекеттік өнер мұражайы ашылды (1935 ж).</p>\n',
			quote: `<p>Кімде-кім үйінен шығарда «Аят-ул курсиді» оқыса, Аллаһу та'ала жетпіс періштеге бұйрық береді, ол адам үйіне қайтқанша оған дұға мен истиғфар оқиды.</p>
         <p><strong>Хадис шәриф</strong></p>\n`,
			hijri_date: '1446-03-22'
		}
	]
	// const htmlContent = data?.front || ''

	// console.log('htmlContent', htmlContent)

	return isLoading ? (
		<Loader />
	) : (
		<Layout>
			<SwiperFlatList
				data={slidesData}
				renderItem={({ item }) => (
					<View className={`items-center pt-8 px-5`} style={[{ width }]}>
						<Text className='text-xl font-bold uppercase selft-start'>
							{convertToHijriMonth(item.hijri_date)}
						</Text>

						<Text className='font-bold mb-3 text-[180px] text-primary'>
							{item.date.split('-')[2]}
						</Text>

						<Text className='text-2xl font-bold uppercase mb-5'>
							{convertToMiladiMonth(item.date.split('-')[1])} /{' '}
							{item.date.split('-')[0]}
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
	)
})

export default FrontPage
