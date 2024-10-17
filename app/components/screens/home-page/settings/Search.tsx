import Field from '@/components/ui/field/Field'
import { FC } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { useSearch } from './useSearch'
import { ISearchFormData } from './search.interface'
import Loader from '@/components/ui/Loader' 
import { useGetContextData } from '@/hooks/useGetContextData' 

const Search: FC = () => { 
  const { cityList, isLoading, control, searchTerm } = useSearch()
  const {
    setCityId,
  } = useGetContextData()

  const handlePrayInfo = (id: number) => {
    setCityId(id); 
  }

  return (
    <View className='mt-12 w-full'>
      <View className=' relative'>
        <Field<ISearchFormData>
          placeholder='Қала аты...'
          control={control}
          name='searchTerm'
          keyboardType='web-search'
        />
        {isLoading && (
          <View className='absolute right-3 top-5' >
            <Loader />
          </View>
        )}
      </View>
      {searchTerm?.length >= 2 && cityList?.results?.length > 0 && (
        <View className='bg-red-100 border border-gray-300 rounded-lg mt-2'>
          <FlatList
            className='rounded-md bg-white'
            data={cityList?.results}
            keyExtractor={(item) => item.text?.toString()}
            renderItem={({ item }) => (
              <View className='bg-white '>
                <Text className='text-lg p-1 pl-2 bg-slate-300'>{item.text}</Text>
                {
                  item.children.length > 0 && item.children.map((cityItem: any) => (
                    <TouchableOpacity
                      key={cityItem.id}
                      onPress={() => {
                        console.log('cityItem', cityItem.id)
                        handlePrayInfo(cityItem.id)}
                      }
                      className='px-6 py-2 w-full border-b border-gray-200 bg-white'
                    >
                      <Text className='text-lg'>{cityItem.text}</Text>
                    </TouchableOpacity>))
                }
              </View>
            )}
          />
        </View>
      )}
    </View>
  )
}

export default Search