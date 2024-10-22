import LazyImage from "@/components/lazy-image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Locale } from "@/i18n";
import imageUrlHelper from "@/lib/image/url-helper";
import { getTranslations } from "next-intl/server";

export default async function LandingPageHeaderImage(
  { lang }: { lang: string }
) {
  const t = await getTranslations("pages.home");
  return (
    <>
      {/* mobile header imaeg */}
      <div className="md:hidden">
        <AspectRatio
          ratio={343 / 220}
          className="relative overflow-hidden rounded-3xl "
        >
          <LazyImage
            alt="smile-distedavim"
            src={imageUrlHelper(
              t('home_header_image'),
              {
                w: 343 * 4,
                h: 220 * 4,
                q: 100,
              }
            )}

            lazySrc={t('home_header_image')}
            lazyQuality={10}
            lazyWidth={34}
            lazyHeigth={22}
            width={343 * 4}
            height={220 * 4}
            style={{ objectFit: "cover" }}
          />
          {/* <div className="absolute bottom-0 flex items-end left-0 px-4 py-2 text-white w-full bg-gradient-to-t from-[#051A69]/70 h-2/3">
            <div className="block ">
              <h1 className="text-[1.45rem] md:text-[2.1rem] font-bold">
                {t("initial_section.title")}
              </h1>
              <div className="leading-tight text-[1rem] md:text-[1.2rem]">
                {t("initial_section.descup")} <br />{" "}
                {t("initial_section.descin")}
              </div>
            </div>
          </div> */}
        </AspectRatio>
      </div>
      {/* desktop header image */}
      <div className="hidden md:block">
        <AspectRatio
          ratio={1024 / 280}
          className="relative overflow-hidden md:rounded-none"
        >
          <LazyImage
            alt="smile-distedavim"
            src={imageUrlHelper("/public/distedavim_banner_desktop_2_new.png", {
              w: 1024 * 4,
              h: 280 * 4,
              q: 100,
            })}
            lazySrc="/public/distedavim_banner_desktop_2_new.png"
            lazyQuality={10}
            lazyWidth={102}
            lazyHeigth={28}
            width={1024 * 4}
            height={280 * 4}
            style={{ objectFit: "cover" }}
          />
          <div className="absolute top-0 flex items-center justify-start left-0  text-white w-full h-full bg-gradient-to-r from-[#00135A] from-30% to-60%  ">
            <div className="block mx-auto max-w-5xl w-full px-4">
              <h1 className="text-[1.45rem] md:text-[2.1rem] font-bold">
                {t("initial_section.title")}
              </h1>
              <div className="leading-tight text-[1rem] md:text-[1.2rem]">
                {t("initial_section.descup")} <br />{" "}
                {t("initial_section.descin")}
              </div>
            </div>
          </div>
        </AspectRatio>
      </div>
    </>
  );
}
