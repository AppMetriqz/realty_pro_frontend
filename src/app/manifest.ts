import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    short_name: 'Before Boarding',
    name: 'Before Boarding',
    description:
      'Disfrute de una experiencia de viaje cómoda y relajante con los servicios de Before Boarding en República Dominicana.',
    icons: [
      {
        src: 'favicon.ico',
        sizes: '64x64 32x32 24x24 16x16',
        type: 'image/x-icon',
      },
    ],
    start_url: '.',
    display: 'standalone',
    theme_color: '#000000',
    background_color: '#ffffff',
  };
}
