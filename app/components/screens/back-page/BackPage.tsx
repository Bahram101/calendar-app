import { FC, useCallback, useEffect, useState } from 'react'
import { Dimensions, Text, View } from 'react-native'
import SwiperFlatList from 'react-native-swiper-flatlist'
import { jsx } from 'react/jsx-runtime'

import { useGetActiveSwiperDate } from '@/components/hooks/useGetActiveSwiperDate'
import Layout from '@/components/layout/Layout'
import Loader from '@/components/ui/Loader'

import { getAdjacentDates, getNextDate, getShiftedDate } from '@/utils/helpers'
import { useFetchData } from '@/components/hooks/useFetchData'

const BackPage: FC = () => {
   const { width } = Dimensions.get('window')
   const [activeIndex, setActiveIndex] = useState(1)
   const [prevIndex, setPrevIndex] = useState<number>(0);
   const { dataList, isLoading, fetchData } = useFetchData();
   const { date, setDate, dataListFromCtx, setDataListFromCtx } = useGetActiveSwiperDate()

	useEffect(() => {
		// Проверяем наличие данных перед рендером
		if (dataListFromCtx.length === 0) {
			console.log('No data in context yet');
         setDataListFromCtx(dataList);
		}
	}, [dataList]);

   const handleChange = useCallback(
      async ({ index }: { index: number }) => {
         if (index > prevIndex) {
            const currentActiveDate = dataList[index].front.date;
            const nextDate = getShiftedDate(currentActiveDate, 1);
            setDate(currentActiveDate);
            await fetchData(nextDate);
            setDataListFromCtx(dataList)
         }
         setPrevIndex(index);
      },
      [isLoading]
   );


   console.log('BACK_LIST_CTX', JSON.stringify(dataListFromCtx, null, 2))

   return isLoading && dataListFromCtx.length < 3 ? (
      <Loader />
   ) : (
      <Layout className='px-5'>
         <SwiperFlatList
            onChangeIndex={data => handleChange(data)}
            data={dataListFromCtx}
            index={dataListFromCtx.length > 1 ? activeIndex : undefined}
            renderItem={({ item }) => {
               return (
                  <View key={item.front.id} className={`items-center pt-8 px-5 bg-blue-50`} style={[{ width }]}>
                     {item.back.map((backItem: any) => (
                        <View key={backItem.id} className='mb-5'>
                           <Text className='font-bold uppercase  text-center'>{backItem.category}</Text>
                           <Text className='font-bold mb-3 uppercase text-primary text-center'>{backItem?.title}</Text>
                           <Text>{backItem?.content}</Text>
                        </View>
                     ))}
                  </View>
               )
            }}
         />
      </Layout>
   )
}

export default BackPage
