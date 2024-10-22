
import { Locale } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import MyQuestions from "@/components/pages/account/myQuestions";



export default async function Page(
  {
    params: { lang }
  }: {
    params: { lang: Locale };
  }
) {

  unstable_setRequestLocale(lang);
  

  return (
        <div className="w-full">
<MyQuestions lang={lang}/>
        </div>
    );
}
