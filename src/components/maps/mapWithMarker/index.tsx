import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

const MapRawWithMarker = dynamic(() => import('./none-ssr-map'), {
  loading: () => <Skeleton className='h-[136px] w-full' />,
  ssr: false,
});

export default MapRawWithMarker;
