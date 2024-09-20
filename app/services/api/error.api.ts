import { AxiosError } from 'axios'

export const errorCatch = (error: AxiosError | any): string => {
	const message = error?.response?.data?.message

	if (message) {
		if (Array.isArray(message)) {
			return message.length > 0 ? message[0] : 'Unknown error'
		} else {
			return message
		}
	}

	return error.message || 'Unknown error'
}