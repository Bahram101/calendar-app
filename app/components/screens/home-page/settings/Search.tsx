import Field from '@/components/ui/field/Field'
import { FC } from 'react'
import { Text, View } from 'react-native'
import { useSearch } from './useSearch'
import { ISearchFormData } from './search.interface'

const Search: FC = () => {

  const { cityList, isLoading, control, searchTerm } = useSearch()
  console.log('cityList',cityList)

  return (
    <View className='w-full'>
      <Field<ISearchFormData> placeholder='Қала аты...' control={control} name='searchTerm' keyboardType='web-search' />
    </View>
  )
}

export default Search