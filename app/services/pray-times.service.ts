import axios from 'axios'
import { request } from './api/request.api'

export const PrayTimesService = {
	async getCityList(cityName: string | null) {
		return request({
			url: `/json/search?q=${cityName}`,
			method: 'GET',
		})
	},

	async getPrayInfo(cityId: number | null) { 
		return request({
			url: `/json/times?city_id=${cityId}`,
			method: 'GET',
		})
	}
}
