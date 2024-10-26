import { FC, useEffect } from 'react'
import { Dimensions, View } from 'react-native'

import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'

import { useGetContextData } from '@/hooks/useGetContextData'
import Swiper from 'react-native-swiper'
import { useFetchPrayTimes } from '@/components/screens/home-page/pray-times/useFetchPrayTimes'
import PrayTimes from './pray-times/PrayTimes'
import Settings from './settings/Settings'
import { getPrayInfoFromStorage, processPrayTimes, savePrayInfoToStorage } from '@/utils/helpers'

const Home: FC = () => {
	const { height } = Dimensions.get('window')
	const swiperHeight = height >= 852 ? height - 145 : height - 90
	const {
		setCityId,
		setPrayInfo,
		cityId
	} = useGetContextData()
	const { fetchPrayTimes, isLoading } = useFetchPrayTimes(cityId)

	const fetchAndProcessPrayTimes = async () => {
		const fetchedPrayTimes = await fetchPrayTimes()
		const processedPrayTimes = processPrayTimes(fetchedPrayTimes)
		if (processedPrayTimes) {
			await savePrayInfoToStorage(processedPrayTimes)
			setPrayInfo(processedPrayTimes)
		}
	}

	useEffect(() => {
		const loadPrayInfoFromStorage = async () => {
			const storedPrayInfo = await getPrayInfoFromStorage()
			if (Object.entries(storedPrayInfo).length > 0) {
				setPrayInfo(storedPrayInfo)
			} else {
				setCityId(8408)
				await fetchAndProcessPrayTimes()
			}
		}
		loadPrayInfoFromStorage()
	}, [])

	useEffect(() => {
		const fetchAndUpdatePrayTimes = async () => {
			try {
				const storedPrayInfo = await getPrayInfoFromStorage();	
				if (storedPrayInfo && storedPrayInfo.cityId === cityId) {
					setPrayInfo(storedPrayInfo);
				} else if (cityId && (!storedPrayInfo || storedPrayInfo.cityId !== cityId)) {
					setCityId(storedPrayInfo.cityId);
					await fetchAndProcessPrayTimes();
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchAndUpdatePrayTimes();
	}, [cityId]);

	if (isLoading) {
		return <Loader />
	}

	return (
		<Layout>
			<View >
				<Swiper
					showsButtons={false}
					loop={false}
					style={{ height: swiperHeight }}
					dot={
						<View style={{ backgroundColor: '#0004', width: 8, height: 8, borderRadius: 4, margin: 4 }} />
					}
					activeDot={<View style={{ backgroundColor: '#54a4b7', width: 8, height: 8, borderRadius: 5, margin: 4 }} />}
				>
					<PrayTimes />
					<Settings />
				</Swiper>
			</View>
		</Layout>
	)
}

export default Home

