import MarkdownHtml from "@/components/markdown-component";
import { Locale } from "@/i18n";
import { getStrapiData } from "@/lib/strapi";
import { notFound } from "next/navigation";
import safeAwait from "safe-await";
import "./style.css";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function _({
  params: { treatment_domain, lang },
}: {
  params: { treatment_domain: string; lang: Locale };
}) {
  unstable_setRequestLocale(lang);
  const [error, treatments] = await safeAwait(
    getStrapiData(
      "/api/distedavim-guides",
      {
        locale: lang,
        filters: {
          domain: treatment_domain,
        },
      },
      [`blog_${treatment_domain}`],
    ),
  );

  if (error || !treatments) throw new Error();

  if (treatments.data.length === 0) notFound();

  const treatment = treatments.data[0];

  return (
    <div>
      <MarkdownHtml content={treatment.content} className="ck-content" />;
    </div>
  );
}
