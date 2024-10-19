import { useState } from 'react'

import { Data } from '@/types/fbdata.interface'
import { DataService } from '@/services/data.service'

export const useFetchData = () => {
	const [isLoading, setIsLoading] = useState(false)

	const fetchData = async (date: string | null):Promise<Data | undefined> => {
		setIsLoading(true)
		try {
			const response = await DataService.getData(date) 			
			setIsLoading(false)
			return response as Data
		} catch (error) {
			console.error('Ошибка при получении данных:', error)
			setIsLoading(false)
		}
	}
	
	return {
		isLoading,
		fetchData
	}
}
