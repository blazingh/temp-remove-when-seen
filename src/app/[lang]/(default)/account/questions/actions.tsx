"use server";


export async function getMyQuestions(params: string, token: string): Promise<any> {
try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/api-appointments/v2/appointment/book/list/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + token
            },
        });

        if (!response.ok) {
            throw new Error()
          }
          const data = await response.json() as any   
    
         return data
        
    } catch (error) {
        console.error("Error submitting question:", error);
        // setRequest({ state: "error", message: "Bir hata oluştu. Lütfen tekrar deneyin." });
    }
}
