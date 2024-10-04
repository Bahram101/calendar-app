import { useState } from 'react'

import { request } from '@/services/api/request.api'

export const useFetchData = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [dataList, setDataList] = useState<any[]>([])

	const fetchData = async (date: string | null, direction = 'right') => {
		setIsLoading(true)
		try {
			const response = await request({
				url: `/datas?date=${date}`,
				method: 'GET'
			})
			setDataList(prev => [...prev, response])
			setIsLoading(false)
			// return response
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
