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
   const { date, setDate } = useGetActiveSwiperDate()
   const { dataList, isLoading, fetchData } = useFetchData();

   useEffect(() => {
      const dates = getAdjacentDates(date);
      const fetchDateList = async () => {
         for (const item of dates) {
            await fetchData(item);
         }
         setDate(date);
      };
      fetchDateList();
   }, []);

   const handleChange = useCallback(
      ({ index }: { index: number }) => {

         if (index === dataList.length - 1 && !isLoading) {
            const currentActiveDate = dataList[index].front.date;
            const nextDate = getShiftedDate(currentActiveDate, 1);
            setDate(currentActiveDate);
            fetchData(nextDate);
         }
      },
      [isLoading]
   )

   // console.log('DATA_LIST_BACK', JSON.stringify(dataList.flat(), null, 2))
   // console.log('DATE_BACK_CTX', date)

   return isLoading && dataList.length < 3 ? (
      <Loader />
   ) : (
      <Layout className='px-5'>
         <SwiperFlatList
            onChangeIndex={data => handleChange(data)}
            data={dataList}
            index={dataList.length > 1 ? activeIndex : undefined}
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
