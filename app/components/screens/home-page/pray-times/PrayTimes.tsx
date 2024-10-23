import { useGetContextData } from '@/hooks/useGetContextData'
import { convertToMonth, minTwoDigits, prayNames } from '@/utils/helpers'
import { Text, View, ScrollView } from 'react-native'
import cn from 'clsx'
import { TypePrayName } from '@/types/prayInfo.interface'

const PrayTimes = () => {
  const {
    prayInfo,
  } = useGetContextData()

  return prayInfo && prayInfo?.prayTimes?.length > 0 && (
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
      <View className='mt-5 mb-10 flex-1'>
        <ScrollView
          scrollEnabled={true}
          nestedScrollEnabled={true}>
          {prayInfo.prayTimes.map((item: TypePrayName) => (
            item.isActive && (
              <View key={item.key} className={
                cn('flex-row w-full justify-between pt-1 pb-1 border-b border-gray-200')}
              >
                <Text className='text-2xl'>{prayNames[item.key as keyof typeof prayNames]}</Text>
                <View className='w-[72px] flex-row'>
                  <Text className='text-2xl flex-1'>
                    {minTwoDigits(item.val)[0]}
                  </Text>
                  <Text className='text-2xl'>:</Text>
                  <Text className='text-2xl flex-1 text-right'>{minTwoDigits(item.val)[1]} </Text>
                </View>
              </View>
            )
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

export default PrayTimes