"use server";

export async function getMyAppointments(params: string, token: string): Promise<any> {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/api-appointments/v2/appointment/book/list/', {
            method: 'GET',
            next: { revalidate: 0 },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });

        if (!response.ok) {
            throw new Error();
        }

        const data = await response.json() as any;
        return data;
    } catch (error) {
        console.error("Error fetching appointments:", error);
    }
}
 
export async function getMyFiles(appointmentId: string, token: string): Promise<any> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api-appointments/v2/appointment-files/${appointmentId}?lang=en`, {
            method: 'GET',
            next: { revalidate: 0 },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });

        if (!response.ok) {
            throw new Error();
        }

        const data = await response.json() as any;
        // console.log("data:", data); 
        return data;
    } catch (error) {
        //console.error("Dosyalar çekilirken hata oluştu:", error);
    }
}

export async function uploadFile(data: FormData, token: string): Promise<any> {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/api-appointments/v2/appointment-files', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: data
        });

        if (!response.ok) {
            const responseData = await response.json();
            throw new Error(JSON.stringify(responseData));
        }

        const responseData = await response.json();
       // console.log('Uploaded file response data:', responseData);
        return responseData;
    } catch (error) {
       // console.error("Error uploading file:", error);

        
        if (error instanceof Error && typeof error.message === 'string') {
            try {
                const errorData = JSON.parse(error.message);
                if (errorData.error) {
                    alert(errorData.error); 
                   // console.error("Error message from server:", errorData.error);
                } else {
                    alert("Beklenmeyen bir hata oluştu.");
                }
            } catch (parseError) {
                console.error("Error parsing error response:", parseError);
                alert("Hata yanıtı ayrıştırılırken bir hata oluştu.");
            }
        } else {
            console.error("Error object is not in expected format:", error);
            alert("Beklenmeyen bir hata oluştu.");
        }
        
        throw new Error('Dosya yüklenirken bir hata oluştu.');
    }
}




export async function deleteFile(fileId: string, token: string): Promise<boolean> {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/api-appointments/v2/appointment-files/delete', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ file_ids: [fileId] })
        });

        if (!response.ok) {
            const responseData = await response.json();
            // console.error('Dosya silme hatası:', responseData);
            throw new Error(JSON.stringify(responseData));
        }

        return true;

    } catch (error) {
        // console.error("Dosya silinirken hata oluştu:", error);
        alert('Dosya silinemedi. Hata: ' + error); 

        throw new Error('Dosya silinemedi');
    }
}
