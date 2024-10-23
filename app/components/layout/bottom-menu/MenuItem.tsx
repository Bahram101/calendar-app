import { FC } from 'react'
import { Pressable, Text } from 'react-native'
import { IMenuItem, TypeNavigate } from './menu.interface'
import { Feather } from '@expo/vector-icons'
import cn from 'clsx'

interface IMenuItemPrps {
   item: IMenuItem
   nav: TypeNavigate
   currentRoute?: string
}

const MenuItem: FC<IMenuItemPrps> = ({ item, nav, currentRoute }) => {

   const isActive = currentRoute === item.path

   return (
      <Pressable onPress={() => nav(item.path)} className='items-center w-[33%]' >
         <Feather name={item.icon} size={30} color={isActive ? '#2b6e7e' : '#0006'} />
         <Text className={cn('text-[11px] pt-1', isActive ? `text-[#2b6e7e] font-semibold` : `text-[#0006]`  )}>{item.label}</Text>
      </Pressable>
   )
}

export default MenuItem