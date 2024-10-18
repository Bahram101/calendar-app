import Loader from '@/components/ui/Loader'
import { useGetContextData } from '@/hooks/useGetContextData'
import { convertToMonth, extraPrayTimes, prayNames } from '@/utils/helpers'
import { FC, useEffect, useState } from 'react'
import { Text, View, Dimensions, ScrollView } from 'react-native'
import cn from 'clsx'
import { typePrayName } from '@/types/prayNames.interface'

interface Props {
  namaztimes?: any
}

const PrayTimes: FC<Props> = ({ namaztimes }) => {
  const { width } = Dimensions.get('window')
  const {
    prayInfo,
    setPrayInfo
  } = useGetContextData()

  useEffect(() => {
    if (namaztimes && namaztimes.praytimes) {
      const res = Object.entries(namaztimes.praytimes)
        .map(([key, val]) => ({
          key,
          val: val as string,
          isActive: extraPrayTimes.includes(key) ? false : true
        }))
      const pageInfo = {
        slm_date: namaztimes.islamic_date,
        date: namaztimes.date,
        cityName: namaztimes.attributes.CityName,
        prayTimes: res
      }
      setPrayInfo(pageInfo)
    }
  }, [namaztimes])

  console.log('asdf', JSON.stringify(prayInfo, null, 2))


  return prayInfo?.prayTimes?.length > 0 && (
    <View className={cn('flex items-center h-full p-[30px]')}>
      <Text className='text-3xl text-primary font-bold uppercase mb-10'>{prayInfo?.cityName}</Text>

      <View className='mb-2 pt-6 w-60 items-center border-t border-gray-200'>
        <Text className='uppercase'>
          {prayInfo?.slm_date && convertToMonth(prayInfo?.slm_date, 'hijri')}
        </Text>
      </View>

      <View className='pb-6 w-60 mb-8 items-center border-b border-gray-200' >
        <Text className='uppercase'>{prayInfo?.date && convertToMonth(prayInfo?.date, 'miladi')}</Text>
      </View>
      <View className='mt-5 mb-10 flex-1' >
        <ScrollView
          scrollEnabled={true}
          nestedScrollEnabled={true}>
          {prayInfo.prayTimes.map((item: typePrayName) => (
            item.isActive && (
              <View key={item.key} className={
                cn('flex-row w-full justify-between pt-1 pb-1 border-b border-gray-200')}
              >
                <Text className='text-2xl'>{prayNames[item.key as keyof typeof prayNames]}</Text>
                <Text className='text-2xl'>{item.val}</Text>
              </View>
            )
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

export default PrayTimes