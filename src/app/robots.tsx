import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/dev-admin',
    },
    sitemap: 'https://www.distedavim.com/robots.txt',
  }
}