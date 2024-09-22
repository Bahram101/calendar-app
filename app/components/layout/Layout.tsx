import cn from 'clsx'
import { FC, PropsWithChildren } from 'react'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface ILayout {
	className?: string
}

const Layout: FC<PropsWithChildren<ILayout>> = ({
	children,
	className = ''
}) => {
	return (
		<View
			className={cn('h-full w-full bg-white mt-[57px] pb-[55px]', className)}
		>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ flexGrow: 1 }}
			>
				{children}
			</ScrollView>
		</View>
	)
}

export default Layout
