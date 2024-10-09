import { useState } from 'react'

import { request } from '@/services/api/request.api'
import { Data } from '@/types/fbdata.interface'

export const useFetchData = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [dataList, setDataList] = useState<Data[]>([])

	const fetchData = async (date: string | null):Promise<Data | undefined> => {
		setIsLoading(true)
		try {
			const response = await request({
				url: `/datas?date=${date}`,
				method: 'GET'
			}) 
			
			setIsLoading(false)
			return response as Data
		} catch (error) {
			console.error('Ошибка при получении данных:', error)
			setIsLoading(false)
		}
	}

	return {
		dataList,
		setDataList,
		isLoading,
		fetchData
	}
}
