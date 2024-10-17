import { instance, instance_n } from './api/interceptors.api'
import { request } from './api/request.api'
import { TypeCityId } from '@/providers/data-provider.interface'

export const PrayTimesService = {
	async getCityList(cityName: string | null, serverType: boolean = false) {
		const apiInstance = serverType ? instance_n : instance
		return request(apiInstance, {
			url: `/json/search?q=${cityName}`,
			method: 'GET'
		})
	},

	async getPrayInfo(
		cityId: TypeCityId,
		serverType: boolean = false
	) {
		const apiInstance = serverType ? instance_n : instance
		return request(apiInstance, {
			url: `/api/praytimes?id=${cityId}`,
			method: 'GET'
		})
	}
}
