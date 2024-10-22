"use server";


export async function getMyAppointments(params: string, status: string, token: string): Promise<any> {
try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api-appointments/v2/appointment/book/list/?status=${status}`, {
            method: 'GET',
            next: { revalidate: 0 },
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + token
            },
        });

        if (!response.ok) {
            throw new Error()
          }
          const data = await response.json() as any   
           // console.log(data);
         return data
        
    } catch (error) {
        console.error("Error submitting question:", error);
        // setRequest({ state: "error", message: "Bir hata oluştu. Lütfen tekrar deneyin." });
    }
}
