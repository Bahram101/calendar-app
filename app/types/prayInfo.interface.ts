export interface TypePrayName {
	key: string
	val: string
	isActive: boolean
}

export interface TypePrayInfo {
	slm_date: string
	date: string
	cityName: string
  cityId: string
	prayTimes: TypePrayName[]
}
 