import { useQuery } from '@tanstack/react-query'

import { PrayTimesService } from '@/services/pray-times.service'

import { useSearchForm } from './useSearchForm'

export const useSearch = () => {
	const { searchTerm, debouncedSearch, control } = useSearchForm()

	const { data: city, isLoading } = useQuery({
		queryKey: ['search city', debouncedSearch],
		queryFn: () => PrayTimesService.getPrayInfo(debouncedSearch),
		enabled: !!debouncedSearch
	})

	return { city, isLoading, control, searchTerm }
}
