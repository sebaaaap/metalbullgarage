import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import { getGoogleReviews } from "@/lib/google-reviews";
import Brands from "@/components/Brands";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { client } from "@/sanity/lib/client";

export const revalidate = 60;

export default async function Home() {
    const googlePlaceData = await getGoogleReviews();
    const businessInfo = await client.fetch(`*[_type == "businessInfo"][0]`) || {};

    // LocalBusiness Schema.org Configuración
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AutoRepair",
        "name": "Metal Bulls Garage",
        "image": "https://metalbullsgarage.cl/metabulllogo.png",
        "url": "https://metalbullsgarage.cl",
        "telephone": businessInfo.phone || "+56912345678",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": businessInfo.address || "Santa Luisa 173, Quilicura, Región Metropolitana",
            "addressCountry": "CL"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": -33.3467031,
            "longitude": -70.7406829
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                ],
                "opens": "09:00",
                "closes": "19:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "09:00",
                "closes": "14:00"
            }
        ],
        "aggregateRating": googlePlaceData && googlePlaceData.rating ? {
            "@type": "AggregateRating",
            "ratingValue": googlePlaceData.rating,
            "reviewCount": googlePlaceData.userRatingCount
        } : undefined,
        "priceRange": "$$"
    };

    return (
        <main className="min-h-screen">
            <Navbar />
            <Hero />
            <Services />
            <About />
            <Testimonials apiData={googlePlaceData} />
            <Brands />
            <Contact businessInfo={businessInfo} />
            <Footer businessInfo={businessInfo} />
            <WhatsAppButton businessInfo={businessInfo} />

            {/* JSON-LD Schema.org para LocalBusiness Automatizado (SEO Técnico Premium) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </main>
    );
}
