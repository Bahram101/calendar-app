import { FC, useEffect, useState } from 'react'
import { Dimensions, View } from 'react-native'

import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'

import { useGetContextData } from '@/hooks/useGetContextData'
import Swiper from 'react-native-swiper'
import { useFetchPrayTimes } from '@/components/screens/home-page/pray-times/useFetchPrayTimes'
import PrayTimes from './pray-times/PrayTimes'
import Settings from './settings/Settings'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { extraPrayTimes, getPrayInfoFromStorage, processPrayTimes, removePrayInfoFromStorage, savePrayInfoToStorage } from '@/utils/helpers'

const Home: FC = () => {
	const { height } = Dimensions.get('window')
	const swiperHeight = height >= 852 ? height - 130 : height - 75
	const {
		prayInfo,
		setPrayInfo,
		cityId
	} = useGetContextData()
	const { prayTimes, fetchPrayTimes, isLoading } = useFetchPrayTimes(cityId)

	useEffect(() => {
		const getInfo = async () => {
			const res = await getPrayInfoFromStorage()
			if (res) {
				setPrayInfo(res)
			}else{
				const fetchedPrayTimes = await fetchPrayTimes();          
				const processedPrayTimes = processPrayTimes(fetchedPrayTimes);
				if (processedPrayTimes) { 
					await savePrayInfoToStorage(processedPrayTimes); 
					setPrayInfo(processedPrayTimes);
				}
			}
		}
		getInfo()
	}, [])

	if (isLoading) {
		return <Loader />
	}

	return (
		<Layout>
			<View >
				<Swiper showsButtons={false} loop={false} style={{ height: swiperHeight }} >
					<PrayTimes />
					<Settings />
				</Swiper>
			</View>
		</Layout>
	)
}

export default Home

