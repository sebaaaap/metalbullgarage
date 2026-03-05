export interface GoogleReview {
    authorAttribution: {
        displayName: string;
        uri: string;
        photoUri: string;
    };
    rating: number;
    relativePublishTimeDescription: string;
    text: {
        text: string;
        languageCode: string;
    };
    publishTime: string;
}

export interface GooglePlaceData {
    reviews: GoogleReview[];
    rating: number;
    userRatingCount: number;
    googleMapsUri: string;
}

export async function getGoogleReviews(): Promise<GooglePlaceData | null> {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = 'ChIJiQU0gprBYpYRp02oUsNPHWM';

    if (!apiKey) {
        console.warn('Falta definir la variable de entorno GOOGLE_PLACES_API_KEY');
        return null;
    }

    const url = `https://places.googleapis.com/v1/places/${placeId}?fields=reviews,rating,userRatingCount,googleMapsUri&key=${apiKey}&languageCode=es`;

    try {
        const res = await fetch(url, {
            next: {
                // Cachear resultados por 7 días (604800 segundos) para optimizar consultas y costos
                revalidate: 604800
            },
        });

        if (!res.ok) {
            throw new Error(`Error al obtener las reseñas de Google: ${res.status}`);
        }

        const data = await res.json();

        if (data) {
            // Filtrar para mostrar solo reseñas de 4 y 5 estrellas
            const filteredReviews = (data.reviews as GoogleReview[])?.filter(r => r.rating >= 4) || [];

            return {
                reviews: filteredReviews,
                rating: data.rating || 4.9,
                userRatingCount: data.userRatingCount || 0,
                googleMapsUri: data.googleMapsUri || "https://google.com/maps",
            };
        }

        return null;
    } catch (error) {
        console.error('Error procesando las reseñas de Google:', error);
        return null;
    }
}
