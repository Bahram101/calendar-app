// export const errorCatch = (error: any): string => {
// 	const message = error?.response?.data?.message

// 	return message
// 		? typeof error.response.data.message === 'object'
// 			? message[0]
// 			: message
// 		: error.message
// }

import { AxiosError } from 'axios'

export const errorCatch = (error: AxiosError | any): string => {
	const message = error?.response?.data?.message

	if (message) {
		// Проверка, является ли message массивом
		if (Array.isArray(message)) {
			return message.length > 0 ? message[0] : 'Unknown error'
		} else {
			return message
		}
	}

	return error.message || 'Unknown error'
}