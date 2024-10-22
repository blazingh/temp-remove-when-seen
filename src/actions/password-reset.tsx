'use server'

import { APIROUTE } from '@/constants/api_routes'
import { pick } from 'lodash'
import { getLocale, getTranslations } from 'next-intl/server'
import { z } from 'zod'

export async function renewPasswordWithPhone(prevState: any, formData: FormData) {

  const t = await getTranslations('messages')

  const schema = z.object({
    phone: z
      .string({
        invalid_type_error: t('Errors.invalid_phone_number'),
      })
      .min(10, t('Errors.invalid_phone_number')),
    password: z
      .string({
        invalid_type_error: t('Errors.invalid_password'),
      })
      .min(6, t('Errors.invalid_password')),
    country_code: z
      .string({
        invalid_type_error: 'Invalid country_code',
      }),
    remember_me: z
      .any(),
  })

  const parse = schema.safeParse({
    phone: (formData.get('phone') as string).replace(/\D/g, ''),
    country_code: formData.get('country_code'),
    password: formData.get('password'),
    remember_me: formData.get('remember_me'),
  })

  if (!parse.success) {
    return { message: 'zod', success: false, zod_errors: parse.error.flatten().fieldErrors }
  }

  const data = parse.data

  try {
    const response = await fetch(APIROUTE('renewPasswordWithPhone'), {
      method: 'POST',
      body: JSON.stringify(pick(data, ['phone', 'country_code', 'password'])),
      headers: { "Content-Type": "application/json", "accept-language": await getLocale() }
    })

    if (!response.ok) {
      return {
        message: (await response.json()).error?.message || t('Errors.failed_to_send_message'),
        success: false
      }
    }

    const response_data = await response.json() as any

    if (!response_data.identifier) {
      throw new Error()
    }

    return { message: t('Success.sms_sent'), success: true, identifier: response_data.identifier, ...response_data }

  } catch (error) {
    return { message: t('Errors.failed_to_send_message'), success: false }
  }

}

export async function loginWithEmail(prevState: any, formData: FormData) {

  const t = await getTranslations('messages')

  const schema = z.object({
    email: z
      .string({
        invalid_type_error: t('Errors.invalid_email'),
      })
      .email(t('Errors.invalid_email')),
    password: z
      .string({
        invalid_type_error: t('Errors.invalid_password'),
      })
      .min(6, t('Errors.invalid_password')),
    remember_me: z
      .any(),
  })

  const parse = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    remember_me: formData.get('remember_me'),
  })

  if (!parse.success) {
    return { message: 'zod', success: false, zod_errors: parse.error.flatten().fieldErrors }
  }

  const data = parse.data

  try {
    const response = await fetch(APIROUTE('loginWithPhone'), {
      method: 'POST',
      body: JSON.stringify(pick(data, ['email', 'password'])),
      headers: { "Content-Type": "application/json", "accept-language": await getLocale() }
    })

    if (!response.ok) {
      return {
        message: (await response.json()).error?.message || t('Errors.failed_to_send_message'),
        success: false
      }
    }

    const response_data = await response.json() as any

    if (!response_data.identifier) {
      throw new Error()
    }

    return { message: t('Success.sms_sent'), success: true, identifier: response_data.identifier, ...response_data }

  } catch (error) {
    return { message: t('Errors.failed_to_send_message'), success: false }
  }

}

export async function registerWithPhone(prevState: any, formData: FormData) {

  const t = await getTranslations('messages')

  const schema = z.object({
    country_code: z
      .string({
        invalid_type_error: 'Invalid country_code',
      }),
    phone: z
      .string({
        invalid_type_error: t('Errors.invalid_phone_number'),
      }),
    email: z
      .any()
  })

  const parse = schema.safeParse({
    country_code: formData.get('country_code'),
    phone: (formData.get('phone') as string).replace(/\D/g, ''),
    email: formData.get('email')
  })

  if (!parse.success)
    return { message: 'zod', success: false, zod_errors: parse.error.flatten().fieldErrors }

  const data = parse.data


  try {
    const response = await fetch(APIROUTE('registerWithPhone'), {
      method: 'POST',
      body: JSON.stringify(pick(data, ['country_code', 'phone', 'email'])),
      headers: { "Content-Type": "application/json" }
    })

    if (!response.ok) {
      throw new Error()
    }

    const response_data = await response.json() as any

    if (!response_data.identifier)
      throw new Error()

    return { message: t('Success.registered'), success: true, identifier: response_data.identifier, ...response_data }

  } catch (error) {
    return { message: t('Errors.failed_to_register'), success: false }
  }

}

export async function verifyOtp(prevState: any, formData: FormData) {

  const t = await getTranslations('messages')

  const schema = z.object({
    identifier: z.string({
      invalid_type_error: 'Invalid identifier',
    }),
    otp_code: z.string({
      invalid_type_error: t('Errors.invalid_code'),
    }).min(4, t('Errors.invalid_code')).max(6, t('Errors.invalid_code')).regex(/^\d+$/, {
      message: t('Errors.invalid_code'),
    })
  })

  const parse = schema.safeParse({
    identifier: formData.get('identifier'),
    otp_code: formData.get('otp_code'),
  })

  if (!parse.success)
    return { message: 'zod', success: false, zod_errors: parse.error.flatten().fieldErrors }

  const data = parse.data

  // backend process start here
  try {
    const response = await fetch(APIROUTE('verifyOtp'), {
      method: 'POST',
      body: JSON.stringify(pick(data, ['identifier', 'otp_code'])),
      headers: { "Content-Type": "application/json" }
    })

    if (!response.ok) {
      throw new Error()
    }


  } catch (error) {
    return { message: t('Errors.failed_to_login'), success: false }
  }

}
