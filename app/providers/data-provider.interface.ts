import { Dispatch, SetStateAction } from 'react'

export type TypeDateState = string | null
export type TypeActiveIndex = number

export interface IContext {
	dateToday: TypeDateState
	setDateToday: Dispatch<SetStateAction<TypeDateState>>
	activeSwiperDate: TypeDateState
	setActiveSwiperDate: Dispatch<SetStateAction<TypeDateState>>
	activeIndex: TypeActiveIndex
	setActiveIndex: Dispatch<SetStateAction<TypeActiveIndex>>
	dataList: any[]
	setDataList: (dataList: any[]) => void
}
