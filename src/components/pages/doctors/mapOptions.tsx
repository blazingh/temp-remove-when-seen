import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import IconTarget from "@/icons/target";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Link } from "@/navigation";
export default function MapOptions() {
  let user;
  user = {
    name: "John Doe",
  };

  return (
    <div className="w-full h-full block">
      <div className="flex pl-8 pr-3 py-5 w-full justify-between">
        <div>
          <p className="text-foreground text-xl">Lokasyon Seç</p>
        </div>
      </div>
      <Separator />
      <Link href={"/doctors/locations" as any}>
        <div className="mt-4">
          <Button
            variant="outline"
            className="w-full bg-white text-dark border-2 border-black"
          >
            <IconTarget className={"mr-2"} />
            Sonuçları Göster (24)
          </Button>
        </div>
      </Link>

      <div className="flex items-center my-5">
        <div className="flex-1 h-px bg-black"></div>
        <div className="mx-4 text-gray-500">Veya Listeden Seç</div>
        <div className="flex-1 h-px bg-black"></div>
      </div>
      <div>
        <Select>
          <SelectTrigger
            className="pl-3 border-2 border-black"
            placeholder={"İl Seç"}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="null" disabled>
              Select a country
            </SelectItem>
            {/* {countries.map((item: any) => (
										<div key={item.id}>
											<SelectItem value={String(item)}>
												{item}
											</SelectItem>
										</div>
									))} */}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-5">
        <Select>
          <SelectTrigger
            className="pl-3 border-2 border-black"
            placeholder={"İlçe Seç"}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="null" disabled>
              Select a country
            </SelectItem>
            {/* {countries.map((item: any) => (
										<div key={item.id}>
											<SelectItem value={String(item)}>
												{item}
											</SelectItem>
										</div>
									))} */}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
