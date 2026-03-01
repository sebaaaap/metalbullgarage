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

export const metadata: Metadata = {
    title: "Metal Bulls Garage | Servicio Mecánico Profesional",
    description:
        "Taller mecánico profesional con más de 15 años de experiencia. Mecánica general, motor, frenos, suspensión, sistema eléctrico y más. Calidad garantizada.",
    keywords:
        "taller mecánico, mecánica automotriz, servicio mecánico, reparación de autos, Metal Bulls Garage",
    openGraph: {
        title: "Metal Bulls Garage | Servicio Mecánico Profesional",
        description:
            "Servicio mecánico profesional con la fuerza y precisión de un toro. Tu vehículo en las mejores manos.",
        type: "website",
    },
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
