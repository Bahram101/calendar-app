import { FC, useEffect } from 'react'
import { Dimensions, View } from 'react-native' 

import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'

import { useGetContextData } from '@/hooks/useGetContextData'
import Swiper from 'react-native-swiper'
import { useFetchPrayTimes } from '@/components/screens/home-page/pray-times/useFetchPrayTimes'
import PrayTimes from './pray-times/PrayTimes'
import Settings from './settings/Settings'
import { useGetPrayInfo } from './settings/useGetPrayInfo'

const Home: FC = () => {
	const { height } = Dimensions.get('window')
	const { 
		cityId,  
	} = useGetContextData() 
	const { isLoading, namaztimes, fetchNamaztimes } = useFetchPrayTimes(cityId)
	// const {isLoading, cityInfo} = useGetPrayInfo(cityId)
	const swiperHeight = height >= 852 ? height - 130 : height - 75

	useEffect(() => {
		fetchNamaztimes()
	}, [cityId])

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

