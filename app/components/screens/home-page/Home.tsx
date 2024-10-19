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

const Home: FC = () => {
	const { height } = Dimensions.get('window')
	const {
		cityId,
	} = useGetContextData()
	const { isLoading, namaztimes, fetchNamaztimes } = useFetchPrayTimes(cityId)

	const [storedNamaztimes, setStoredNamaztimes] = useState<any>(null)
	const swiperHeight = height >= 852 ? height - 130 : height - 75

	useEffect(() => {
		const loadStoredNamaztimes = async () => {
			try {
				const storedData = await AsyncStorage.getItem(`prayInfo_${cityId}`)
				if (storedData) {
					setStoredNamaztimes(JSON.parse(storedData))
				} else {
					// Если данных нет, получаем их с сервера
					await fetchNamaztimes()
				}
			} catch (error) {
				console.error('Failed to load data from AsyncStorage:', error)
			}
		}

		loadStoredNamaztimes()
	}, [cityId]) // Убираем fetchNamaztimes из зависимостей

	useEffect(() => {
		const saveNamaztimes = async () => {
			try {
				if (namaztimes) {
					await AsyncStorage.setItem(`prayInfo_${cityId}`, JSON.stringify(namaztimes))
					setStoredNamaztimes(namaztimes) // Сохраняем и отображаем последние данные
				}
			} catch (error) {
				console.error('Failed to save data to AsyncStorage:', error)
			}
		}

		if (namaztimes) {
			saveNamaztimes()
		}
	}, [namaztimes, cityId])

	if (isLoading && !storedNamaztimes) {
		return <Loader />
	}

	const displayedNamaztimes = namaztimes || storedNamaztimes

	console.log('storedNamaztimes',storedNamaztimes)

	return (
		<Layout>
			<View >
				<Swiper showsButtons={false} loop={false} style={{ height: swiperHeight }} >
					<PrayTimes namaztimes={displayedNamaztimes} />
					<Settings />
				</Swiper>
			</View>
		</Layout>
	)
}

export default Home

