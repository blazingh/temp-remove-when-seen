import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";

export function FullScreenLoader() {
  return (
    <div className='w-screen h-screen flex items-center justify-center z-50'>
      <div className='h-48 flex items-center animate-pulse'>
        <Image src='/Logo-primary-simple.jpg' alt='logo' height={200} width={200} />
      </div>
    </div>
  )
}

export function Loader({className}: {className?: string}) {
  return <div>
    <Loader2Icon className={cn('animate-spin h-10 w-10 text-primary', className)} />
  </div>
}
