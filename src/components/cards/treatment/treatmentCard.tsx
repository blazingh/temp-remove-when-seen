import imageUrlHelper from "@/lib/image/url-helper";
import { formatNumber } from "@/lib/utils";
import { Link } from "@/navigation";
import Treatments from "@/types/public/Treatments";
import Image from "next/image";

export default function TreatmentCard({
  href,
  items,
}: {
  href: any;
  items: Treatments;
}) {
  // edit
  return (
    <Link href={href as any}>
      <div className="w-full h-[140px] border rounded-md overflow-hidden flex ">
        {/* image */}
        <div className="relative w-[96px] max-w-[96px] h-full flex items-center flex-shrink-0">
          <Image
            src={imageUrlHelper(items.cover_image, {
              w: 96 * 2,
              h: 140 * 2,
              q: 75,
              fallBackImage: "/clinic-cover-placeholder.webp",
            })}
            alt={""}
            className="object-contain"
            width={96}
            height={140}
          />
        </div>
        <div className="flex flex-col gap-1 p-2">
          {/* title */}
          <p className="text-base font-medium">{items.name["tr"]}</p>

          {items.relevant_treatment_category && (
            <p className="text-xs font-medium text-[#484848] flex gap-1">
              Kategori:{" "}
              <span className="text-xs font-medium text-foreground sm:w-[65%] sm:relative sm:overflow-hidden sm:text-ellipsis sm:whitespace-nowrap">
                {items.relevant_treatment_category["tr"]}
              </span>
            </p>
          )}

          {items.description && (
            <p className="text-xs font-medium text-[#484848] flex gap-1 w-screen">
              Açıklama:{" "}
              <span className="text-xs font-medium text-foreground sm:w-[65%] sm:relative sm:overflow-hidden sm:text-ellipsis sm:whitespace-nowrap whitespace-nowrap overflow-hidden text-ellipsis w-40 lg:w-1/2">
                {items.description["tr"].replace(/<h1>.*?<\/h1>/g, ' ').replace('<p>', '').replace('</p>', '')}
              </span>
            </p>
          )}

          {/* subtitle */}
          {items.relevant_branches["tr"] && (
            <p className="text-xs font-medium text-[#484848] mt-[-2px]">
              {items.relevant_branches["en"]}
            </p>
          )}

          {items.appointment_count && (
            <p className="text-xs font-medium text-[#484848] flex gap-1">
              Ortalama Randevu Sayısı:{" "}
              <span className="text-xs font-medium text-foreground">
                {items.appointment_count}
              </span>
            </p>
          )}

          {/* avgPrice */}
          {items?.min_fee != null && items?.max_fee != null ? (
            <p className="text-sm font-bold">
              &nbsp;{formatNumber(Number(items.min_fee))} -{" "}
              {formatNumber(Number(items.max_fee))} TL
            </p>
          ) : (
            <p className="text-sm font-bold">&nbsp; &nbsp; -</p>
          )}
        </div>
      </div>
    </Link>
  );
}
