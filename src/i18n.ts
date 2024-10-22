import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { LocalePrefix, Pathnames } from "next-intl/routing";

export const locales = ["tr", "en"] as const;

export const defaultLocale = "tr";

export const localePrefix = "as-needed" satisfies LocalePrefix;

export type Locale = (typeof locales)[number];

export const pathnames = {
  "/": "/",

  /* clinics pages */
  "/clinic/[...options]": {
    tr: "/klinik/[...options]",
    en: "/clinic/[...options]",
  },
  "/clinics/[[...options]]": {
    tr: "/klinikler/[[...options]]",
    en: "/clinics/[[...options]]",
  },
  "/map/clinics": {
    tr: "/harita/klinikler",
    en: "/map/clinics",
  },

  /* dentists pages */
  "/dentist/[...options]": {
    tr: "/dis-hekim/[...options]",
    en: "/dentist/[...options]",
  },
  "/dentists/[[...options]]": {
    tr: "/dis-hekimleri/[[...options]]",
    en: "/dentists/[[...options]]",
  },

  /* treatmtens pages */
  // "/treatment/[...options]": {
  //   tr: "/tedavi/[...options]",
  //   en: "/treatment/[...options]",
  // },
  // "/treatments/[[...options]]": {
  //   tr: "/tedaviler/[[...options]]",
  //   en: "/treatments/[[...options]]",
  // },
  "/treatments": {
    tr: "/tedaviler",
    en: "/treatments",
  },
  "/treatments/[category_domain]": {
    tr: "/tedaviler/[category_domain]",
    en: "/treatments/[category_domain]",
  },
  "/treatments/[category_domain]/[treatment_domain]": {
    tr: "/tedaviler/[category_domain]/[treatment_domain]",
    en: "/treatments/[category_domain]/[treatment_domain]",
  },

  /* guides pages */
  "/smileguide/[...options]": {
    tr: "/gulusrehberi̇/[...options]",
    en: "/smileguide/[...options]",
  },
  "/smileguides": {
    tr: "/gulusrehberi̇",
    en: "/smileguide",
  },

  /* blogs pages */
  "/blogs": {
    tr: "/bloglar",
    en: "/blogs",
  },
  "/blogs/[category_domain]": {
    tr: "/bloglar/[category_domain]",
    en: "/blogs/[category_domain]",
  },
  "/blogs/[category_domain]/[blog_domain]": {
    tr: "/bloglar/[category_domain]/[blog_domain]",
    en: "/blogs/[category_domain]/[blog_domain]",
  },

  /* users pages */
  "/account": {
    tr: "/hesap",
    en: "/account",
  },
  "/account/profile": {
    tr: "/hesap/profil",
    en: "/account/profile",
  },
  "/account/appointments": {
    tr: "/hesap/randevularim",
    en: "/account/appointments",
  },
  "/account/favorites": {
    tr: "/hesap/favorilerim",
    en: "/account/favorites",
  },
  "/account/reviews": {
    tr: "/hesap/yorumlarim",
    en: "/account/reviews",
  },
  "/account/questions": {
    tr: "/hesap/sorularim",
    en: "/account/questions",
  },
  "/account/notes": {
    tr: "/hesap/notlarim",
    en: "/account/notes",
  },
  "/account/files": {
    tr: "/hesap/dosyarlarim",
    en: "/account/files",
  },
  "/account/help": {
    tr: "/hesap/yardim",
    en: "/account/help",
  },

  /* appointment pages */
  "/appointment/form": {
    tr: "/appointment/form",
    en: "/appointment/form",
  },
  "/appointment/verify": {
    tr: "/appointment/verify",
    en: "/appointment/verify",
  },
  "/appointment/success": {
    tr: "/appointment/success",
    en: "/appointment/success",
  },

  /* auth pages */
  "/login": {
    tr: "/giris",
    en: "/login",
  },
  "/clinic_register": {
    tr: "/klinik_kayit",
    en: "/clinic_register",
  },
  "/register": {
    tr: "/kayit",
    en: "/register",
  },
  "/forgot_password": {
    tr: "/forgot_password",
    en: "/sifremi_unuttum",
  },

  /* common pages */
  "/privacy": {
    tr: "/gizlilik",
    en: "/privacy",
  },
  "/policy": {
    tr: "/politikamiz",
    en: "/policy",
  },
  "/contact": {
    tr: "/iletisim",
    en: "/contact",
  },
  "/about": {
    tr: "/hakkimizda",
    en: "/about",
  },
  "/terms": {
    tr: "/kullanim_kosullari",
    en: "/terms",
  },
  "/faq": {
    tr: "/sss",
    en: "/faq",
  },
  "/help": {
    tr: "/yardim",
    en: "/help",
  },
} satisfies Pathnames<typeof locales>;

export default getRequestConfig(async ({ locale: _locale }) => {
  // Validate that the incoming `locale` parameter is valid
  const locale = locales.includes(_locale as any) ? _locale : defaultLocale;

  return {
    messages: {
      forms: (await import(`./dictionaries/${locale}/forms.json`)).default,

      messages: (await import(`./dictionaries/${locale}/res_messages.json`))
        .default,

      pages: (await import(`./dictionaries/${locale}/pages.json`)).default,

      layout: (await import(`./dictionaries/${locale}/layout.json`)).default,

      components: (await import(`./dictionaries/${locale}/components.json`))
        .default,

      sheets: (await import(`./dictionaries/${locale}/sheets.json`)).default,
    },
  };
});
