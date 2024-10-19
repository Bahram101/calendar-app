import { useQuery } from '@tanstack/react-query'

import { PrayTimesService } from '@/services/pray-times.service' 
import { TypeCityId } from '@/providers/data-provider.interface'

export const useGetPrayInfo = (cityId : TypeCityId) => {
	const { data: cityInfo, isLoading:isLoading } = useQuery({
		queryKey: ['get city info', cityId],
		queryFn: () => PrayTimesService.getPrayInfo(cityId),
		enabled: !!cityId
	})

	return { cityInfo, isLoading }
}
