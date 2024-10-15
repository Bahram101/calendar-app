import { Data } from '@/types/fbdata.interface'
import { Dispatch, SetStateAction } from 'react'

export type TypeDateState = string | null | undefined
export type TypeActiveIndex = number

export interface IContext {
	dateToday: TypeDateState
	setDateToday: Dispatch<SetStateAction<TypeDateState>>
	activeSwiperDate: TypeDateState
	setActiveSwiperDate: Dispatch<SetStateAction<TypeDateState>>
	activeIndex: TypeActiveIndex
	setActiveIndex: Dispatch<SetStateAction<TypeActiveIndex>>
	dataList: Data[] | undefined
	setDataList: Dispatch<SetStateAction<Data[] | undefined>>
	prayInfo: any
	setPrayInfo: any,

}
