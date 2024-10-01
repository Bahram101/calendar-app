import { useQuery } from '@tanstack/react-query'

import { DataService } from '@/services/data.service'

export const useGetData = (date: string) => {
	const { data, isLoading } = useQuery({
		queryKey: ['get data'],
		queryFn: () => DataService.getData(date),
		select: (data:any) => {
			return data.back
		}
	})

	return { data, isLoading }
}