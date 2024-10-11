import axios from "axios"

export const PrayTimesService = {
  async getData(city: number | null){
    return axios(`https://namaztimes.kz/api/praytimes?id=${city}`)
  }
}