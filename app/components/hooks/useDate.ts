import { useContext } from 'react'

import { DataContext } from '@/providers/DatatProvider'

export const useDate = () => useContext(DataContext)
