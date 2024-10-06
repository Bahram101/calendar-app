import { Dispatch, SetStateAction } from 'react'

export type TypeUserState = string | null
export type TypeActiveIndex = number

export interface IContext {
	date: TypeUserState
	setDate: Dispatch<SetStateAction<TypeUserState>>
	activeIndex: TypeActiveIndex
	setActiveIndex: Dispatch<SetStateAction<TypeActiveIndex>>
	dataListFromCtx: any[]
	setDataListFromCtx: (dataList: any[]) => void
}
