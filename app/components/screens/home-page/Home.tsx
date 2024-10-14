import { FC, useEffect } from 'react'
import { Dimensions, View } from 'react-native' 

import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'

import { useGetContextData } from '@/hooks/useGetContextData'
import Swiper from 'react-native-swiper'
import { useFetchPrayTimes } from '@/hooks/useFetchPrayTimes'
import PrayTimes from './pray-times/PrayTimes'
import Settings from './settings/Settings'



const Home: FC = () => {
	const { height } = Dimensions.get('window')
	const {
		activeIndex,
	} = useGetContextData()
	const { isLoading, namaztimes, fetchNamaztimes } = useFetchPrayTimes()
	const swiperHeight = height >= 852 ? height - 130 : height - 75

	useEffect(() => {
		fetchNamaztimes()
	}, [])

	if (isLoading) {
		return <Loader />
	}

	return (
		<Layout>
			<View >
				<Swiper showsButtons={false} loop={false} className='h-full' style={{ height: swiperHeight }}>
					<PrayTimes isLoading={isLoading} namaztimes={namaztimes}/>
					<Settings />
				</Swiper>
			</View>
		</Layout>
	)
}

export default Home

