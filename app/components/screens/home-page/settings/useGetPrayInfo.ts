import { useQuery } from '@tanstack/react-query'

import { PrayTimesService } from '@/services/pray-times.service' 

export const useGetPrayInfo = (cityId : number | undefined | null) => {
	const { data: cityInfo, isLoading:isLoading } = useQuery({
		queryKey: ['get city info', cityId],
		queryFn: () => PrayTimesService.getPrayInfo(cityId),
		enabled: !!cityId
	})

	return { cityInfo, isLoading }
}
