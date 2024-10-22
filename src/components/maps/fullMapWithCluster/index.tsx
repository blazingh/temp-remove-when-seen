
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

const FullMapWithCluster = dynamic(() => import('./none-ssr-map'), {
  loading: () => <Skeleton className='h-full w-full bg-gray-300' />,
  ssr: false,
});

export default FullMapWithCluster;
