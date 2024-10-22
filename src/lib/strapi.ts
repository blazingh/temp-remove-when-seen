import qs from "qs";

export async function getStrapiData(
  path: string,
  query?: Object,
  tags?: string[],
) {
  const env = process.env.NODE_ENV;

  const baseUrl = "https://editor.distedavim.com";
  const url = new URL(path, baseUrl);
  const pathQuery = qs.stringify(query);

  url.search = pathQuery;

  const res = await fetch(url.href, {
    // remove cach when in development
    cache: env === "development" ? "no-store" : undefined,
    next: { tags },
  });
  const data = await res.json();

  if (data.error) throw new Error(data.error);

  return data;
}
