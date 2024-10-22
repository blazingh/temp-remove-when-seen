import Image, { ImageProps } from "next/image";
import imageUrlHelper from "@/lib/image/url-helper";
import { toBase64 } from "@rossbob/image-to-base64";

export default async function LazyImage({
  lazySrc,
  lazyQuality = 10,
  lazyWidth = 10,
  lazyHeigth = 10,
  ...props
}: ImageProps & {
  lazySrc: string;
  lazyQuality?: number;
  lazyWidth?: number;
  lazyHeigth?: number;
}) {
  const imageBase64WithURI =
    lazySrc &&
    (await toBase64({
      uri: imageUrlHelper(lazySrc as string, {
        w: lazyWidth,
        h: lazyHeigth,
        q: lazyQuality,
      }),
    }));

  return (
    <Image
      {...props}
      placeholder="blur"
      blurDataURL={
        imageBase64WithURI ? `data:image/png;base64,${imageBase64WithURI}` : ""
      }
    />
  );
}
