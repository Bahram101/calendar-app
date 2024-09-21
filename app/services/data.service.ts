import { request } from './api/request.api'

export const DataService = {
	async getData(date: string) {
		return request({
			url: `/datas?date=${date}`,
			method: 'GET'
		})
	}
}
