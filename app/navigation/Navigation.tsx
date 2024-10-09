import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FC, useEffect, useState } from 'react'
import { TypeRootStackParamList } from './navigation.types'
import { routes } from './routes'
import ButtomMenu from '@/components/layout/bottom-menu/BottomMenu'

const Stack = createNativeStackNavigator<TypeRootStackParamList>()

const Navigation: FC = () => {

  const [currentRoute, setCurrentRoute] = useState<string | undefined>(undefined)
  const navRef = useNavigationContainerRef()

  useEffect(() => {
    setCurrentRoute(navRef.getCurrentRoute()?.name)
    const listener = navRef.addListener('state', () => setCurrentRoute(navRef.getCurrentRoute()?.name))

    return () => {
      navRef.removeListener('state', listener)
    }
  }, [])

  return (
    <>
      <NavigationContainer ref={navRef}>
        <Stack.Navigator
          initialRouteName="Front"
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: '#fff'
            }
          }}>
          {routes.map(route => (
            <Stack.Screen key={route.name} {...route} />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
      <ButtomMenu nav={navRef.navigate} currentRoute={currentRoute} />
    </>
  )
}

export default Navigation