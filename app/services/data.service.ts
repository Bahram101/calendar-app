import { instance, instance_n } from './api/interceptors.api'
import { request } from './api/request.api'

export const DataService = {
	async getData(date: string | null, serverType: boolean = false) {
		const apiInstance = serverType ? instance_n  : instance
		return request(apiInstance,{
			url: `/json/datas?date=${date}`,
			method: 'GET',
		})
	}
}
