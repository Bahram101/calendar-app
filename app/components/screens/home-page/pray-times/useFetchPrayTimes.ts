import { PrayTimesService } from "@/services/pray-times.service"
import { useState } from "react"

export const useFetchPrayTimes = (city: number | undefined | null)=>{
  const [isLoading, setIsLoading] = useState(false)
  const [namaztimes, setNamaztimes] = useState<any>(null)

  const fetchNamaztimes = async () =>{
    setIsLoading(true)
    try{
      const res = await PrayTimesService.getPrayInfo(city, true)
      setIsLoading(false)
      setNamaztimes(res)
      return res
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