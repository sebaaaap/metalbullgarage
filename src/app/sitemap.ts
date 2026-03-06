import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://metalbullsgarage.cl';

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        // Como es una landing page principal, 
        // normalmente basta con la raíz, pero si fuesen a existir subsecciones se agregan aquí.
    ];
}
