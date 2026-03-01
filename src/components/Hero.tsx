"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const Counter = ({ value, label }: { value: string; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const target = parseInt(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = target;
      if (start === end) return;

      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center sm:text-left transition-all duration-300">
      <div className="font-heading text-2xl sm:text-3xl text-red-500">
        {count}{suffix}
      </div>
      <div className="text-xs text-gray-500 tracking-wider uppercase">{label}</div>
    </div>
  );
};

const WHATSAPP_NUMBER = "1234567890";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hola, me gustaría solicitar información sobre sus servicios."
);

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-garage.jpg"
          alt="Metal Bulls Garage - Taller Mecánico"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/92 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        {/* Red accent overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-transparent to-transparent" />
      </div>

      {/* Animated background lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent"
            style={{ top: `${20 + i * 15}%`, left: 0, right: 0 }}
            animate={{ opacity: [0, 0.6, 0], scaleX: [0, 1, 0] }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-20 w-full">
        <div className="max-w-3xl">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="relative w-28 h-28 sm:w-36 sm:h-36">
              <Image
                src="/metabulllogo.png"
                alt="Metal Bulls Garage"
                fill
                className="object-contain drop-shadow-[0_0_40px_rgba(220,38,38,0.7)]"
                priority
              />
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-heading mb-6 leading-none"
          >
            <span className="text-metallic block">METAL BULLS</span>
            <span className="text-red-600 block">GARAGE</span>
          </motion.h1>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-1 bg-red-600 mb-6 origin-left"
          />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg sm:text-xl text-gray-300 mb-10 max-w-xl leading-relaxed"
          >
            Servicio mecánico profesional con la fuerza y precisión de un toro.{" "}
            <span className="text-white font-medium">Tu vehículo en las mejores manos.</span>
          </motion.p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-8 mb-10"
          >
            <Counter value="10+" label="Años de exp." />
            <Counter value="5000+" label="Clientes" />
            <Counter value="100%" label="Garantizado" />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              id="hero-cta-primary"
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 font-heading px-8 py-4 bg-red-600 text-white rounded text-sm tracking-wider hover:bg-red-700 transition-all duration-300 group"
              style={{ boxShadow: "0 4px 20px rgba(220,38,38,0.3)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = "0 4px 30px rgba(220,38,38,0.6)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = "0 4px 20px rgba(220,38,38,0.3)")
              }
            >
              SOLICITAR COTIZACIÓN
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              id="hero-cta-whatsapp"
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-heading px-8 py-4 border border-gray-600 text-gray-300 rounded text-sm tracking-wider hover:border-white hover:text-white transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              LLAMAR AHORA
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[hsl(0,0%,4%)] to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-red-500 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
