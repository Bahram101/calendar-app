import { FC } from 'react'
import { Dimensions, Text, View } from 'react-native'
import Search from './Search'
import AdditionalPrayTimes from './AdditionalPrayTimes'


const Settings: FC = () => {
  const { width } = Dimensions.get('window')
  return (
    <View className='h-full items-center' style={{ padding: 30, width }}>
      {/* <Text className='text-3xl text-gray-500 font-bold mb-5'>Баптау</Text> */}
      <Search/>
      <AdditionalPrayTimes/>
    </View>
  )
}

export default Settings