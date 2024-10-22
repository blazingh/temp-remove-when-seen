type ImageOptions = {
  w?: number
  h?: number
  q?: number
  format?: string
  fallBackImage?: string
}
export default function imageUrlHelper(path?: string | null, options?: ImageOptions) {
  const { width, height, quality, format } = {
    width: options?.w ?? 300,
    height: options?.h ?? 300,
    quality: options?.q ?? 75,
    format: options?.format ?? 'auto',
  }

  if (!path) return options?.fallBackImage ?? ''
  return `https://img.distedavim.com/${path}?width=${width}&height=${height}&quality=${quality}&format=${format}`
}
