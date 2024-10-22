import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";

export default function NotFoundComponent({
  message,
  description,
  link,
  linkText,
}: {
  message?: string;
  description?: string;
  link?: string;
  linkText?: string;
}) {
  return (
    <div className="w-full h-[100svh] flex flex-col items-center justify-start gap-4">
      <Image src={"/hurt_tooth.svg"} alt="404" width={300} height={300} />
      <h2 className="text-2xl font-bold text-center">
        {message || "Sayfa Bulunamadı"}
      </h2>
      <p>{description || "Aradığın sayfa bulunmadı!"}</p>
      <p className="mt-2 text-center tx-xs">
        {" "}
        10 saniye içerisinde anasayfaya yönlendirileceksin...
      </p>
      <Link href={(link as any) || "/"}>
        <Button variant={"outline"}>{linkText || "Anasayfaya Dön"}</Button>
      </Link>
    </div>
  );
}
