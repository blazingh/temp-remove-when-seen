import Image from "next/image";
import { Link } from "@/navigation";

export default async function FeaturedTreatmentCard({
  href,
  image,
  title,
  description,
}: {
  href: any;
  image: ImageBaseType;
  title: string;
  description: string;
}) {
  return (
    <Link href={href}>
      <div className="border rounded-md flex flex-col overflow-hidden w-[167px] h-[267px]">
        <div className="w-full aspect-square bg-gray-200 shrink-0">
          {image && (
            <Image
              src={image.url}
              alt={image.alternativeText || "base alt text"}
              width={image.width * 0.5}
              height={image.height * 0.5}
              className="object-cover w-full h-full"
            />
          )}
        </div>
        <div className="px-2 py-3 pb-4 flex flex-col justify-between h-full">
          <span className="font-semibold leading-[20px] line-clamp-2">
            {title}
          </span>
          <p className="font-medium text-[11px] leading-[14px] text-[#757575] line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
