import { Link } from "@/navigation";
import Image from "next/image";

export default function BlogCard({
  href,
  title,
  description,
  category,
  image,
}: {
  href: any;
  title: string;
  description: string;
  category: string;
  image: ImageBaseType;
}) {
  return (
    <Link href={href}>
      <div className="w-full h-[140px] border rounded-md overflow-hidden flex items-start">
        {/* image */}
        <div className="relative w-[96px] h-full flex items-center flex-shrink-0 border">
          <Image
            src={image.url}
            alt={image.alternativeText || "base alt text"}
            width={image.width}
            height={image.height}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col gap-1 p-2">
          {/* title */}
          <p className="text-lg font-semibold line-clamp-2">{title}</p>

          {/* category */}
          <p className="text-sm font-semibold text-[#484848]">
            Kategori: {category}
          </p>

          {/* description */}
          <p className="text-sm font-medium text-[#212121] text-ellipsis line-clamp-2 md:line-clamp-3">
            Açıklama: {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
