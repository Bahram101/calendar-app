import { FC } from 'react'
import SwiperFlatList from 'react-native-swiper-flatlist'

import { useGetContextData } from '@/hooks/useGetContextData'
import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'
import SwiperItem from './SwiperItem'
import { useSwipeChange } from '@/hooks/useSwipeChange'

const BackPage: FC = () => {
	const { activeIndex, dataList } = useGetContextData();
	const { handleChange } = useSwipeChange()

	if (dataList && dataList.length < 3) {
		return <Loader />
	}

	return (
		<Layout className='px-5'>
			<SwiperFlatList
				index={activeIndex}
				data={dataList}
				onChangeIndex={data => handleChange(data)}
				renderItem={({ item }) => <SwiperItem item={item} />}
			/>
		</Layout>
	)
}

export default BackPage
