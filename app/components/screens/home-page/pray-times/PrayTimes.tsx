import { useGetContextData } from '@/hooks/useGetContextData'
import { convertToMonth, minTwoDigits, prayNames } from '@/utils/helpers'
import { Text, View, ScrollView } from 'react-native'
import cn from 'clsx'
import { TypePrayName } from '@/types/prayInfo.interface'
import { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'

const PrayTimes = () => {
  const {
    prayInfo,
    dateToday
  } = useGetContextData()

  const [currentTime, setCurrentTime] = useState('')

  const activePrayTimes = prayInfo?.prayTimes?.filter((item: TypePrayName) => item.isActive)

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { timeZone: 'Asia/Almaty', hour: '2-digit', minute: '2-digit', hour12: false };
      const localTime = now.toLocaleString('en-US', options);
      setCurrentTime(localTime)
    }
    const timer = setInterval(updateCurrentTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return prayInfo && prayInfo?.prayTimes?.length > 0 && (
    <View className={cn('flex items-center h-full p-[30px]')}>
      <View className='flex-row items-center'>
        <View className='font-bold'>
          <Feather name='map-pin' size={25} color={'#2b6e7e'} className='font-bold' strokeWidth={20} />
        </View>
        <Text className='text-3xl text-primary font-bold uppercase ml-3'>
          {prayInfo?.cityName}
        </Text>
      </View>
      <View className='mb-2 mt-10 pt-6 w-60 items-center border-t border-gray-200'>
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
          {activePrayTimes?.map((item: TypePrayName, index: number) => {
            const nextItem = activePrayTimes[index + 1];
            const itemTime = `${minTwoDigits(item.val)[0]}:${minTwoDigits(item.val)[1]}`;
            const nextItemTime = nextItem ? `${minTwoDigits(nextItem.val)[0]}:${minTwoDigits(nextItem.val)[1]}` : null;
            const isCurrentTime = itemTime <= currentTime && (nextItemTime ? currentTime < nextItemTime : true);

            return (
              <View key={item.key} className={
                cn('flex-row w-full justify-between pt-1 pb-1 border-gray-200 ',
                  item.key !== activePrayTimes[activePrayTimes.length - 1].key && 'border-b',
                  isCurrentTime ? 'bg-primaryLight text-white' : ''
                )}
              >
                <Text className='text-2xl text-blackL'>{prayNames[item.key as keyof typeof prayNames]}</Text>
                <View className='w-[72px] flex-row'>
                  <Text className='text-2xl flex-1 text-[#2E4158]'>
                    {minTwoDigits(item.val)[0]}
                  </Text>
                  <Text className='text-2xl text-[#2E4158]'>:</Text>
                  <Text className='text-2xl flex-1 text-right text-[#2E4158]'>{minTwoDigits(item.val)[1]} </Text>
                </View>
              </View>
            )
          })}
        </ScrollView>
      </View>
    </View >
  )
}

export default PrayTimes