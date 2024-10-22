import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

const MapRawWithMarkerActive = dynamic(() => import("./none-ssr-map"), {
  loading: () => <Skeleton className="h-[136px] w-full" />,
  ssr: false,
});

export default MapRawWithMarkerActive;
