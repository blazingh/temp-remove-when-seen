import imageUrlHelper from '@/lib/image/url-helper';
import { formatNumber } from '@/lib/utils';
import Image from 'next/image';
const imageArr = ['x', 'y', 'z', 't', 'l'];

export default function TreatmentDetailCard({
  item
}: {
  item: any
}) {
  return (
    <div className="w-full h-[140px]  overflow-hidden flex">
      {/* image */}
      <div className="relative w-[96px] h-full border rounded-md">
        <Image
          src={imageUrlHelper(item.cover_image, { w: 96 * 2, h: 140 * 2, q: 75, fallBackImage: 'https://distedavim-user-uploaded-images.s3.amazonaws.com/treatment/Ekran+Resmi+2024-02-22+17.59.53.png' })}
          alt={'deneme'} //TODO Tüm altları db den al
          fill
          className="object-cover rounded-md"
        />
      </div>

      <div className="block w-auto pl-4">
        <div className="flex mt-2">
          <p className="text-sm text-gray-700">Düzenleyen: <b>distedavim</b></p>
          <p className="text-sm font-bold">{item.editor_name} {item.editor_last_name}</p>
        </div>
        <div className="flex mt-2">
          <p className="text-sm text-gray-700">Düzenlenme Tarihi:</p>
          <p className="text-sm font-bold"> &nbsp; {new Date(item.updated_at).toLocaleDateString('tr-TR')}</p>
        </div>

        {item.appointment_count && (
          <div className="flex mt-2">
            <p className="text-sm text-gray-700">
              Ortalama Randevu Sayısı:
            </p>
            <p className="text-sm font-bold">&nbsp; {item.appointment_count}</p>
          </div>
        )}



        <div className="flex mt-2">
          <p className="text-sm text-gray-700">
            Ortalama Tedavi Ücreti:
          </p>
          {item?.min_fee != null && item?.max_fee != null ? (
            <p className="text-sm font-bold">
              &nbsp;{formatNumber(item.min_fee)} - {formatNumber(item.max_fee)} TL
            </p>
          ) : (
            <p className="text-sm font-bold">
              &nbsp; &nbsp; -
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
