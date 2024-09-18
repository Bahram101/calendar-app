import { TypeFeatherIconNames } from '@/types/icon.interface'

import { TypeRootStackParamList } from '@/navigation/navigation.types'

export interface IMenuItem {
	icon: TypeFeatherIconNames
	path: keyof TypeRootStackParamList
}

export type TypeNavigate = (screen: keyof TypeRootStackParamList) => void
