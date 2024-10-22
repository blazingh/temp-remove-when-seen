import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { APIROUTE } from "@/constants/api_routes";
import { Locale } from "@/i18n";
import { getStrapiData } from "@/lib/strapi";
import Image from "next/image";
import safeAwait from "safe-await";

export default async function _({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const [error1, treatmentsCats] = await safeAwait(
    (async function () {
      const res = await fetch(APIROUTE("getTraetmentsCatergories"));
      return (await res.json()) as any[];
    })(),
  );

  const [error2, guides] = await safeAwait(
    getStrapiData("/api/distedavim-guides", {
      locale: lang,
      populate: {
        cover_image: { fields: ["alternativeText", "width", "height", "url"] },
      },
    }),
  );

  if (error1 || error2 || !treatmentsCats || !guides)
    return "dude! where is my data?";

  return (
    <div className="flex flex-col gap-8 mt-6">
      {treatmentsCats
        //filter the treatments that does not have any guides
        .filter((item) =>
          guides.data.some(
            (item2: any) => item2.treatment_category === String(item.id),
          ),
        )
        .map((item) => (
          <div key={item.id}>
            <h2 className="font-bold text-xl mb-4">{item.name[lang]}</h2>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent>
                {guides.data
                  .filter(
                    (item2: any) =>
                      String(item.id) === item2.treatment_category,
                  )
                  .map((item2: any) => (
                    <CarouselItem key={item2.id} className="basis-[167px] mr-4">
                      <div className="border rounded-md flex flex-col overflow-hidden">
                        <div className="w-full aspect-square bg-gray-200">
                          {item2.cover_image && (
                            <Image
                              src={item2.cover_image.url}
                              alt={
                                item2.cover_image.alternativeText ||
                                "base alt text"
                              }
                              width={item2.cover_image.width}
                              height={item2.cover_image.height}
                              className="object-cover w-full h-full"
                            />
                          )}
                        </div>
                        <span className="font-semibold p-2">{item2.title}</span>
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        ))}
    </div>
  );
}
