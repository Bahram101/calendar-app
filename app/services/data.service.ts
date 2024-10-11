import { request } from './api/request.api'

export const DataService = {
	async getData(date: string | null) {
		return request({
			url: `/json/datas?date=${date}`,
			method: 'GET',
		})
	}
}
