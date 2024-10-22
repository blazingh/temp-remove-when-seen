import { AspectRatio } from "@/components/ui/aspect-ratio";
import Dentists from "@/types/public/Dentists";
import { StarsRatingReadOnly } from "@/components/starsRating";
import Image from "next/image";
import { Locale } from "@/i18n";
import imageUrlHelper from "@/lib/image/url-helper";
import { toBase64 } from "@rossbob/image-to-base64";
import { Link } from "@/navigation";

export default async function FeaturedDoctorCard({
  item,
  href,
  lang,
}: {
  item: Dentists;
  href: any;
  lang: Locale;
}) {
  const imageBase64WithURI =
    item.cover_image &&
    (await toBase64({
      uri: imageUrlHelper(item.cover_image, { w: 10, h: 10, q: 10 }),
    }));

  return (
    <Link href={href as any} className="">
      <div className="w-[167px] min-h-[279px] flex flex-col justify-between gap-2 pb-4 border rounded-md overflow-hidden">
        <div data-id="ftcc-img">
          {/* image */}
          <AspectRatio ratio={1} className="w-[167px]">
            <Image
              src={imageUrlHelper(item.cover_image, {
                w: 167 * 2,
                h: 167 * 2,
                q: 75,
                fallBackImage: "/dentist-cover-placeholder.webp",
              })}
              alt={item.name + item.last_name + item.id}
              placeholder={imageBase64WithURI ? "blur" : "empty"}
              blurDataURL={
                imageBase64WithURI
                  ? `data:image/png;base64,${imageBase64WithURI}`
                  : ""
              }
              width={"167"}
              height={"167"}
            />
          </AspectRatio>
          {/* title */}
          <p className="text-base mt-2 px-2 font-medium text-foreground leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
            {item.degrees[lang]} {item.name} {item.last_name}
          </p>
          <p className="text-sm mt-2 px-2 font-medium text-foreground leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
            {item.branch[lang]}
          </p>
        </div>

        <div className="px-2 flex flex-col gap-1">
          {/* review */}
          {item.review_count != 0 && (
            <div className="flex gap-1 items-center event-none h-min max-h-4">
              <span className="font-bold text-sm text-foreground font-nunito">
                {item.review_rating.slice(0, 3)}
              </span>
              <StarsRatingReadOnly
                reviewScore={parseFloat(item.review_rating)}
              />
              <span className="font-medium text-xs text-[#757575]">
                ({item.review_count})
              </span>
            </div>
          )}

          {/* clinic name */}
          <p className="text-sm text-[#484848] font-semibold mt-1 whitespace-nowrap overflow-hidden text-ellipsis">
            {item["clinic_name"]}
          </p>
        </div>
      </div>
    </Link>
  );
}
