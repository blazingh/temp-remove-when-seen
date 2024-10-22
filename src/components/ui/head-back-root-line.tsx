"use client";
import ArrowLeftIcon from "@/icons/arrowLeft";
import { usePathname, Link } from "@/navigation";

export default function HeadBackRootLine({}: {}) {
  const pathname = usePathname();
  let routeArr = pathname.split("/");
  routeArr = routeArr.slice(2);
  const backButtonURl = routeArr.slice(0, -1).join("/");

  function concatenateAndSliceArray(arr: any, index: number) {
    let slicedArray = arr.slice(0, index + 1);
    let resultString = slicedArray.join("/");

    return resultString;
  }
  return (
    <div className="flex items-center">
      <div>
        <button className="p-2">
          {routeArr.length > 1 ? (
            <Link href={("/" + backButtonURl) as any}>
              <ArrowLeftIcon />
            </Link>
          ) : (
            <Link href="/">
              <ArrowLeftIcon />
            </Link>
          )}
        </button>
      </div>
      <div className="flex items-center">
        <Link href={"/"} className="">
          <div className="items-center">
            <span className="text-sm text-gray-500">Anasayfa</span>
          </div>
        </Link>
      </div>
      {routeArr.map((clinic: any, index) => (
        <div key={clinic.index}>
          <Link
            href={("/" + concatenateAndSliceArray(routeArr, index)) as any}
            className="item-center flex"
          >
            <div className="items-center">
              <button className="p-1 rotate-180">
                <ArrowLeftIcon className="text-gray-500 w-2 h-2" />
              </button>
            </div>
            <div>
              <span className="text-xs text-gray-500">
                {clinic
                  .split("dt_")
                  .join("Dt.")
                  .split("-")
                  .join(" ")
                  .replace(/\b\w/g, (char: string) => char.toUpperCase())}
              </span>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
