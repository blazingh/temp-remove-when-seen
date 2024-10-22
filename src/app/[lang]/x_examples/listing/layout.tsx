import { Locale } from "@/i18n"

type PageProps = {
  params: {
    lang: Locale
  }
  children: React.ReactNode
}

export default function Layout({
  children,
  params: { lang }
}: PageProps) {
  return (

    <div>
      {/* updated the bread crumb 
      <BreadCrumbs pageTile={ROUTES.blogsList.title[lang]} lang={lang} />
      */}
      <div className="flex flex-col gap-6 mt-4">

        {/* page content */}
        {children}

        {/* add any other static content here */}

      </div>
    </div>
  )
}
