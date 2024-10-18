import { useGetContextData } from '@/hooks/useGetContextData'
import { typePrayName } from '@/types/prayNames.interface'
import { extraPrayTimes, prayNames } from '@/utils/helpers'
import { FC } from 'react'
import { ScrollView, Text, View } from 'react-native'
import ToggleSwitch from 'toggle-switch-react-native'


const AdditionalPrayTimes: FC = () => {
   const {
      prayInfo,
      setPrayInfo
   } = useGetContextData()


   const handleToggle = (key: string, isOn: boolean) => {
      setPrayInfo((prevState: any) => ({
         ...prevState,
         prayTimes: prevState.prayTimes.map((item: any) =>
            item.key === key
               ? { ...item, isActive: isOn }
               : item)
      }))
   }

   return (
      <View className='flex-1 justify-center absolute bottom-1/3 -z-10'>
         {prayInfo?.prayTimes?.length > 0 ? (
            prayInfo?.prayTimes?.map((item: typePrayName) => (
               extraPrayTimes.includes(item.key) && (
                  <ScrollView
                     key={item.key}
                     scrollEnabled={true}
                     nestedScrollEnabled={true}>
                     <View className='flex-row w-full justify-between pt-1 pb-1 border-b border-gray-200'>
                        <Text className='text-2xl'>{prayNames[item.key as keyof typeof prayNames]}</Text>
                        <View style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }} className='flex justify-center pr-2'>
                           <ToggleSwitch
                              isOn={item.isActive}
                              onColor="#2b6e7e"
                              offColor="#DDDEE4"
                              labelStyle={{ color: "black", fontWeight: "900" }}
                              onToggle={isOn => handleToggle(item.key, isOn)}
                           />
                        </View>
                     </View>
                  </ScrollView>
               )
            ))
         ) : (
            <Text>No data available</Text>
         )}
      </View>
   )
}

export default AdditionalPrayTimes