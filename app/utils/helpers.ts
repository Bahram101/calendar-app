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
	return monthName
}

export const getNextDate = (date: string, ): string => {
	const currentDate = new Date(date)
	currentDate.setDate(currentDate.getDate() + 1)
	return currentDate.toISOString().split('T')[0].toString()
}

export const getAdjacentDates = (currentDate: string | null) => {
	if (!currentDate) {
    throw new Error("Invalid date");
  }
	const date = new Date(currentDate)

	const prevDate = new Date(date)
	prevDate.setDate(prevDate.getDate() - 1)

	const nextDate = new Date(date)
	nextDate.setDate(nextDate.getDate() + 1)

	return [
		prevDate?.toISOString()?.split('T')[0],
		currentDate,
		nextDate?.toISOString()?.split('T')[0]
	]
}

export const getShiftedDate = (date: string, days: number): string => {
	const currentDate = new Date(date);
	currentDate.setDate(currentDate.getDate() + days); // Сдвигаем на количество дней
	return currentDate.toISOString().split('T')[0].toString();
};