import { useQuery } from '@tanstack/react-query'

import { PrayTimesService } from '@/services/pray-times.service'

import { useSearchForm } from './useSearchForm' 

export const useSearch = () => {
	const { debouncedSearch, searchTerm, control } = useSearchForm()

	const { data: cityList, isLoading } = useQuery({
		queryKey: ['search city', debouncedSearch],
    queryFn: async () => {
      if (debouncedSearch.length >= 3) {
        return await PrayTimesService.getCityList(debouncedSearch)
      }
      return { results: [] }; 
    },
		enabled: !!debouncedSearch
	})

	return { cityList, isLoading, control, searchTerm }
}
