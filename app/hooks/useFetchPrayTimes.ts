import { PrayTimesService } from "@/services/pray-times.service"
import { useState } from "react"

export const useFetchNamaztimes = (city: number | null = 8408)=>{
  const [isLoading, setIsLoading] = useState(false)
  const [namaztimes, setNamaztimes] = useState({})


  const fetchNamaztimes = async () =>{
    setIsLoading(true)
    try{
      const res = await PrayTimesService.getData(city)
      setIsLoading(false)
      setNamaztimes(res.data)
      return res.data
    }catch(e){
      console.log('Error:', e)
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    namaztimes,
    fetchNamaztimes
  }

}