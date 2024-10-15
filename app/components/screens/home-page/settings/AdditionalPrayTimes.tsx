import { useGetContextData } from '@/hooks/useGetContextData'
import { extraPrayTimes, prayNames } from '@/utils/helpers'
import { FC } from 'react'
import { Text, View } from 'react-native'
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

   // console.log('ppp', prayInfo?.prayTimes)
   
  console.log('prayInfo', JSON.stringify(prayInfo?.prayTimes, null, 2));

   return (
      <View className='mt-5'>
         {prayInfo?.prayTimes?.length > 0 ? (
            prayInfo?.prayTimes?.map((item: any) => (
               extraPrayTimes.includes(item.key) && (
                  <View key={item.key} className='flex-row w-full justify-between pt-1 pb-1'
                     style={{ borderBottomWidth: 1, borderColor: '#DDDEE4' }}>
                     <Text className='text-2xl'>{prayNames[item.key as keyof typeof prayNames]}</Text>
                     <ToggleSwitch
                        isOn={item.isActive}
                        onColor="#2b6e7e"
                        offColor="#DDDEE4"
                        labelStyle={{ color: "black", fontWeight: "900" }}
                        size="medium"
                        onToggle={isOn => handleToggle(item.key, isOn)}
                     />
                  </View>
               )
            ))
         ) : (
            <Text>No data available</Text>
         )}
      </View>
   )
}

export default AdditionalPrayTimes