import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const oswald = Oswald({
    subsets: ["latin"],
    variable: "--font-oswald",
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

export const viewport = {
    themeColor: "#dc2626", // Red 600
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

export const metadata: Metadata = {
    metadataBase: new URL('https://metalbullsgarage.cl'), // Mención base asumiendo un dominio ideal (cambiar al real en producción)
    title: {
        default: "Metal Bulls Garage | Taller Mecánico Especializado en Quilicura",
        template: "%s | Metal Bulls Garage",
    },
    description:
        "Taller mecánico profesional en Quilicura con más de 10 años de experiencia. Especialistas en mecánica general, neumáticos, frenos, mantenciones por kilometraje, escáner automotriz y suspensión. Tu vehículo en las mejores manos.",
    keywords: [
        "taller mecánico", "mecánica automotriz", "servicio mecánico Quilicura",
        "reparación de autos", "neumáticos", "frenos", "cambio de aceite",
        "mantención automotriz", "taller en Quilicura", "Metal Bulls", "Metal Bulls Garage"
    ],
    authors: [{ name: "Metal Bulls Garage" }],
    creator: "Metal Bulls Garage",
    publisher: "Metal Bulls Garage",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    alternates: {
        canonical: "/",
        languages: {
            "es-CL": "/",
        },
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: [
            { url: "/metabulllogo.png", sizes: "32x32" },
            { url: "/metabulllogo.png", sizes: "192x192" },
            { url: "/metabulllogo.png", sizes: "512x512" },
        ],
        shortcut: "/metabulllogo.png",
        apple: "/metabulllogo.png",
    },
    openGraph: {
        title: "Metal Bulls Garage | Taller Mecánico Especializado en Quilicura",
        description:
            "Servicio mecánico profesional con la fuerza y precisión de un toro. Mantenciones, frenos, mecánica general y más en Quilicura.",
        url: "https://metalbullsgarage.cl",
        siteName: "Metal Bulls Garage",
        locale: "es_CL",
        type: "website",
        images: [
            {
                url: "/metabulllogo.png", // Sugerencia: idealmente una imagen ancha o foto del taller 1200x630
                width: 800,
                height: 800,
                alt: "Logo de Metal Bulls Garage",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Metal Bulls Garage | Mecánica Automotriz",
        description: "Tu vehículo en las mejores manos. Taller especializado en Quilicura.",
        images: ["/metabulllogo.png"],
    },
    verification: {
        google: "añadir-codigo-de-google-search-console-aqui", // Opcional, util para SEO Técnico
    },
    category: "Automotive",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className={`${inter.variable} ${oswald.variable}`}>
            <body className="bg-background text-foreground antialiased">{children}</body>
        </html>
    );
}
