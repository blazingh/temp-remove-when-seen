"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import IconLocation from "@/icons/location";
import IconGlobal from "@/icons/global";
import { StarsRatingReadOnly } from "@/components/starsRating";
import Clinics from "@/types/public/Clinics";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import imageUrlHelper from "@/lib/image/url-helper";
import { useTranslations } from "next-intl";

const eLanguages: { [key: string]: string } = {
  tr: "Türkçe",
  en: "English",
  ar: "Arabic",
};

export default function ClinicDetailsCard({
  item,
  images,
  lang,
}: {
  item: Clinics;
  images: any[];
  lang: any;
}) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleClickImage = (index: number) => {
    setSelectedImageIndex(index);
    setIsDialogOpen(true);
  };
  const t = useTranslations("layout.clinicPage") as any;
  return (
    <div className="flex flex-col gap-4">
      {/* clinic images */}
      {images.length > 0 && (
        <div className="w-full">
          <ScrollArea className="px-0 w-full whitespace-no-wrap">
            <div className="flex w-full gap-2">
              {images.map((image: any, index: number) => (
                <div
                  data-key={image.id}
                  key={image.id}
                  className="relative h-[130px] w-[130px] border rounded-md overflow-hidden"
                  onClick={() => handleClickImage(index)}
                >
                  <Image
                    data-key={image.id}
                    key={image.id}
                    src={imageUrlHelper(image.src, {
                      w: 130 * 2,
                      h: 130 * 2,
                      q: 75,
                      fallBackImage: "/clinic-cover-placeholder.webp",
                    })}
                    alt={image.alt ?? `${item.name}_${image.id}`}
                    width={130}
                    height={130}
                  />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      )}

      {/* review score */}
      <div className="flex items-center event-none gap-2 ">
        <span className="font-extrabold text-sm">
          {item.review_rating.slice(0, 3)}
        </span>
        <StarsRatingReadOnly reviewScore={parseFloat(item.review_rating)} />
        <a href={`#reviews`}>
          <span className="font-medium text-xs underline">
            ({item.review_count}) {t("review")}
          </span>
        </a>
      </div>

      {/* clinic address */}
      <a href="#map-address">
        <div className="flex w-full gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 32 32"
          >
            <path
              stroke="#000"
              strokeWidth="2.3"
              d="M15.55 29.773c-1.5-1.953-2.835-3.624-3.989-5.068-4.336-5.43-6.182-7.74-6.182-11.707 0-3.037 1.189-5.787 3.11-7.777l.034-.032C10.443 3.219 13.084 2 16 2c2.932 0 5.587 1.231 7.509 3.221 1.923 1.99 3.112 4.74 3.112 7.777 0 3.967-1.845 6.277-6.182 11.707-1.154 1.445-2.49 3.118-3.993 5.073a.557.557 0 01-.895-.005zm3.666-20.105A4.459 4.459 0 0016 8.29a4.459 4.459 0 00-3.216 1.378 4.782 4.782 0 00-1.33 3.33c0 1.3.509 2.478 1.331 3.329a4.447 4.447 0 003.214 1.38c1.244 0 2.37-.516 3.188-1.35l.027-.03a4.78 4.78 0 001.332-3.329c0-1.3-.508-2.478-1.33-3.33z"
            ></path>
          </svg>
          <p className="text-sm text-gray-700 line-clamp-1">{item.address}</p>
        </div>
      </a>

      {/* spoken languages */}
      <div className="flex gap-2">
        <IconGlobal className="w-[16px] h-[16px] text-lg" />
        {item.spoken_languages.map((item: string, index: any) => (
          <p className="text-sm text-gray-700" key={index}>
            {eLanguages[item]}
          </p>
        ))}
      </div>
      <div className="w-full h-full">
        <Dialog open={isDialogOpen} onOpenChange={(o) => setIsDialogOpen(o)}>
          <DialogContent className="w-full">
            <Carousel
              axis="horizontal"
              infiniteLoop={true}
              autoPlay={true}
              swipeable={true}
              selectedItem={selectedImageIndex} // selectedItem prop'unu kullanarak seçilen resmi belirtin
              onChange={setSelectedImageIndex}
            >
              {images.map((image: any) => (
                <div
                  key={image.id}
                  className="w-full border rounded-md flex items-center justify-center "
                >
                  <Image
                    key={image.id}
                    src={imageUrlHelper(image.src, {
                      w: 2000,
                      h: 0,
                      q: 100,
                      fallBackImage: "/clinic-cover-placeholder.webp",
                    })}
                    alt={image.alt ?? `${item.name}_${image.id}`}
                    width={1000}
                    height={1000}
                    style={{ objectFit: "contain", objectPosition: "middle" }}
                    className="aspect-square"
                  />
                </div>
              ))}
            </Carousel>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
