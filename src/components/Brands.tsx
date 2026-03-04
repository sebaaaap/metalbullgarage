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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-red-600/10 border border-red-600/20 rounded-full">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-red-400 text-xs font-heading tracking-widest uppercase">Nuestros Aliados</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-heading">
                        <span className="text-white">MARCAS CON LAS QUE</span>{" "}
                        <span className="text-red-600">TRABAJAMOS</span>
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
