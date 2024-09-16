import { TypeRootStackParamList } from '@/navigation/navigation.types'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { FC } from 'react'
import { Pressable, Text, View } from 'react-native'

const Home: FC = () => {

  const { navigate } = useNavigation<NavigationProp<TypeRootStackParamList>>()

  return (
    <View>
      <Text>Home</Text>
      <Pressable onPress={() => navigate('Front')}>
        <Text>
          Go to Front page
        </Text>
      </Pressable>
      <Pressable onPress={() => navigate('Back')}>
        <Text>
          Go to Back page
        </Text>
      </Pressable>
    </View>
  )
}

export default Home