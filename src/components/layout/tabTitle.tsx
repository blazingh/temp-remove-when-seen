"use client";
import { usePathname } from "@/navigation";

export default function PageTitle() {
  const pathname = usePathname();
  let lastDomain = "Anasayfa";
  let routeArr = pathname.split("/");

  if (routeArr.length > 2) {
    routeArr = routeArr.slice(2);
    lastDomain = routeArr.pop() || "Anasayfa";
  }

  return (
    <div className="">
      <div className="px-4 py-1 font-bold">
        <span className="text-2xl font-bold">
          {lastDomain
            .split("dt_")
            .join("Dt.")
            .split("-")
            .join(" ")
            .replace(/\b\w/g, (char: string) => char.toUpperCase())}
        </span>
      </div>
    </div>
  );
}
