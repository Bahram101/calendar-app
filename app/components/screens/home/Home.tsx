import Layout from '@/components/layout/Layout'
import { TypeRootStackParamList } from '@/navigation/navigation.types'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { FC } from 'react'
import { Pressable, Text, View } from 'react-native'
import { useData } from '@/components/screens/back-page/useData'
import Loader from '@/components/ui/Loader'
import RenderHTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

interface UseDataResponse {
  data: any;
  isLoading: boolean
}

const Home: FC = () => { 
  
  const { data, isLoading } = useData('2024-09-20') as UseDataResponse

  const { width } = useWindowDimensions();

  if (data) {
    var htmlContent = data.back[0].content
  }

  console.log('isLoading', isLoading)
  console.log('data', data)

  return isLoading ? <Loader /> : (
    <Layout>
      <Text>Home</Text>
      <RenderHTML contentWidth={width} source={{ html: htmlContent }} />
    </Layout>
  )
}

export default Home