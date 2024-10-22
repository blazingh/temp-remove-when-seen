import { Locale } from "@/i18n";
import { CrustyBreadCrumbSetter } from "@/components/crusty-bread-crumb";
import safeAwait from "safe-await";
import { getStrapiData } from "@/lib/strapi";
import { notFound } from "next/navigation";
import SITEROUTES from "@/constants/site_routes";
import { unstable_setRequestLocale } from "next-intl/server";
import { getPathname } from "@/navigation";
import { ROUTES } from "@/constants/routes";
import ld from "lodash";

type PageProps = {
  params: {
    lang: Locale;
    blog_domain: string;
    category_domain: string;
  };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: PageProps) {
  return {
    title: ROUTES.blogsList.title[params.lang],
    description: ROUTES.blogsList.description[params.lang],
    alternates: {
      canonical: getPathname({
        href: {
          pathname: SITEROUTES.blogPage,
          params: { ...ld.pick(params, ["blog_domain", "category_domain"]) },
        },
        locale: params.lang,
      }),
      languages: {
        en: getPathname({
          href: {
            pathname: SITEROUTES.blogPage,
            params: { ...ld.pick(params, ["blog_domain", "category_domain"]) },
          },
          locale: "en",
        }),
        tr: getPathname({
          href: {
            pathname: SITEROUTES.blogPage,
            params: { ...ld.pick(params, ["blog_domain", "category_domain"]) },
          },
          locale: "tr",
        }),
      },
    },
  };
}

export async function generateStaticParams({
  params: { lang, category_domain },
}: any) {
  const [error, blogs] = await safeAwait(
    getStrapiData("/api/blogs", {
      locale: lang,
      filters: {
        blogs_categories: {
          domain: category_domain,
        },
      },
    }),
  );
  if (error || !blogs) throw new Error();

  return blogs.data.map((blog: any) => ({
    blog_domain: blog.domain,
  }));
}

export default async function Layout({
  children,
  params: { lang, blog_domain },
}: PageProps) {
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
      <CrustyBreadCrumbSetter
        crumb={{
          label: blog.title,
          href: {
            pathname: SITEROUTES.blogPage,
            params: { blog_domain },
          },
        }}
        index={3}
      />

      {children}
    </div>
  );
}
