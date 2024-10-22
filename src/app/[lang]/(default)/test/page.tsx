import { Link } from "@/navigation";
import Image from "next/image";

export default async function _() {
  const data = await fetch(
    "http://localhost:1337/api/blogs?locale=tr-TR&populate=cover_photo",
    {
      cache: "no-store",
      headers: {
        Authorization:
          "Bearer 26bca26ab450346203b9b0be97ae2c063e32845da2d44e6df20780631d7db12684c73fa4a0e96b8ecab6a0569083614cb740104f07289d93c73a7fcb3f24b2849fb85835d3fd2c081cabcd19aacc2225fd7a2dfd20d07369273b9440506d0b82e2040969621cc8a68e6cbf52193338722a8bdc9fd0a1e74bbba5bf9c54c4fc48",
      },
    },
  ).then((res) => res.json());

  return (
    <div className="flex flex-col gap-4">
      {data.data.map((item: any) => (
        <Link key={item.documentId} href={`/test/${item.documentId}` as any}>
          <div className="border rounded-xl p-4 flex gap-4">
            <div>
              <Image
                alt={item.cover_photo.alternativeText}
                src={"http://localhost:1337" + item.cover_photo.url}
                width={item.cover_photo.width}
                height={item.cover_photo.width}
                className="aspect-square object-cover h-[120px] w-[120px] rounded"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold">{item.title}</p>
              <p className="text-[#313131] text-sm">{item.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
