interface TypeСityItem {
  id: number,
  text: string
}

interface TypeStateItem {
  text: string
  children: TypeСityItem[]
}

export interface TypeСityListResponse {
  results: TypeStateItem[]
}

 

