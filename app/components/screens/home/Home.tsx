import Layout from '@/components/layout/Layout'
import { TypeRootStackParamList } from '@/navigation/navigation.types'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { FC } from 'react'
import { Pressable, Text, View } from 'react-native'

const Home: FC = () => {

  const { navigate } = useNavigation<NavigationProp<TypeRootStackParamList>>()

  return (
    <Layout className=''>
      <Text>Home</Text>
      <Text>bottom text</Text> 
    </Layout>
  )
}

export default Home