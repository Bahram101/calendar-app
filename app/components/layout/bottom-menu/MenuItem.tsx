import { FC } from 'react'
import { Pressable, Text, View } from 'react-native'
import { IMenuItem, TypeNavigate } from './menu.interface'
import { Feather } from '@expo/vector-icons'

interface IMenuItemPrps {
   item: IMenuItem
   nav: TypeNavigate
   currentRoute?: string
}

const MenuItem: FC<IMenuItemPrps> = ({ item, nav, currentRoute }) => {

   const isActive = currentRoute === item.path

   return (
      <Pressable onPress={() => nav(item.path)} className='items-center w-[25%]' >
         <Feather name={item.icon} size={30} color={isActive ? '#2b6e7e' : '#0006'} />
      </Pressable>
   )
}

export default MenuItem