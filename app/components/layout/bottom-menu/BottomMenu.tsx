import { FC } from 'react'
import { Platform, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import MenuItem from './MenuItem'
import { menuItems } from './menu.data'
import { TypeNavigate } from './menu.interface'

interface IButtonMenu {
	nav: TypeNavigate
	currentRoute?: string
}

const BottomMenu: FC<IButtonMenu> = props => {
	const { bottom } = useSafeAreaInsets()

	const isAndroid = Platform.OS === 'android'
	const isIOS = Platform.OS === 'ios'

	return (
		<View
			className='pt-2 pb-5 px-2 flex-row justify-between items-center w-full border-t border-t-solid border-t-[#bbb] bg-white'
			style={{ paddingBottom: isIOS ? bottom : isAndroid ? bottom + 12 : 0 }}
		>
			{menuItems.map(item => (
				<MenuItem key={item.path} item={item} {...props} />
			))}
		</View>
	)
}

export default BottomMenu
