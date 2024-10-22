import { StarsRatingReadOnly } from "@/components/starsRating";
import imageUrlHelper from "@/lib/image/url-helper";
import { formatNumber } from "@/lib/utils";
import { Link } from "@/navigation";
import Clinics from "@/types/public/Clinics";
import Image from "next/image";

export default function ClinicCard({
  href,
  items,
}: {
  href: any;
  items: Clinics;
}) {
  const eLanguages: any = {
    tr: "Tr",
    en: "En",
    ar: "أر",
  };

  return (
    <Link href={href}>
      <div className="w-full min-h-[140px] rounded-md overflow-hidden border flex bg-white">
        {/* clinic image */}
        <div className="relative w-[96px] max-w-[96px] h-full flex items-center flex-shrink-0">
          <Image
            src={imageUrlHelper(items.cover_image, {
              w: 96 * 2,
              h: 140 * 2,
              q: 75,
              fallBackImage: "/clinic-cover-placeholder.webp",
            })}
            alt={items.name}
            className="object-contain"
            width={96}
            height={140}
          />
        </div>
        <div className="flex flex-col gap-1 px-2 py-1">
          {/* title */}
          <p className="text-base font-medium line-clamp-2">{items.name}</p>
          <p className="text-xs font-medium text-[#120c0c]">
            {items.clinic_type?.["tr"] ?? ""}
          </p>

          {/* info */}
          <p className="text-xs font-medium text-[#484848]">
            {items.districts_name}
            {", "}
            {items.spoken_languages?.map((lg: any, index) => (
              <span className="text-xs text-gray-700 mr-2" key={lg}>
                {eLanguages[lg] ?? lg}
                {index !== items.spoken_languages.length - 1 ? " -" : ""}
              </span>
            ))}
          </p>

          {/* score */}
          {items.review_count != 0 && (
            <div className="flex gap-1 items-center event-none">
              <span className="font-bold text-sm text-foreground font-nunito">
                {items.review_rating.slice(0, 3)}
              </span>
              <StarsRatingReadOnly
                reviewScore={parseFloat(items.review_rating)}
              />
              <span className="font-medium text-xs text-[#757575] ">
                ({items.review_count})
              </span>
            </div>
          )}

          {/* treatment price */}
          {items.min_fee !== null && items.max_fee !== null && (
            <div className="block md:flex">
              <div>
                <p className="text-xs md:text-sm font-semibold mr-1">
                  {items.treatment_category_name}:
                </p>
              </div>
              <div>
                <p className="text-xs md:text-sm font-semibold">
                  {items.min_fee == 0 && items.max_fee == 0 ? (
                    "Ücretsiz"
                  ) : items.min_fee == 0 || items.min_fee == null ? (
                    `${formatNumber(items.max_fee)} TL`
                  ) : items.max_fee == 0 || items.max_fee == null ? (
                    `${formatNumber(items.min_fee)} TL`
                  ) : (
                    `${formatNumber(items.min_fee)} - ${formatNumber(items.max_fee)} TL`
                  )}
                </p>

              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
