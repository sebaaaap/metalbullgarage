"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const brands = [
    { src: "/marcas/cas.svg", alt: "Castrol", name: "Castrol" },
    { src: "/marcas/miche.png", alt: "Michelin", name: "Michelin" },
    { src: "/marcas/mo1.png", alt: "Mobil 1", name: "Mobil 1" },
    { src: "/marcas/moly.svg", alt: "Molykote", name: "Molykote" },
    { src: "/marcas/mot.png", alt: "Motorcraft", name: "Motorcraft" },
    { src: "/marcas/she.png", alt: "Shell", name: "Shell" },
    { src: "/marcas/autel.png", alt: "Autel", name: "Autel" },
    { src: "/marcas/flex.png", alt: "Flex", name: "Flex" },
    { src: "/marcas/vipal.png", alt: "Vipal", name: "Vipal" },
    { src: "/marcas/wurth.png", alt: "Würth", name: "Würth" },
];

// Duplicamos para loop infinito sin cortes
const track = [...brands, ...brands, ...brands];

export default function Brands() {
    return (
        <section
            id="marcas"
            className="py-20 relative overflow-hidden"
            style={{ background: "linear-gradient(180deg, hsl(0,0%,4%) 0%, hsl(0,0%,6%) 100%)" }}
        >
            {/* Línea superior decorativa */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 relative">
                {/* Header decorativo de fondo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center opacity-[0.03] select-none pointer-events-none">
                    <span className="font-heading text-[12vw] tracking-tighter uppercase text-white leading-none">PARTNERS</span>
                </div>

                {/* Header real */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative text-center"
                >
                    <div className="inline-flex items-center gap-3 mb-6 px-5 py-2 bg-red-600/10 border border-red-600/20 rounded-full backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(220,38,38,1)]" />
                        <span className="text-red-400 text-[10px] font-heading tracking-[0.3em] uppercase font-bold">Nuestros Aliados</span>
                    </div>

                    <h2 className="font-heading text-center leading-[0.9] flex flex-col items-center">
                        <span className="text-white text-[clamp(2rem,5vw,3.5rem)] tracking-tight">
                            MARCAS CON LAS QUE
                        </span>
                        <span
                            className="text-[clamp(2.5rem,7vw,4.5rem)] tracking-tighter"
                            style={{
                                WebkitTextStroke: "1px rgba(220,38,38,0.8)",
                                color: "transparent",
                                textShadow: "0 0 30px rgba(220,38,38,0.2)"
                            }}
                        >
                            TRABAJAMOS
                        </span>
                    </h2>
                </motion.div>
            </div>

            {/* Carrusel infinito */}
            <div className="relative">
                {/* Fade masks a los costados */}
                <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
                    style={{ background: "linear-gradient(to right, hsl(0,0%,4%), transparent)" }} />
                <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
                    style={{ background: "linear-gradient(to left, hsl(0,0%,4%), transparent)" }} />

                {/* Track animado */}
                <div className="overflow-hidden">
                    <motion.div
                        className="flex gap-16 items-center"
                        animate={{ x: ["0%", "-33.33%"] }}
                        transition={{
                            ease: "linear",
                            duration: 22,
                            repeat: Infinity,
                        }}
                    >
                        {track.map((brand, i) => (
                            <div
                                key={`${brand.alt}-${i}`}
                                className="flex-shrink-0 group flex flex-col items-center gap-3"
                            >
                                <div className="relative w-28 h-20 sm:w-36 sm:h-24 grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100 transition-all duration-500">
                                    <Image
                                        src={brand.src}
                                        alt={brand.alt}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
