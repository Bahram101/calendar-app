import cn from 'clsx'
import { FC, PropsWithChildren } from 'react'
import { ScrollView, View } from 'react-native'

interface ILayout {
	className?: string
}

const Layout: FC<PropsWithChildren<ILayout>> = ({ children, className }) => {
	return (
		<View className={cn('h-full w-full bg-red-300 px-3 mt-12', className)}>
			<ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
		</View>
	)
}

export default Layout
