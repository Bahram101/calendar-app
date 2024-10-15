const hijriMonths = [
	'Мухаррам',
	'Сафар',
	'Рабиул-әууал',
	'Рабиул-ахир ',
	'Жәмәзил-әууәл',
	'Жәмәзис-сани',
	'Ражап',
	'Шабан',
	'Рамазан',
	'Шәууәл',
	'Зул-қада',
	'Зуль-хижжа'
]

const miladiMonths = [
	'Қаңтар',
	'Ақпан',
	'Наурыз',
	'Сәуір',
	'Мамыр',
	'Маусым',
	'Шілде',
	'Тамыз',
	'Қыркүйек',
	'Қазан',
	'Қараша',
	'Желтоқсан'
]

export const extraPrayTimes = [
	'ishraq',
	'kerahat',
	'asriauual',
	'isfirar',
	'ishtibaq',
	'ishaisani'
]

export const prayNames = {
	imsak: 'Имсак',
	bamdat: 'Бамдат',
	kun: 'Күн',
	ishraq: 'Ишрақ',
	kerahat: 'Керахат',
	besin: 'Бесін',
	asriauual: 'Асри-әууәл',
	ekindi: 'Екінді',
	isfirar: 'Исфирар',
	aqsham: 'Ақшам',
	ishtibaq: 'Иштибак',
	quptan: 'Құптан',
	ishaisani: 'Ишаи-сәни'
}

export const convertToMonth = (date: string, type: string) => {
	const [year, month, day] = date.split('-')
	const selectedMonth = parseInt(month, 10) - 1

	const monthName =
		type === 'hijri' ? hijriMonths[selectedMonth] : miladiMonths[selectedMonth]
	return `${day} ${monthName} ${year}`
}

export const getAdjacentDates = (currentDate: string | null) => {
	if (!currentDate) {
		throw new Error('Invalid date')
	}
	const date = new Date(currentDate)

	const prevDate = new Date(date)
	prevDate.setDate(prevDate.getDate() - 1)

	const nextDate = new Date(date)
	nextDate.setDate(nextDate.getDate() + 1)

	return [
		prevDate?.toISOString()?.split('T')[0].toString(),
		currentDate,
		nextDate?.toISOString()?.split('T')[0].toString()
	]
}

export const getShiftedDate = (
	date: string | undefined,
	day: number
): string => {
	if (!date) {
		throw new Error('Date cannot be undefined')
	}
	const currentDate = new Date(date)
	currentDate.setDate(currentDate.getDate() + day)
	return currentDate.toISOString().split('T')[0].toString()
}
