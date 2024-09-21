import { FC } from 'react'
import { Text, View } from 'react-native'
import { useData } from './useData'
import Loader from '@/components/ui/Loader';

interface UseDataResponse {
   data: any;
   isLoading: boolean
}

const BackPage: FC = () => {

   const { data, isLoading } = useData('2024-09-20') as UseDataResponse

   console.log('isLoading', isLoading)
   console.log('data', data)

   return isLoading ? <Loader /> : (
      <View>
         <Text>BackPage</Text>
      </View>
   )
}

export default BackPage