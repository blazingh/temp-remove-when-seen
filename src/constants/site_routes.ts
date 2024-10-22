const SITEROUTES = {
  home: "/" as const,

  clinicPage: "/clinic/[...options]" as const,
  clinicsList: "/clinics/[[...options]]" as const,
  clinicsMap: "/map/clinics" as const,

  dentistPage: "/dentist/[...options]" as const,
  dentistsList: "/dentists/[[...options]]" as const,

  treatmentsList: "/treatments",
  treatmentsCategoryPage: "/treatments/[category_domain]",
  treatmentPage: "/treatments/[category_domain]/[treatment_domain]",


  blogsList: "/blogs",
  blogsCategoryPage: "/blogs/[category_domain]",
  blogPage: "/blogs/[category_domain]/[blog_domain]",

  guidePage: "/smileguide/[...options]" as const,
  guidesPage: "/smileguide" as const,

  userPage: "/account" as const,
  userProfile: "/account/profile" as const,
  userAppointments: "/account/appointments" as const,
  userFavorites: "/account/favorites" as const,
  userReviews: "/account/reviews" as const,
  userQuestions: "/account/questions" as const,
  userNotes: "/account/notes" as const,
  userFiles: "/account/files" as const,
  userHelp: "/account/help" as const,

  appointmentForm: "/appointment/form" as const,
  appointmentVerify: "/appointment/verify" as const,
  appointmentSuccess: "/appointment/success" as const,

  login: "/login" as const,
  register: "/register" as const,
  forgotPassword: "/forgot_password" as const,
  clinciRegister: "/clinic_register" as const,

  privacy: "/privacy" as const,
  policy: "/policy" as const,
  contact: "/contact" as const,
  about: "/about" as const,
  terms: "/terms" as const,
  faq: "/faq" as const,
  help: "/help" as const,
} as const;

export default SITEROUTES;
