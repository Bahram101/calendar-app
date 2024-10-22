import { TypeCityId } from "@/providers/data-provider.interface"
import { PrayTimesService } from "@/services/pray-times.service"
import { useState } from "react"

export const useFetchPrayTimes = (city: TypeCityId)=>{
  const [isLoading, setIsLoading] = useState(false)
  const [prayTimes, setPrayTimes] = useState<any>(null)

  const fetchPrayTimes = async () =>{
    setIsLoading(true)
    try{
      const res = await PrayTimesService.getPrayInfo(city, true)
      setIsLoading(false)
      setPrayTimes(res)
      return res
    }catch(e){
      console.log('Error:', e)
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    prayTimes,
    fetchPrayTimes
  }

}