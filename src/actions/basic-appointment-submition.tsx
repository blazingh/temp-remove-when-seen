"use server";
import { authOptions } from "@/lib/auth";
import { isEmpty, isNil, omitBy, pick } from "lodash";
import { getServerSession } from "next-auth";
import { getLocale, getTranslations } from "next-intl/server";
import { z } from "zod";

export async function SubmitAppointment(prevState: any, formData: FormData) {
  const lang = await getLocale();
  const t = await getTranslations("messages");

  const session = await getServerSession(authOptions);

  if (!session?.user) return { message: "session", success: false };

  const schema = z.object({
    passport_no: z
      .string({
        invalid_type_error: t("Errors.invalid_identity_number"),
      })
      .optional()
      .nullable(),
    first_name: z.string(),
    last_name: z.string(),
    reserve_id: z.string(),
    identity_no: z
      .string({
        invalid_type_error: t("Errors.invalid_identity_number"),
      })
      .optional()
      .nullable(),
    birth_date: z
      .string({
        invalid_type_error: t("Errors.invalid_birth_date"),
      })
      .regex(
        /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/,
        t("Errors.invalid_birth_date"),
      ),
    gender: z.enum(["male", "female", "other"], {
      invalid_type_error: t("Errors.invalid_gender"),
    }),
  });

  const parse = schema.safeParse({
    reserve_id: formData.get("reserve_id"),
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    passport_no: formData.get("passport_no"),
    identity_no: formData.get("identity_no"),
    birth_date: formData.get("birth_date"),
    gender: formData.get("gender"),
  });

  if (!parse.success) {
    return {
      message: "zod",
      success: false,
      zod_errors: parse.error.flatten().fieldErrors,
    };
  }

  const data = parse.data;

  const cleanedData = omitBy(data, (value) => isNil(value) || isEmpty(value));

  const raquestData = pick(cleanedData, [
    "identity_no",
    "passport_no",
    "birth_date",
    "gender",
  ]);

  const fetchbody = {
    client_details: {
      ...raquestData,
    },
  };

  if (!cleanedData.passport_no && cleanedData.identity_no)
    try {
      const requestBody = {
        tc_number: cleanedData.identity_no,
        name: cleanedData.first_name,
        surname: cleanedData.last_name,
        birth_year: cleanedData.birth_date?.split("-")[0],
      };

      const response = await fetch(
        process.env.NEXT_PUBLIC_API_BASE_URL +
          "/api-patients/auth/confirm-citizen",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        },
      );
      const result = await response.json();
      if (!result) throw Error();
    } catch (error) {
      const message =
        lang === "en"
          ? "Validation failed. Name, surname, ID number, and birth date do not match!"
          : "Doğrulama başarısız. Ad, soyad, TC kimlik numarası ve doğum tarihi eşleşmiyor!";
      return {
        message: "zod",
        success: false,
        zod_errors: { identity_no: [message] },
      };
    }

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        "/api-appointments/v2/appointment/book/" +
        data.reserve_id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session?.user?.tokens.accessToken,
        },
        body: JSON.stringify(fetchbody),
      },
    );

    if (!response.ok)
      return {
        message:
          (await response.json()).error?.message ||
          t("Errors.failed_to_send_message"),
        success: false,
      };

    const response_data = await response.json();

    return { message: t("Success.sms_sent"), success: true, ...response_data };
  } catch (error) {
    return { message: t("Errors.failed_to_send_message"), success: false };
  }
}
