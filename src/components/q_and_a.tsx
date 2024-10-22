import Image from "next/image"

export function QandAmessage(
  {
    message,
    owner,
    initals,
    date
  }: {
    message: string,
    owner: string,
    initals?: string,
    date: string
  }
) {
  return (
    <div className="flex w-full justify-end items-end gap-2">
      <div className="flex flex-col gap-2 bg-[#F6FFF9] border border-[#DFF7E9] rounded-lg p-4 relative">
        <span className="text-foreground text-right">{message}</span>
        <div className="flex gap-2 items-center justify-between">
          <span className="text-xs font-semibold text-[#919191]">{owner}</span>
          <span className="text-[10px] font-thin text-[#919191]">{date}</span>
        </div>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 -right-2 z-10">
          <path d="M5.19028 1.18978L12.2814 5.14032L1.01722 9.11787L5.19028 1.18978Z" fill="#F5FFF9" stroke="#DFF7E9" />
        </svg>
      </div>
      <div className="rounded-full w-[24px] h-[24px] bg-[#F6FFF9] border border-[#DFF7E9] flex items-center justify-center font-bold text-xs">
        {initals ?? owner[0]}
      </div>
    </div>
  )
}

export function QandAanswer(
  {
    message,
    owner,
    initals,
    image,
    date
  }: {
    message: string,
    owner: string,
    initals?: string,
    image?: string,
    date: string
  }
) {
  return (
    <div className="flex w-full justify-start items-end gap-2">
      {image && <Image src={image} alt={owner} className="w-[24px] h-[24px] rounded-full" width={24} height={24} />}
      {!image && initals && (
        <div className="rounded-full w-[24px] h-[24px] bg-[#F9F9F9] border border-[#F4F4F4] flex items-center justify-center font-bold text-xs">
          {initals ?? owner[0]}
        </div>
      )}
      <div className="flex flex-col gap-2 bg-[#F9F9F9] border border-[#F4F4F4] rounded-lg p-4 relative">
        <span className="text-foreground text-left">{message}</span>
        <div className="flex gap-2 items-center justify-between">
          <span className="text-xs font-semibold text-[#919191]">{owner}</span>
          <span className="text-[10px] font-thin text-[#919191]">{date}</span>
        </div>
        <svg width="21" height="11" viewBox="0 0 21 11" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 -left-2 z-10">
          <path d="M7.64283 1.16823L18.5409 10.1735L1.56473 8.86745L7.64283 1.16823Z" fill="#F4F4F4" stroke="#F4F4F4" />
        </svg>
      </div>
    </div>
  )
}
