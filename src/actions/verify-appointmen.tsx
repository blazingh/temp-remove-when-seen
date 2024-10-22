"use server";
import { isEmpty, isNil, omitBy, pick } from "lodash";
import { getTranslations } from "next-intl/server";
import { z } from "zod";

export async function VerifyAppointment(prevState: any, formData: FormData) {
  const t = await getTranslations("messages");

  const schema = z.object({
    id: z.string(),
    date: z.string(),
    startedMinute: z.string(),
    phone: z
      .string({
        invalid_type_error: t("Errors.invalid_phone_number"),
      })
      .min(10, t("Errors.invalid_phone_number")),
    country_code: z.string({
      invalid_type_error: "Invalid country_code",
    }),
    name: z.string({
      invalid_type_error: t("Errors.invalid_name"),
      required_error: t("Errors.invalid_name"),
    }),
    last_name: z.string({
      invalid_type_error: t("Errors.invalid_surname"),
      required_error: t("Errors.invalid_surname"),
    }),
    appointment_type: z.string({
      invalid_type_error: t("Errors.invalid_appointment"),
      required_error: t("Errors.invalid_appointment"),
    }),
    email: z
      .string({
        invalid_type_error: t("Errors.invalid_email"),
      })
      .email(t("Errors.invalid_email"))
      .nullable(),
    accepted_terms: z.enum(["on"], {
      invalid_type_error: t("Errors.accept_terms"),
    }),
    lastSumbit: z.any(),
  });

  const parse = schema.safeParse({
    id: formData.get("id"),
    date: formData.get("date"),
    startedMinute: formData.get("startedMinute"),
    phone: (formData.get("phone") as string).replace(/\D/g, ""),
    country_code: formData.get("country_code"),
    name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email"),
    appointment_type: formData.get("appointment_type"),
    accepted_terms: formData.get("accepted_terms"),
  });

  if (!parse.success) {
    return {
      message: "zod",
      success: false,
      zod_errors: parse.error.flatten().fieldErrors,
    };
  }

  const data = parse.data;
  const cleanedClient = omitBy(data, (value) => isNil(value) || isEmpty(value));

  const raquestData = {
    day: data.date,
    start_min: Number(data.startedMinute),
    appointment_type: data.appointment_type,
    client: pick(cleanedClient, [
      "name",
      "last_name",
      "email",
      "phone",
      "country_code",
    ]),
  };

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        "/api-appointments/v2/appointment/reserve/" +
        data.id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(raquestData),
      },
    );

    if (!response.ok)
      return {
        message:
          (await response.json()).error?.message ||
          t("Errors.failed_to_send_message"),
        success: false,
      };

    const response_data = (await response.json()) as any;

    if (!response_data.identifier) throw new Error();

    const neDate = new Date();
    return {
      message: t("Success.sms_sent"),
      success: true,
      identifier: response_data.identifier,
      ...response_data,
      lastSubmit: neDate.getTime(),
    };
  } catch (error) {
    return { message: t("Errors.failed_to_send_message"), success: false };
  }
}
