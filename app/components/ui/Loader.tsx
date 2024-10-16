import { FC } from 'react'
import { ActivityIndicator } from 'react-native'
import cn from 'clsx'

interface Props{
  className?: string
}

const Loader: FC<Props> = ({className}) => {
  return <ActivityIndicator size="small" color="#47AA52" className={cn('h-full', className)} />
}

export default Loader