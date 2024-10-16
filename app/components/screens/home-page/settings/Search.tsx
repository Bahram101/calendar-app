import Field from '@/components/ui/field/Field'
import { FC, useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { useSearch } from './useSearch'
import { ISearchFormData } from './search.interface'
import Loader from '@/components/ui/Loader'
import { useGetPrayInfo } from './useGetPrayInfo'
import { useGetContextData } from '@/hooks/useGetContextData'

const Search: FC = () => {

  const { cityList, isLoading, control, searchTerm } = useSearch()
  const {
    activeIndex,
    cityId,
    setCityId,
    setPrayInfo
  } = useGetContextData()

  const handlePrayInfo = (id: number) => {
    console.log('id',id)
    setCityId(id);
  }

  // const { cityId } = useGetContextData()
  const { cityInfo, isLoading2 } = useGetPrayInfo(cityId)

  // Сохраняем данные о городе в контекст
  if (cityInfo) {
    setPrayInfo(cityInfo)
  }

  useEffect(()=>{

  }, [])

  console.log('cityInfo', cityInfo)
  console.log('cityId', cityId)

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
                      onPress={() => handlePrayInfo(cityItem.id)}
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