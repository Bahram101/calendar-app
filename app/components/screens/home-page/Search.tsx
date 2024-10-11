import { FC } from 'react'
import { Dimensions, Text, View } from 'react-native'

// interface Props {
//   width: number
// }

const Search: FC = () => {
  const { width, height } = Dimensions.get('window')
  return (
    <View className='flex items-center justify-center h-full ' style={[{ width }]}>
      <Text>Beautiful</Text>
    </View>
  )
}

export default Search