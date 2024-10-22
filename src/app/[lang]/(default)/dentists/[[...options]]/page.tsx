import { Locale } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import Loading from "./loading";
import DentistsList from "@/server-components/dentists-list";

type PageProps = {
  params: {
    lang: Locale;
    options: string[] | undefined;
  };
  searchParams: {
    [key: string]: string;
  };
};

export const revalidate = 0;

export default function Page({
  params: { lang, options },
  searchParams,
}: PageProps) {
  unstable_setRequestLocale(lang);

  // get the filtering options from the params
  const [branch, city, district] = options || [];

  const queryOptions = {
    branch_ids: !branch || branch === "tumu" ? undefined : [branch],
    city: city === "tumu" ? "all" : city,
    district_domain: !district || district === "tumu" ? undefined : district,
    ...searchParams,
  } as { [key: string]: any };

  const uniqueKey = Object.entries(queryOptions)
    .map(([_, value]) => `${value}`)
    .join("&");

  return (
    <Suspense key={uniqueKey} fallback={<Loading />}>
      <DentistsList queryOptions={queryOptions} />
    </Suspense>
  );
}
