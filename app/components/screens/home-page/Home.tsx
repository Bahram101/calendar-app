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
		setCityId,
		setPrayInfo,
		cityId
	} = useGetContextData()
	const { prayTimes, fetchPrayTimes, isLoading } = useFetchPrayTimes(cityId)

	const fetchDatas = async () =>{
		
	}

	useEffect(() => {
		const getInfo = async () => {
			const res = await getPrayInfoFromStorage()
			if (Object.entries(res).length > 0) { 
				setPrayInfo(res)
			}else{
				setCityId(8408)
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

	useEffect(() => {
		const getD = async () => {
			try {
				const res = await getPrayInfoFromStorage()
				setCityId(res.cityId)
				setPrayInfo(res);
				if (res && res.cityId === cityId) {
					setPrayInfo(res);
				} else if (cityId && res.cityId !== cityId) {
					const fetchedPrayTimes = await fetchPrayTimes();
					const processedPrayTimes = processPrayTimes(fetchedPrayTimes);
					if (processedPrayTimes) {
						await savePrayInfoToStorage(processedPrayTimes);
						setPrayInfo(processedPrayTimes);
					}
				}
			} catch (error) {
				console.error('Error in fetch data:', error);
			}
		};

		getD();
	}, [cityId]);
	



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

