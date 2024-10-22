"use client";

import { registerClinic } from "@/actions/authentication";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { Locale } from "@/i18n";
import { getDistricts } from "@/actions/form-regular-data";
import { Separator } from "@/components/ui/separator";
import HidePrivacyPopup from "@/components/ui/hidePrivacyPopup";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/selectClinicRegister";
import { Button } from "@/components/ui/button";
import OtpPopup from "./otpPopup";
import { Loader } from "@/components/ui/loader";
import { cn } from "@/lib/utils";
import countryCodes from "@/constants/countries";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/checkbox";

import termsClinicRegister from "./new_terms_13_may";
const contentFromFile2 = termsClinicRegister;

import privacyClinicRegister from "./privacyClinicRegister";
const privacyContent = privacyClinicRegister;

import usertermsClinicRegister from "./usertermsClinicRegister";
const userTermsContent = usertermsClinicRegister;

interface City {
  domain: any;
  id: number;
  name: string;
  country_id: number;
}

const RegisterForm = ({ cities, lang }: { cities: City[]; lang: Locale }) => {
  const initialState = {
    authorized_name: "",
    district_id: "",
    city_id: "34",
    phone: "",
    submerchant_name: "",
    phone_code: "90",
    email: "",
  };

  const [state, formAction] = useFormState(registerClinic, initialState);
  const [selectedCityId, setSelectedCityId] = useState<any>("");
  const [districts, setDistricts] = useState<any>([]);

  const [request, setRequest] = useState({
    state: "idle",
    message: "",
    data: {},
  });

  useEffect(() => {
    async function fetchDistricts() {
      try {
        const data = await getDistricts(selectedCityId);
        setDistricts(data);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    }

    if (selectedCityId) {
      fetchDistricts();
    } else {
      setDistricts([]);
    }
  }, [selectedCityId]);

  const t = useTranslations("layout.clinicPage") as any;
  return (
    <div>
      <form action={formAction} className={cn("space-y-2")}>
        <div className="w-full flex flex-col items-center justify-center">
          <ul className="text-sm w-full mb-5 font-medium text-center text-gray-500 rounded-lg shadow flex dark:divide-gray-700 dark:text-gray-400">
            <li className="w-full focus-within:z-10">
              <a
                href="https://clinic.distedavim.com/tr"
                className="inline-block w-full p-4 text-white bg-[#7334e0] border-r border-gray-200 rounded-s-lg focus:ring-4 active"
              >
                {t("clinic_reg1_title")}
              </a>
            </li>
            <li className="w-full focus-within:z-10">
              <a
                href="https://clinic.distedavim.com/tr"
                className="inline-block w-full p-4 bg-white border-s-0 rounded-e-lg border-gray-200 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                {t("clinic_reg2_title")}
              </a>
            </li>
          </ul>
          <h1 className="text-2xl font-medium mb-1">{t("clinic_reg1")}</h1>
          <p className="text-sm text-center"> {t("clinic_reg2")}</p>
        </div>
        {/* firm name */}
        <Input
          name="submerchant_name"
          placeholder={t("clinic_reg_input1")}
          className="rounded-lg mt-5 bg-white h-12 text-[#000] placeholder:text-[#000]"
        />

        {/* city */}
        <Select
          name="city_id"
          onValueChange={(e) => {
            setSelectedCityId(e);
            setDistricts([]);
          }}
          //defaultValue={state.cities || '34'}
          defaultValue={state.cities}
        >
          <SelectTrigger placeholder={t("clinic_reg_input2")}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city: City) => (
              <div key={city.domain}>
                <SelectItem value={String(city.domain)}>{city.name}</SelectItem>
              </div>
            ))}
          </SelectContent>
        </Select>

        {/* district */}
        <Select
          name="district_id"
          onValueChange={(value) => {
            state.district_id = value;
          }}
          defaultValue={state.district || undefined}
        >
          <SelectTrigger
            placeholder={t("clinic_reg_input3")}
            disabled={!districts}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {districts.map((district: any) => (
              <div key={district.domain}>
                <SelectItem value={String(district.id)}>
                  {district.name}
                </SelectItem>
              </div>
            ))}
          </SelectContent>
        </Select>
        {/* username */}
        <Input
          placeholder={t("clinic_reg_input4")}
          name="authorized_name"
          className="h-12 rounded-lg"
        />

        <Input
          placeholder={t("clinic_reg_input5")}
          name="email"
          className="h-12 rounded-lg"
        />

        {/* phone and phone_gsm */}
        <div className="grid gap-2 w-full grid-cols-5">
          {/* phone code */}
          <div className="col-span-2 h-12">
            <Select
              name="phone_code"
              onValueChange={(value) => {
                state.phone_code = value;
              }}
              defaultValue={state.phone_code || undefined}
            >
              <SelectTrigger placeholder={t("clinic_reg_input6")}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {countryCodes.map((countryCode) => (
                  <SelectItem
                    value={countryCode.value}
                    className="flex"
                    key={countryCode.value}
                    aria-label={countryCode.label}
                  >
                    <div key={countryCode.value} className="flex items-center">
                      {countryCode.flag}
                      <span className="pl-2 flex items-center">
                        {countryCode.label}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-3">
            <Input
              className="h-12 rounded-lg"
              placeholder={t("clinic_reg_input7")}
              name="phone"
            />
          </div>
        </div>
        {/* checked start terms */}
        <div className="flex gap-3 !mt-[25px] !mb-[10px]">
          <Checkbox
            required
            name="accepted_terms"
            id="accepted_terms"
            className={cn(
              state?.zod_errors?.agreementChecked?.length > 0 &&
              "outline outline-1 outline-destructive-foreground",
            )}
          />
          {lang == "tr" ? (
            <label
              htmlFor="accepted_terms"
              className="text-xs font-poppins text-gray-500 font-normal leading-4"
            >
              <HidePrivacyPopup
                textColor="text-[#7424ff]"
                title="KLİNİK ÇERÇEVE LİSANS SÖZLEŞMESİ"
                privacyPolicyText="Kullanıcı sözleşmesini"
                content={contentFromFile2}
              />{" "}
              okudum anladım ve kabul ediyorum.
            </label>
          ) : (
            <label
              htmlFor="accepted_terms"
              className="text-xs font-poppins text-gray-500 font-normal leading-4"
            >
              <HidePrivacyPopup
                textColor="text-[#7424ff]"
                title="CLINICAL FRAME LICENSE AGREEMENT"
                privacyPolicyText="User agreement"
                content={contentFromFile2}
              />{" "}
              I have read, understood, and agree to.
            </label>
          )}
        </div>

        <div className="flex gap-3 !mt-15">
          <Checkbox
            required
            name="accepted_terms"
            id="accepted_terms"
            className={cn(
              state?.zod_errors?.agreementChecked?.length > 0 &&
              "outline outline-1 outline-destructive-foreground",
            )}
          />

          {lang == "tr" ? (
            <label
              htmlFor="accepted_terms"
              className="text-xs font-poppins text-gray-500 font-normal leading-4"
            >
              <HidePrivacyPopup
                textColor="text-[#7424ff]"
                title="GİZLİLİK POLİTİKASI VE KİŞİSEL VERİLER METNİ"
                privacyPolicyText="Kişisel Verilerimin Gizlilik Politikası ve Kişisel Veriler Metni"
                content={privacyContent}
              />{" "}
              ’nde yer alan kapsamda işlenmesine onay veriyorum.
            </label>
          ) : (
            <label
              htmlFor="accepted_terms"
              className="text-xs font-poppins text-gray-500 font-normal leading-4"
            >
              <HidePrivacyPopup
                textColor="text-[#7424ff]"
                title="PRIVACY POLICY AND PERSONAL DATA TEXT"
                privacyPolicyText="Privacy Policy and Personal Data Text"
                content={privacyContent}
              />{" "}
              I have read and understood.
            </label>
          )}
        </div>

        <div className="flex gap-3 !mt-15">
          <Checkbox
            name="accepted_terms"
            id="accepted_terms"
            className={cn(
              state?.zod_errors?.agreementChecked?.length > 0 &&
              "outline outline-1 outline-destructive-foreground",
            )}
          />

          {lang == "tr" ? (
            <label
              htmlFor="accepted_terms"
              className="text-xs font-poppins text-gray-500 font-normal leading-4"
            >
              <HidePrivacyPopup
                textColor="text-[#7424ff]"
                title="KULLANICI SÖZLEŞMESİ"
                privacyPolicyText="Kullanıcı Sözleşmesi"
                content={userTermsContent}
              />{" "}
              uyarınca, Diştedavim ürün ve hizmetleri ile ilgili olarak tarafıma
              ticari elektronik ileti gönderilmesine onay veriyorum. (İsteğe
              Bağlı)
            </label>
          ) : (
            <label
              htmlFor="accepted_terms"
              className="text-xs font-poppins text-gray-500 font-normal leading-4"
            >
              <HidePrivacyPopup
                textColor="text-[#7424ff]"
                title="USER AGREEMENT"
                privacyPolicyText="User Agreement"
                content={userTermsContent}
              />{" "}
              pursuant to, I consent to receive commercial electronic messages
              related to Diştedavim products and services. (Optional)
            </label>
          )}
        </div>
        {/* checked finish terms */}
        {state?.success === false && (
          <p
            aria-live="polite"
            className="error-paragraph w-full"
            role="status"
          >
            {Object.keys(state?.zod_errors ?? {}).length > 0
              ? state?.zod_errors[Object.keys(state?.zod_errors ?? {})[0]][0]
              : state?.message}
          </p>
        )}

        <Separator />

        {/* form submmit */}
        <div className="flex w-full justify-between">
          <Button
            type="submit"
            disabled={request.state === "loading"}
            className="w-full h-14"
          >
            {request.state === "loading" ? (
              <Loader className="text-white w-6 h-6" />
            ) : (
              t("clinic_reg_button")
            )}
          </Button>
        </div>

        {/* register message */}
        <div className="flex w-full justify-center">
          <p className="text-red-500">{request.message}</p>
        </div>
      </form>
      {state.success ? <OtpPopup identifier={state.identifier} /> : null}
    </div>
  );
};

export default RegisterForm;
