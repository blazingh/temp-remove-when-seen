'use client';

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import IconStarEmpty from "@/icons/starEmpty";
import IconStarFilled from "@/icons/starFilled";
import Image from "next/image";
import IconLocation from "@/icons/location"
import IconGlobal from "@/icons/global"
import { Rating } from "react-simple-star-rating";
const imageArr = [
    'x', 'y', 'z', 't', 'l'
]
type Language = 'tr' | 'en';

type ELanguagesType = {
    tr: string;
    en: string;
};

const eLanguages: ELanguagesType = {
    tr: 'Türkçe',
    en: 'English'
};
export default function ClinicsPhoto(
    {
        reviewScore,
        clinicImages,
        clinicAdress,
        spokenLanguages
    }: {
        reviewScore: number
        clinicImages: string[]
        spokenLanguages: Language[]
        clinicAdress: string
    }
) {

    return (
        <div className="block">
            <div className="flex w-full">
                <div className="flex w-full">
                    <ScrollArea className="px-0 w-full whitespace-no-wrap">
                        {clinicImages && clinicImages.length > 0 ? (
                            <div className="flex w-full items-between justify-between">
                                {clinicImages.map((item: any, index: any) => (
                                    <div key={index} className="relative h-[140px] w-[96px] border rounded-md mr-4">
                                        <Image
                                            src={item.src || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmNF_afhaOLDxeKPhXHHfIpuBoNPx5Cty7byV5jPfLlhOcO9haAxAliwprKFhTlKfT-nY&usqp=CAU'}
                                            alt={item.alt || ''}
                                            fill
                                            className="object-cover rounded-md"
                                        />
                                    </div>
                                ))}
                                {clinicImages.map((item: any, index: any) => (
                                    <div key={index} className="relative h-[140px] w-[96px] border rounded-md mr-4">
                                        <Image
                                            src={item.src || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmNF_afhaOLDxeKPhXHHfIpuBoNPx5Cty7byV5jPfLlhOcO9haAxAliwprKFhTlKfT-nY&usqp=CAU'}
                                            alt={item.alt || ''}
                                            fill
                                            className="object-cover rounded-md"
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex w-full justify-between items-between">
                                {[1, 2, 3, 4, 5].map((placeholder, index) => (
                                    //Skeleton oluşturuculacak şuanki acemice
                                    <div key={index} className="relative h-[140px] w-[96px] border rounded-md mr-4 bg-slate-200">
                                    </div>
                                ))}
                            </div>
                        )}

                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>

                </div>
            </div>
            <div className="block w-auto ">
                <div className="flex items-end event-none">
                    <div>
                        <span className="font-extrabold text-sm mx-2">{reviewScore}</span>
                        <Rating
                            allowFraction
                            initialValue={reviewScore}
                            emptyIcon={<IconStarEmpty className="w-3 h-3 inline mr-1" />}
                            fillIcon={<IconStarFilled className="w-3 h-3 inline mr-1" />}
                            onClick={function noRefCheck() { }}
                            readonly
                        />
                    </div>
                    <div className="px-2">
                        <span className="font-medium text-xs underline">57 değerlendirme</span>
                    </div>
                </div>
                <div className="flex mt-2 w-full">
                    <IconLocation className="w-[16px] h-[16px] mr-2 text-lg" />
                    {clinicAdress && (
                        <p className="text-sm text-gray-700">
                            {clinicAdress.length > 40 ? `${clinicAdress.substring(0, 40)}...` : clinicAdress}
                        </p>
                    )}
                    {clinicAdress && (
                        <p className="text-[12px] underline ml-2">Adres Detay</p>
                    )}
                </div>

                <div className="flex mt-2">
                    <IconGlobal className="w-[16px] h-[16px] mr-2 text-lg" />{spokenLanguages.map((item: Language, index: any) => (<p className="text-sm text-gray-700" key={index}>{eLanguages[item]}</p>))}
                </div>
            </div>
        </div>
    );
}