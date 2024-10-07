import { NavigationProp, useNavigation } from '@react-navigation/native'
import { FC } from 'react'
import { Dimensions, FlatList, Pressable, Text, View } from 'react-native'
import { useWindowDimensions } from 'react-native'
import RenderHTML from 'react-native-render-html'
import { SwiperFlatList } from 'react-native-swiper-flatlist'

import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'

import { TypeRootStackParamList } from '@/navigation/navigation.types'

const Home: FC = () => {
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

	return  (
		<Layout>
			<SwiperFlatList
				showPagination 
        paginationActiveColor="#2b6e7e"
        paginationDefaultColor='#b5e4ef'
        paginationStyleItem={{ width: 7, height: 7 }}
				data={slidesData} 
				renderItem={({ item }) => (
					<View
						className={`justify-center items-center p-10`}
						style={[{ width }]}
					>
						<Text className='text-bold mb-5 text-lg'>
							{item.date} (Хижри: {item.hijri_date})
						</Text>
						{/* <RenderHTML contentWidth={width} source={{ html: item.history }} />
						<RenderHTML contentWidth={width} source={{ html: item.quote }} /> */}
					</View>
				)}
			/>
		</Layout>
	)
}

export default Home
