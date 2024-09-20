import { request } from './api/request.api'

export const ArticleService = {
	async getArticle(date: string) {
		return request({
			url: `/datas?date=${date}`,
			method: 'GET'
		})
	}
}
