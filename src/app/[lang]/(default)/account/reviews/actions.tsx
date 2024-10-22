import { APIROUTE } from "@/constants/api_routes"


export async function getUserReviews(page: string,token: string): Promise<any> {


    const limit = '10'
    
    try {
        const response = await fetch(APIROUTE('getUserReviews',{page,limit}), {
          method: 'GET',
          headers: { "Content-Type": "application/json", "Authorization" : 'Bearer ' + token}
        })
    
        if (!response.ok) {
          return {
            message: (await response.json()).error?.message || 'Hata oluştu, En kısa zamanda çözülecek ',
            success: false
          }
        }
        return response
        
    
    
      } catch (error) {
        return { message: 'Bir sorun oluştu', success: false }
      }
  }


  