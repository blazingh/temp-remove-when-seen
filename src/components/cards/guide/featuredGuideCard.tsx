import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Blogs from "@/types/public/Blogs";
import imageUrlHelper from "@/lib/image/url-helper";
import { toBase64 } from "@rossbob/image-to-base64";
import { Link } from "@/navigation";
import { formatNumber } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export default async function FeaturedGuideCard({
  item,
  href,
  lang,
}: {
  item: Blogs;
  href: any;
  lang: string;
}) {
  const imageBase64WithURI =
    item.image?.src &&
    (await toBase64({
      uri: imageUrlHelper(item.image.src, { w: 10, h: 10, q: 10 }),
    }));
  const t = await getTranslations("layout");

  return (
    <Link href={href}>
      {item.image?.src && (
        <div className="w-[167px] min-h-[253px] border rounded-md flex flex-col gap-2 pb-4 overflow-hidden">
          {/* image */}
          <AspectRatio ratio={1} className="w-[167px]">
            <Image
              src={imageUrlHelper(item.image.src, {
                w: 167 * 2,
                h: 167 * 2,
                q: 75,
                fallBackImage:
                  "https://distedavim-user-uploaded-images.s3.amazonaws.com/treatment/treatment-tooth.png",
              })}
              alt={""} // leave this empty to avoid redundant alt
              placeholder={imageBase64WithURI ? "blur" : "empty"}
              blurDataURL={
                imageBase64WithURI
                  ? `data:image/png;base64,${imageBase64WithURI}`
                  : ""
              }
              className="object-cover"
              width={167}
              height={167}
            />
          </AspectRatio>

          {/* title */}
          <p className="text-base px-2 font-medium text-foreground leading-tight min-h-[40px] line-clamp-2">
            {item.title}
          </p>
        </div>
      )}
    </Link>
  );
}
