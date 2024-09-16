import BackPage from '@/components/screens/back-page/BackPage'
import FrontPage from '@/components/screens/front-page/FrontPage'
import Home from '@/components/screens/home/Home'

import { IRoute } from './navigation.types'

export const routes: IRoute[] = [
	{
		name: 'Home',
		component: Home
	},
	{
		name: 'Front',
		component: FrontPage
	},
	{
		name: 'Back',
		component: BackPage
	}
]