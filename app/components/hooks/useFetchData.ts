import { useState } from 'react'

export const useFetchData = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [dataList, setDataList] = useState<any[]>([])

	const fetchData = async (date: string | null) => {
		setIsLoading(true)
		try {
			const response = await fetch(
				`https://kuntizbe.kz/json/datas?date=${date}`
			)
      
			const res = await response.json()
			setDataList(prev => [...prev, res.back])
			setIsLoading(false)
		} catch (error) {
			console.error('Ошибка при получении данных:', error)
			setIsLoading(false)
		}
	}

	return {
		dataList,
		isLoading,
		fetchData
	}
}
