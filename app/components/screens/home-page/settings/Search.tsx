import Field from '@/components/ui/field/Field'
import { FC, useEffect } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { useSearch } from './useSearch'
import { ISearchFormData } from './search.interface'
import Loader from '@/components/ui/Loader'
import { useGetContextData } from '@/hooks/useGetContextData'
import cn from 'clsx'
import { useFetchPrayTimes } from '../pray-times/useFetchPrayTimes'
import { EnumAsyncStorage, getPrayInfoFromStorage, processPrayTimes, removePrayInfoFromStorage, savePrayInfoToStorage } from '@/utils/helpers'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
        <View className='mt-1 border border-gray-300 
           absolute w-full top-[60px] z-10' style={{
            elevation: 10,
            borderRadius: 8,
            overflow: 'hidden'
          }}>
          <FlatList
            className='bg-white'
            style={{ maxHeight: 200 }}
            data={cityList?.results}
            keyExtractor={(item) => item.text?.toString()}
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
            renderItem={({ item }) => (
              <View>
                <Text className='text-lg p-1 pl-2 bg-slate-300'>{item.text}</Text>
                {
                  item.children.length > 0 && item.children.map((cityItem: any, index: number) => (
                    <TouchableOpacity
                      key={cityItem.id}
                      onPress={() => handlePrayInfo(cityItem.id)}
                      className={cn('px-6 py-2 w-full border-gray-200 bg-white',
                        item.children.length - 1 !== index && 'border-b')}
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