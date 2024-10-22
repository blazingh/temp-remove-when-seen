import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Locale } from "@/i18n";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function parsePath(path: string): { locale: Locale; restOfURL: string } {
  // Define a regular expression to match the language code (2 characters) at the beginning of the path
  const languageRegex = /^\/([a-z]{2})\//;

  // Use the regular expression to match the language code
  const match = path.match(languageRegex);

  // If there is a match, extract the language code and the rest of the URL
  const language = match && (match[1] as Locale);
  const restOfURL = language ? path.replace(languageRegex, "/") : path;
  return { locale: language || "tr", restOfURL };
}
export function timeMinuteConverter(deger: number): string {
  // Değerin 0 ile 1440 arasında olduğundan emin olun.
  if (deger < 0 || deger > 1440) {
    return String(deger);
  }

  // Saat ve dakikayı hesaplayın.
  const saat = Math.floor(deger / 60);
  const dakika = deger % 60;

  // Dönen değeri iki basamaklı hale getirin.
  const ikiBasamak = (sayi: number): string => sayi.toString().padStart(2, "0");

  // Saati ve dakikayı stringe dönüştürün.
  const saatStr = ikiBasamak(saat);
  const dakikaStr = ikiBasamak(dakika);

  // Sonucu geri döndürün.
  return `${saatStr}:${dakikaStr}`;
}
export function phoneReplace(phone: string): string {
  return phone.replace(/\s/g, "").replace("(", "").replace(")", "");
}
export const formatNumber = (number : number) => {
  const integerPart = Math.floor(number);
  const formattedNumber = new Intl.NumberFormat('tr-TR').format(integerPart);
  return formattedNumber;
};
export const formatDate = (isoDate : string) => {
  const date = new Date(isoDate);

  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Aylar 0-11 arasında olduğu için 1 ekliyoruz
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);

  return `${day}/${month}/${year}`;
}