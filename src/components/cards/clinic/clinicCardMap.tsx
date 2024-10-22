import IconStarEmpty from "@/icons/starEmpty";
import IconStarFilled from "@/icons/starFilled";
import imageUrlHelper from "@/lib/image/url-helper";
import { Link } from "@/navigation";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";

export default function ClinicCard({
  href = "#",
  alt = "",
  src,
  title,
  type,
  city,
  language,
  reviewScore,
  reviewCount,
  treatmentPrice,
}: {
  href?: string;
  alt?: string;
  src: string;
  title: string;
  type: string;
  city: string;
  language: string;
  reviewScore: number;
  reviewCount: number;
  treatmentPrice: string;
}) {
  return (
    <Link href={href as any}>
      <div className="w-[343px] h-[140px] border-red-500 rounded-md overflow-hidden flex mb-4 bg-white">
        {/* image */}
        <div className="relative w-[96px] max-w-[96px] h-full">
          <Image
            src={imageUrlHelper(src)}
            alt={alt}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-1 p-2">
          {/* title */}
          <p className="text-base font-semibold">{title}</p>
          {/* type */}
          <p className="text-sm font-semibold text-[#484848]">{type}</p>
          {/* info */}
          <p className="text-sm font-semibold text-[#484848]">
            {city}, {language}
          </p>
          {/* score */}
          <div className="flex gap-1 items-end event-none">
            <span className="font-bold text-sm text-foreground font-nunito">
              {reviewScore}
            </span>
            <Rating
              allowFraction
              initialValue={reviewScore}
              emptyIcon={<IconStarEmpty className="w-3 h-3 inline" />}
              fillIcon={<IconStarFilled className="w-3 h-3 inline" />}
              onClick={function noRefCheck() {}}
              readonly
            />
            <span className="font-medium text-sm text-[#757575] font-nunito">
              ({reviewCount})
            </span>
          </div>
          {/* treatment price */}
          <p className="text-sm font-semibold ">
            Klinikte Muayene Ücreti: {treatmentPrice} TL
          </p>
        </div>
      </div>
    </Link>
  );
}
