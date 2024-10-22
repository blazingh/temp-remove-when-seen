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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api-appointments/v2/appointment-notes/${appointmentId}`, {
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

export async function addNote(appointmentId: string, note: string, token: string): Promise<any> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api-appointments/v2/appointment-notes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                appointment_id: appointmentId,
                note: note
            })
        });

        if (!response.ok) {
            throw new Error('Failed to add note');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error adding note:", error);
        throw error;
    }
}

export async function editNote(noteId: string, updatedNote: string, token: string): Promise<any> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api-appointments/v2/appointment-notes/update/${noteId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ note: updatedNote })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to edit note: ${errorText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error editing note:", error);
        throw error;
    }
}


export async function deleteNote(noteId: string, token: string): Promise<any> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api-appointments/v2/appointment-notes/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                note_ids: [noteId]
            })
        });

        if (!response.ok) {
            throw new Error('Failed to delete note');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error deleting note:", error);
        throw error;
    }
}





