import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/admin/'], // Rutas privadas comunes en la web
        },
        sitemap: 'https://metalbullsgarage.cl/sitemap.xml',
    };
}
