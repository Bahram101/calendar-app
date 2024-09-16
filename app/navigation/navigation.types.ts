import { ComponentType } from 'react'

export type TypeRootStackParamList = {
	Home: undefined
	Front: undefined
	Back: undefined
}

export interface IRoute {
	name: keyof TypeRootStackParamList
	component: ComponentType
}