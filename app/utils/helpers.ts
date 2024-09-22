const hijriMonths = [
	'Мухаррам',
	'Сафар',
	'Раби аль-авваль',
	'Раби ас-сани',
	'Джумада аль-уля',
	'Джумада ас-сани',
	'Раджаб',
	'Шаабан',
	'Рамадан',
	'Шавваль',
	'Зуль-Каада',
	'Зуль-Хиджжа'
]

export const convertToHijriMonth = (hijriDate: string) => {
	const [year, month, date] = hijriDate.split('-')
	const monthName = hijriMonths[parseInt(month, 10) - 1]
	const formattedDate = `${date} ${monthName} ${year}`
	return formattedDate
}
const miladiMonths = [
	'Январь',
	'Февраль',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь'
]

export const convertToMiladiMonth = (month: string) => {
	const monthName = miladiMonths[parseInt(month, 10) - 1]
	return monthName;
}
