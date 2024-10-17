import axios from 'axios'

import { SERVER } from '@/config/api.config'
import { SERVER_N } from '@/config/api.config'

export const instance = axios.create({
	baseURL: SERVER,
	headers: {
		'Content-Type': 'application/json'
	}
})

export const instance_n = axios.create({
	baseURL: SERVER_N,
	headers:{
		'Content-Type':'applicatons/json'
	}
}) 
