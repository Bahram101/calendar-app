import { Dispatch, SetStateAction } from 'react' 

export type TypeUserState = string | null

export interface IContext {
	date: TypeUserState
	setDate: Dispatch<SetStateAction<TypeUserState>>
	dataListFromCtx: any[]; 
  setDataListFromCtx: (dataList: any[]) => void;
}
