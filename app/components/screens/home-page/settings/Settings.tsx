import { FC } from 'react'
import { View } from 'react-native'
import Search from './Search'
import AdditionalPrayTimes from './AdditionalPrayTimes'


const Settings: FC = () => {
  return (
    <View className='h-full items-center p-[30px]'>
      <Search/>
      <AdditionalPrayTimes/>
    </View>
  )
}

export default Settings