import { MetadataRoute } from 'next'
import { APIROUTE } from '@/constants/api_routes'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  
    // response api waiting
    // const response = await fetch(APIROUTE('getClinicsList'), {
    //     method: 'POST',
    // });
    // console.log(response.ok); 

  return [
    {
      url: 'https://distedavim.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://distedavim.com/klinikler',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://distedavim.com/dis-hekimleri',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: 'https://distedavim.com//login',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://distedavim.com/clinic_register',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: 'https://distedavim.com/gizlilik',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: 'https://distedavim.com/sss',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}