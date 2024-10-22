interface District {
    id: number;
    name: string;
    city_id: number;
  }
  
interface DistrictList {
    rows: District[];
    count: number;
  }

async function getDistricts(): Promise<DistrictList | any>  {
    // try {
    //     const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/api-appointments/v2/appointments/reserve/', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     });
    //     if (!response.ok) {
    //         throw new Error()
    //       }
      
    //       const response_data = await response.json() as any
        
    // } catch (error) {
    //     console.error("Error submitting question:", error);
    //     throw new Error()
    // }
}




const generalService = {
  getDistricts,
 
}

export default generalService
