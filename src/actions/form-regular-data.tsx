'use server'

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function getDistricts(params: string): Promise<any> {
  try {

    const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/api-patients/districts/listByDomain/' + params, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error()
    }
    const data = await response.json() as any

    return data

  } catch (error) {
  }
}
export async function EditReviewUpdateForm(prevState: any, formData: any) {

  const session = await getServerSession(authOptions);

  if (!session?.user)
    return { message: 'session', success: false }



  const schema = z.object({
    subject_type: z.string({ invalid_type_error: 'subject_type is required' }),
    body: z.string({ invalid_type_error: 'body is required' }),
    subject_id: z.string({ invalid_type_error: "subject_id is required" }),
    rate: z.string({ invalid_type_error: 'rate is required' }),
  })

  const parse = schema.safeParse({
    subject_type: formData.get('subject_type'),
    body: formData.get('body'),
    subject_id: formData.get('subject_id'),
    rate: formData.get('rate'),
  })



  if (!parse.success) {
    return { message: 'zod', success: false, zod_errors: parse.error.flatten().fieldErrors }
  }

  const data = {
    body: formData.get('body'),
    rate: Number(formData.get('rate')),
  }



  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL
      + '/api-patients/reviews/update/'
      + formData.get('subject_id'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + session?.user?.tokens.accessToken
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {

      return {
        message: 'Hata oluştu',
        success: false
      }
    }
    return { message: 'Basariyla iletildi', success: true }

  } catch (error) {

    return { message: 'Hata oluştu', success: false }
  }
}
