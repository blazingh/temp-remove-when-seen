import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'diştedavim',
    short_name: 'DT',
    description: 'Diş sağlığın sizin için önemli. Artık randevunu ertelemeyin, hemen online randevu oluşturun!',
    start_url: '/',
    display: 'standalone',
    theme_color: '#7334e0',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}