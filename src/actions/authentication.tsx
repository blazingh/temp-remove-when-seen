"use server";

import { APIROUTE } from "@/constants/api_routes";
import { isEmpty, isNil, omitBy, pick } from "lodash";
import { getLocale, getTranslations } from "next-intl/server";
import { z } from "zod";

export async function loginWithPhone(prevState: any, formData: FormData) {
  const t = await getTranslations("messages");

  const schema = z.object({
    phone: z
      .string({
        invalid_type_error: t("Errors.invalid_phone_number"),
      })
      .min(10, t("Errors.invalid_phone_number")),
    // password: z
    //   .string({
    //     invalid_type_error: t('Errors.invalid_password'),
    //   })
    //   .min(8, t('Errors.invalid_password')),
    country_code: z.string({
      invalid_type_error: "Invalid country_code",
    }),
    remember_me: z.any(),
  });

  const parse = schema.safeParse({
    phone: (formData.get("phone") as string).replace(/\D/g, ""),
    country_code: formData.get("country_code"),
    // password: formData.get('password'),
    remember_me: formData.get("remember_me"),
  });

  if (!parse.success) {
    return {
      message: "zod",
      success: false,
      zod_errors: parse.error.flatten().fieldErrors,
    };
  }

  const data = parse.data;

  try {
    const response = await fetch(APIROUTE("loginWithPhone"), {
      method: "POST",
      body: JSON.stringify(pick(data, ["phone", "country_code", "password"])),
      headers: {
        "Content-Type": "application/json",
        "accept-language": await getLocale(),
      },
    });

    if (!response.ok)
      return {
        message:
          (await response.json()).error?.message ||
          t("Errors.failed_to_send_message"),
        success: false,
      };

    const response_data = (await response.json()) as any;

    if (!response_data.identifier) {
      throw new Error();
    }

    return {
      message: t("Success.sms_sent"),
      success: true,
      identifier: response_data.identifier,
      ...response_data,
    };
  } catch (error) {
    return { message: t("Errors.failed_to_send_message"), success: false };
  }
}

export async function registerClinic(prevState: any, formData: any) {
  const t = await getTranslations("messages");

  const schema = z.object({
    authorized_name: z
      .string({ invalid_type_error: t("Errors.authorized_name") })
      .min(10, t("Errors.authorized_name")),
    district_id: z.string({ invalid_type_error: t("Errors.district_id") }),
    city_id: z.string({ invalid_type_error: t("Errors.city_id") }),
    phone: z
      .string({ invalid_type_error: t("Errors.invalid_phone_number") })
      .min(10, t("Errors.invalid_phone_number")),
    phone_code: z.string({
      invalid_type_error: t("Errors.invalid_phone_code"),
    }),
    submerchant_name: z.string({
      invalid_type_error: t("Errors.submerchant_name"),
    }),
    email: z.string({ invalid_type_error: t("Errors.invalid_email") }),
  });

  const parse = schema.safeParse({
    authorized_name: formData.get("authorized_name"),
    district_id: formData.get("district_id"),
    city_id: formData.get("city_id"),
    phone: formData.get("phone"),
    phone_code: formData.get("phone_code"),
    submerchant_name: formData.get("submerchant_name"),
    email: formData.get("email"),
  });
  if (!parse.success) {
    return {
      message: "zod",
      success: false,
      zod_errors: parse.error.flatten().fieldErrors,
    };
  }
  const data = {
    user_name: formData.get("authorized_name"),
    district: formData.get("district_id"),
    city: formData.get("city_id"),
    phone: formData.get("phone"),
    phone_country_code: formData.get("phone_code"),
    clinic_name: formData.get("submerchant_name"),
    email: formData.get("email"),
  };

  try {
    const response = await fetch(APIROUTE("createClinic"), {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const interview = await response.json();

    if (!response.ok) {
      return {
        message: interview.error?.message || t("Errors.failed_to_send_message"),
        success: false,
      };
    }
    if (!interview.identifier) {
      return { message: t("Errors.failed_to_send_message"), success: false };
    }
    return {
      message: t("Success.sms_sent"),
      success: true,
      identifier: interview.identifier,
      ...interview,
    };
  } catch (error) {
    return { message: t("Errors.failed_to_send_message"), success: false };
  }
}

export async function loginWithEmail(prevState: any, formData: FormData) {
  const t = await getTranslations("messages");

  const lang = await getLocale();

  const schema = z.object({
    email: z
      .string({
        invalid_type_error: t("Errors.invalid_email"),
      })
      .email(t("Errors.invalid_email")),
    password: z
      .string({
        invalid_type_error: t("Errors.invalid_password"),
      })
      .min(6, t("Errors.invalid_password")),
    remember_me: z.any(),
  });

  const parse = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    remember_me: formData.get("remember_me"),
  });

  if (!parse.success) {
    return {
      message: "zod",
      success: false,
      zod_errors: parse.error.flatten().fieldErrors,
    };
  }

  const data = parse.data;

  try {
    const response = await fetch(APIROUTE("loginWithEmail"), {
      method: "POST",
      body: JSON.stringify(pick(data, ["email", "password"])),
      headers: { "Content-Type": "application/json", "accept-language": lang },
    });

    if (!response.ok) {
      return {
        message:
          (await response.json()).error?.details?.message ||
          t("Errors.failed_to_send_message"),
        success: false,
      };
    }

    const response_data = (await response.json()) as any;

    if (!response_data.identifier) {
      throw new Error();
    }

    return {
      message: t("Success.sms_sent"),
      success: true,
      identifier: response_data.identifier,
      ...response_data,
    };
  } catch (error) {
    return { message: t("Errors.failed_to_send_message"), success: false };
  }
}

export async function registerWithPhone(prevState: any, formData: FormData) {
  const t = await getTranslations("messages");

  const lang = await getLocale();

  const schema = z
    .object({
      country_code: z
        .string({
          invalid_type_error: "Invalid country_code",
        })
        .min(1, "Invalid country_code"),
      phone: z
        .string({
          invalid_type_error: t("Errors.invalid_phone_number"),
        })
        .min(1, t("Errors.invalid_phone_number")),
      email: z.string().nullable(),
      accepted_terms: z.boolean().refine((value) => value === true, {
        message: t("Errors.accept_terms"),
      }),
    })
    .refine(
      (data) =>
        data?.country_code === "90" ? true : data?.email?.includes("@"),
      {
        message: t("Errors.invalid_email"),
      },
    );

  const parse = schema.safeParse({
    country_code: formData.get("country_code"),
    phone: (formData.get("phone") as string).replace(/\D/g, ""),
    email: formData.get("email"),
    accepted_terms: formData.get("accepted_terms") === "on" ? true : false,
  });

  if (!parse.success)
    return {
      message: "zod",
      success: false,
      zod_errors: parse.error.flatten().fieldErrors,
      zod_errors2: parse.error.flatten().formErrors?.[0],
    };

  const data = parse.data;

  const cleanedParams = omitBy(data, (value) => isNil(value) || isEmpty(value));

  try {
    const response = await fetch(APIROUTE("registerWithPhone"), {
      method: "POST",
      body: JSON.stringify(
        pick(cleanedParams, ["country_code", "phone", "email"]),
      ),
      headers: { "Content-Type": "application/json", "accept-language": lang },
    });

    if (!response.ok) {
      return {
        message:
          (await response.json()).error?.message ||
          t("Errors.failed_to_send_message"),
        success: false,
      };
    }

    const response_data = (await response.json()) as any;

    if (!response_data.identifier) throw new Error();

    return {
      message: t("Success.registered"),
      success: true,
      identifier: response_data.identifier,
      ...response_data,
    };
  } catch (error) {
    return { message: t("Errors.failed_to_register"), success: false };
  }
}
