import { useQuery } from '@tanstack/react-query'

import { ArticleService } from '@/services/article.service'

export const useArticle = () => {
	const { data } = useQuery({
		queryKey: ['get article'],
		queryFn: () => ArticleService.getArticle()
	})
}
