import { FC } from 'react'
import { Text, View, useWindowDimensions } from 'react-native'
import RenderHTML from 'react-native-render-html'
import { SwiperFlatList } from 'react-native-swiper-flatlist'

import Layout from '@/components/layout/Layout'
import { useData } from '@/components/screens/back-page/useData'
import Loader from '@/components/ui/Loader'

interface UseDataResponse {
	data: any
	isLoading?: boolean
}

const FrontPage: FC = () => {
	const { data = null, isLoading = true } = useData(
		'2024-09-20'
	) as UseDataResponse

	const { width } = useWindowDimensions()
	// const { width } = Dimensions.get('window')
	const colors = ['thistle', 'skyblue']
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
			history: '<p>Екінші объект туралы ақпарат</p>\n',
			quote: '<p>Екінші хадис туралы ақпарат.</p>\n',
			hijri_date: '1446-03-21'
		},
		{
			id: 4366,
			date: '2024-09-25',
			history: '<p>Үшінші объект туралы ақпарат</p>\n',
			quote: '<p>Үшінші хадис туралы ақпарат.</p>\n',
			hijri_date: '1446-03-22'
		}
	]

	const htmlContent = data?.back?.[0]?.content || ''

	console.log('isLoading', isLoading)
	console.log('wwwwwwwww', width)

	return isLoading ? (
		<Loader />
	) : (
		<Layout>
			<SwiperFlatList
				// autoplay
				// autoplayDelay={3}
				// autoplayLoop
				// showPagination // Отображение пагинации (точки под слайдами)
				data={slidesData} // Передаем данные в слайдер
				renderItem={({ item }) => (
					<View
						style={[
							{ width, padding: 20 },
							{
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: '#f5f5f5'
							}
						]}
					>
						<Text
							style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}
						>
							{item.date} (Хижри: {item.hijri_date})
						</Text>
						<RenderHTML contentWidth={width} source={{ html: item.history }} />
						<RenderHTML contentWidth={width} source={{ html: item.quote }} />
					</View>
				)}
			/>
		</Layout>
	)
}

export default FrontPage
