import MarkdownHtml from "@/components/markdown-component";
import { Locale } from "@/i18n";
import { getStrapiData } from "@/lib/strapi";
import { notFound } from "next/navigation";
import safeAwait from "safe-await";
import "./style.css";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function _({
  params: { blog_domain, lang },
}: {
  params: { blog_domain: string; lang: Locale };
}) {
  unstable_setRequestLocale(lang);
  const [error, blogs] = await safeAwait(
    getStrapiData(
      "/api/blogs",
      {
        locale: lang,
        filters: {
          domain: blog_domain,
        },
      },
      [`blog_${blog_domain}`],
    ),
  );

  if (error || !blogs) throw new Error();

  if (blogs.data.length === 0) notFound();

  const blog = blogs.data[0];

  return (
    <div>
      <MarkdownHtml content={blog.content} className="ck-content" />;
    </div>
  );
}
