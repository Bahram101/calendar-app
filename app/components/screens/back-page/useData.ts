import { useQuery } from '@tanstack/react-query'

import { DataService } from '@/services/data.service'

export const useData = (date: string) => {
	const { data, isLoading } = useQuery({
		queryKey: ['get data'],
		queryFn: () => DataService.getData(date),
		select: data => data
	})

	return { data, isLoading }
}
