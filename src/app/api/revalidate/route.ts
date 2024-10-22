import { getStrapiData } from "@/lib/strapi";
import { revalidatePath, revalidateTag, unstable_noStore } from "next/cache";
import type { NextRequest } from "next/server";
import safeAwait from "safe-await";

export async function POST(request: NextRequest) {
  unstable_noStore();
  const { model, entry } = await request.json();

  if (!model || !entry)
    return Response.json({ revalidated: false, now: Date.now() });

  switch (model) {
    case "blog":
      if (!(await revalidateBlogById(entry.id)))
        return Response.json({ revalidated: false, now: Date.now() });
      break;
    case "blogs-categorie":
      if (!(await revalidateBlogByCategoryid(entry.id)))
        return Response.json({ revalidated: false, now: Date.now() });
      break;
    case "distedavim-guide":
      if (!(await revalidateGuidsById(entry.id)))
        return Response.json({ revalidated: false, now: Date.now() });
      break;
    default:
      break;
  }

  return Response.json({
    revalidated: true,
    now: Date.now(),
  });
}

async function revalidateGuidsById(id: string) {
  const [error, guides] = await safeAwait(
    getStrapiData("/api/distedavim-guides", {
      filters: { id },
    }),
  );
  if (error || !guides || guides.data.length === 0) return false;
  revalidatePath("/smileguide");
  revalidatePath("/gulusrehberi̇");
}

async function revalidateBlogById(id: string) {
  const [error, blogs] = await safeAwait(
    getStrapiData("/api/blogs", {
      filters: { id },
      populate: { blogs_categories: { fields: ["domain"] } },
    }),
  );
  if (error || !blogs || blogs.data.length === 0) return false;
  blogs.data.forEach((blog: any) => {
    revalidateTag(`blog_${blog.domain}`);
  });
  revalidateTag(`blog_cat_${blogs.data[0].blogs_categories.domain}`);
  return true;
}

async function revalidateBlogByCategoryid(id: string) {
  const [error, categories] = await safeAwait(
    getStrapiData("/api/blogs-categories", {
      filters: { id },
    }),
  );
  if (error || !categories || categories.data.length === 0) return false;
  categories.data.forEach((category: any) => {
    revalidateTag(`blog_cat_${category.domain}`);
  });
  revalidateTag(`blogs_list`);
  return true;
}
