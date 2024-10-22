import { Locale } from "@/i18n";
import SITEROUTES from "@/constants/site_routes";
import IconChevron from "@/icons/chevron";
import { Link } from "@/navigation";
import BackButton from "@/components/layout/backbutton";

type PageProps = {
  params: {
    lang: Locale;
    options: string[];
  };
  children: React.ReactNode;
};

export default function Layout({
  children,
  params: { lang, options },
}: PageProps) {
  return (
    <div className="h-[100svh]">
      <BackButton variant={"child"}>
        <div className="w-full bg-background flex items-center justify-start gap-2 p-2">
          <IconChevron className="rotate-90" />
          <h1 className="text-2xl font-bold">Klinikler</h1>
        </div>
      </BackButton>

      {/* clinics list */}
      {children}

      {/* extra filters */}
      {/* <BottomFilterBar /> */}
    </div>
  );
}
