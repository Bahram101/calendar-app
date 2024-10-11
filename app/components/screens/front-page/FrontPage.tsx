import { FC, useCallback, useMemo, memo, useState } from 'react'
import { SwiperFlatList } from 'react-native-swiper-flatlist'
import { useFetchData } from '@/hooks/useFetchData'
import { useGetContextData } from '@/hooks/useGetContextData'
import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'

import { getShiftedDate } from '@/utils/helpers'
import SwiperItem from './SwiperItem' 

const FrontPage: FC = memo(() => {
	const {
		setActiveSwiperDate,
		activeIndex,
		setActiveIndex,
		dataList,
		setDataList
	} = useGetContextData()

	const { fetchData } = useFetchData()
	const [isFetching, setIsFetching] = useState<boolean>(false)

	const handleChange = useCallback(
		async ({ index, prevIndex }: { index: number, prevIndex: number }) => {
			if (!isFetching && index > prevIndex) {
				setIsFetching(true)

				const currentActiveDate = dataList && dataList[index]?.front.date
				const nextDate = getShiftedDate(currentActiveDate, 1)

				if (currentActiveDate) {
					setActiveSwiperDate(currentActiveDate)
				}

				const nextDateDataExists = dataList?.some(
					item => item?.front?.date === nextDate
				)

				if (!nextDateDataExists) {
					const newData = await fetchData(nextDate)
					if (newData) {
						setDataList(prev => [...prev ?? [], newData]);
					}
				}
				setActiveIndex(index)
				setIsFetching(false)
			} else if (index < prevIndex) {
				const currentActiveDate = dataList && dataList[index]?.front.date
				setActiveSwiperDate(currentActiveDate)
				setActiveIndex(index)
			}
		},
		[dataList, isFetching]
	)

	if (dataList && dataList.length < 3) {
		return <Loader />
	}

	console.log('FFactiveIndex', activeIndex)

	return (
		<Layout className='px-5'>
			<SwiperFlatList
				key={activeIndex}
				index={activeIndex}
				data={dataList}
				onChangeIndex={data => handleChange(data)}
				renderItem={({ item }) => <SwiperItem item={item} />}
			/>
		</Layout>
	)
})

export default FrontPage
