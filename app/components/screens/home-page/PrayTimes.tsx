import Loader from '@/components/ui/Loader'
import { typePrayName } from '@/types/prayNames.interface'
import { prayNames } from '@/utils/helpers'
import { FC, useEffect, useState } from 'react'
import { Text, View, Dimensions } from 'react-native'

interface Props {
  isLoading: boolean
  namaztimes?: any
}

const Namaztimes: FC<Props> = ({ namaztimes }) => {
  const { width } = Dimensions.get('window')
  const [prayTimes, setPrayTimes] = useState<typePrayName[]>()

  useEffect(() => {
    const res = namaztimes ? Object?.entries(namaztimes?.praytimes)
      .map(([key, val]) => ({
        key, val: val as string, isActive:
          ['ishraq', 'kerahat', 'asriauual', 'isfirar', 'ishtibaq', 'ishaisani'].includes(key) ? false : true
      })) : []
    setPrayTimes(res)
  }, [namaztimes])

  console.log('prayTimes', JSON.stringify(prayTimes, null, 2));

  return (
    <View className='flex items-center justify-center h-full' style={{ padding: 50, width }}>
      {prayTimes && prayTimes.length > 0 ? (
        prayTimes.map(item => (
          item.isActive && (
            <View key={item.key} className='flex-row w-full justify-between'>
              <Text className='text-lg'>{prayNames[item.key as keyof typeof prayNames]}</Text>
              <Text className='text-lg'>{item.val}</Text>
            </View>
          )
        ))
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  )
}

export default Namaztimes