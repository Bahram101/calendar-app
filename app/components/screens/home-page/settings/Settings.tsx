import { FC } from 'react'
import { Dimensions, Text, View } from 'react-native'
import Search from './Search'
import AdditionalPrayTimes from './AdditionalPrayTimes'


const Settings: FC = () => {
  const { width } = Dimensions.get('window')
  return (
    <View className='h-full items-center' style={{ padding: 50, width }}>
      <Text className='text-3xl text-primary font-bold uppercase mb-10'>Баптау</Text>
      <Search/>
      <AdditionalPrayTimes/>
    </View>
  )
}

export default Settings