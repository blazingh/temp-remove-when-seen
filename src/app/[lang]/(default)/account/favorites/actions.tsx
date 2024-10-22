import { APIROUTE } from "@/constants/api_routes"


export async function getUserFavorites(type: string,page: string,token: string): Promise<any> {

    try {
        const response = await fetch(APIROUTE('getUserFavorites',{type,page}), {
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


  