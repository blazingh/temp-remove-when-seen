import PersonIcon from "@/icons/personIcon";
import IconVerify from "@/icons/verifyIcon";
import {
  getDTPosDataDentist,
  getDTPosDataTransaction,
} from "@/app/[lang]/(default)/actions";
import { Skeleton } from "@/components/ui/skeleton";

export default async function DataShowCast({ }: {}) {
  const dentistCount = await getDTPosDataDentist();
  const transactionCount = await getDTPosDataTransaction();

  const dataArray = [
    {
      title: dentistCount,
      desc: "Dişhekimi",
      icon: <PersonIcon className="w-8 h-8 text-foreground flex-shrink-0" />,
    },
    {
      title: transactionCount,
      desc: "Onaylı İşlem",
      icon: <IconVerify className="w-7 h-7 text-foreground flex-shrink-0" />,
    },
  ];

  return (
    <div className="w-full flex gap-3">
      {dataArray.map((data) => (
        <div
          key={data.desc}
          className="flex bg-[#F9F7FF] w-full py-3 rounded-2xl border br-1 items-center justify-center gap-3"
        >
          {data.icon}
          <div className="flex flex-col ">
            <span className="font-bold leading-[14px] ">{Number(data.title).toLocaleString('tr-TR')}</span>
            <span className="font-medium text-sm ">{data.desc}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DataShowCastSkeleton() {
  return (
    <div className="w-full flex gap-3">
      {Array.from({ length: 2 }, (_, i) => (
        <div
          key={i}
          className="flex bg-[#F9F7FF] w-full py-3 rounded-2xl border br-1 items-center justify-center gap-3"
        >
          <Skeleton className="w-8 h-8 rounded-2xl" />
          <div className="flex flex-col ">
            <Skeleton className="w-16 h-4 rounded-2xl" />
            <Skeleton className="w-16 h-3 rounded-2xl mt-1" />
          </div>
        </div>
      ))}
    </div>
  );
}
