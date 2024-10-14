import { convertToMonth, prayNames } from '@/utils/helpers'
import { FC, useEffect, useState } from 'react'
import { Text, View, Dimensions } from 'react-native'

interface Props {
  isLoading: boolean
  namaztimes?: any
}

const PrayTimes: FC<Props> = ({ namaztimes }) => {
  const { width } = Dimensions.get('window')
  const [prayInfo, setPrayInfo] = useState<any>()

  useEffect(() => {
    if (namaztimes && namaztimes.praytimes) {
      const res = Object.entries(namaztimes.praytimes)
        .map(([key, val]) => ({
          key,
          val: val as string,
          isActive: ['ishraq', 'kerahat', 'asriauual', 'isfirar', 'ishtibaq', 'ishaisani']
            .includes(key) ? false : true
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

  console.log('prayInfo', JSON.stringify(prayInfo, null, 2));

  return (
    <View className='flex items-center h-full' style={{ padding: 50, width }}>
      <Text className='text-3xl text-primary font-bold uppercase mb-10'>{prayInfo?.cityName}</Text>

      <View className='mb-2 pt-6 w-60 items-center' style={{ borderTopWidth: 1, borderColor: '#DDDEE4' }}>
        <Text className='uppercase'>
          {prayInfo?.slm_date && convertToMonth(prayInfo?.slm_date, 'hijri')}
        </Text>
      </View>

      <View className='pb-6 w-60 mb-8 items-center' style={{ borderBottomWidth: 1, borderColor: '#DDDEE4' }}>
        <Text className='uppercase'>{prayInfo?.date && convertToMonth(prayInfo?.date, 'miladi')}</Text>
      </View>

      <View className='mt-5'>
        {prayInfo?.prayTimes?.length > 0 ? (
          prayInfo.prayTimes.map((item: any) => (
            item.isActive && (
              <View key={item.key} className='flex-row w-full justify-between pt-1 pb-1' 
                style={{ borderBottomWidth: 1, borderColor: '#DDDEE4' }}>
                <Text className='text-2xl'>{prayNames[item.key as keyof typeof prayNames]}</Text>
                <Text className='text-2xl'>{item.val}</Text>
              </View>
            )
          ))
        ) : (
          <Text>No data available</Text>
        )}
      </View>
    </View>
  )
}

export default PrayTimes