interface Front {
	id: number
	date: string
	history: string
	quote: string
	hijri_date: string
	day: string
	year_month: string
  dayofweek: string
}

interface BackItem {
	id: string
	title: string
	category: string
	content: string
}

export interface Data {
	front: Front
	back: BackItem[]
}
