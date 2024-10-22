import { unstable_setRequestLocale } from "next-intl/server";
import { Locale } from "@/i18n";
import MyReviews from "@/components/pages/account/myReviews";

export default function Page({ params }: { params: { lang: Locale } }) {
  unstable_setRequestLocale(params.lang);

  return (
    <div className="px-2 mt-2 mb-4">
<MyReviews lang={params.lang}/>

    </div>
  );
}
