import { useQuery } from '@tanstack/react-query'

import { PrayTimesService } from '@/services/pray-times.service'
import { FC } from 'react'

interface IProps{
  cityId: number | undefined
}

export const useGetPrayInfo: FC<IProps> = ({ cityId }) => {

  console.log('useGetPrayInfo')
  
	const { data: cityInfo, isLoading:isLoading2 } = useQuery({
		queryKey: ['get city info', cityId],
		queryFn: () => PrayTimesService.getPrayInfo(cityId),
		enabled: !!cityId
	})

  console.log('cityInfo',cityInfo)

	return { cityInfo, isLoading2 }
}
