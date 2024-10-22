import { StarsRatingReadOnly } from "@/components/starsRating";
import imageUrlHelper from "@/lib/image/url-helper";
import { Link } from "@/navigation";
import Image from "next/image";

export default function DoctorCard({ item, href }: { item: any; href: any }) {
  const lang = "tr";

  return (
    <Link href={href}>
      <div className="w-full h-[140px] border rounded-md overflow-hidden flex bg-white min-w-[160px]">
        {/* image */}
        <div className="relative w-[96px] max-w-[96px] h-full flex items-center flex-shrink-0">
          <Image
            src={imageUrlHelper(item.cover_image, {
              w: 96 * 2,
              h: 140 * 2,
              q: 75,
              fallBackImage: "/dentist-cover-placeholder.webp",
            })}
            alt={item.name + item.last_name}
            className="object-contain"
            width={96}
            height={140}
          />
        </div>
        <div className="flex flex-col gap-1 p-2">
          {/* title */}
          <p className="text-base font-semibold line-clamp-1">
            {item.degrees?.[lang]} {item.name} {item.last_name}
          </p>
          {/* type */}
          <p className="text-sm font-semibold text-[#484848]">
            {item.branch?.[lang]}
          </p>
          {/* info */}
          <p className="text-sm font-semibold text-[#484848] line-clamp-1">
            {item.clinic_name}, {item.district_name}
          </p>

          {/* score */}
          {item.review_count != 0 && (
            <div className="flex gap-1 items-center event-none">
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
          {/* treatment price */}
          {/* <p className="text-sm font-semibold ">Klinikte Muayene Ücreti: {600} TL</p> */}
        </div>
      </div>
    </Link>
  );
}
