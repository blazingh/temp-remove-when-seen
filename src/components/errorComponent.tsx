import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ErrorComponent(
  {
    message,
    description,
    resetText,
    reset,
  }: {
    message?: string;
    description?: string;
    resetText?: string;
    reset: () => void
  }) {

  return (
    <div className='w-full h-[100svh] flex flex-col items-center justify-start gap-4'>
      <Image src={'/falling_tooth.svg'} alt="404" width={300} height={300} />
      <h2 className='text-2xl font-bold text-center'>{message || 'Something went wrong'}</h2>
      <p>{description || 'The Request has failed'}</p>
      <Button variant={'default'} onClick={reset}>
        {resetText || 'oops, try again'}
      </Button>
    </div>
  )
}
