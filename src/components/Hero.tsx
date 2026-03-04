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
    <div ref={ref} className="text-center transition-all duration-300">
      <div className="font-heading text-3xl sm:text-4xl text-red-500 mb-1">
        {count}{suffix}
      </div>
      <div className="text-xs text-gray-400 tracking-wider uppercase font-medium">{label}</div>
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
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="mb-8"
          >
            <div className="relative w-44 h-44 sm:w-60 sm:h-60 group">
              {/* Rotating Orbit Effect */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-10px] rounded-full border-t-2 border-r-2 border-red-600/30 group-hover:border-red-500/60 transition-colors duration-500"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-20px] rounded-full border-b-2 border-l-2 border-gray-500/20 group-hover:border-gray-400/40 transition-colors duration-500"
              />
              <Image
                src="/metabulllogo.png"
                alt="Metal Bulls Garage"
                fill
                className="object-contain drop-shadow-[0_0_40px_rgba(220,38,38,0.7)] group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-1 bg-red-600 mb-8 rounded-full"
          />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-2xl text-gray-300 mb-12 max-w-2xl leading-relaxed"
          >
            Servicio mecánico profesional con la fuerza y precisión de un toro.{" "}
            <span className="text-white font-medium block mt-2">Tu vehículo en las mejores manos.</span>
          </motion.p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap justify-center gap-10 sm:gap-20 mb-12 bg-black/30 backdrop-blur-sm p-6 rounded-3xl border border-white/5"
          >
            <Counter value="10+" label="Años de exp." />
            <Counter value="5000+" label="Clientes" />
            <Counter value="100%" label="Garantizado" />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
          >
            <a
              id="hero-cta-primary"
              href="#contacto"
              className="flex-1 inline-flex items-center justify-center gap-2 font-heading px-8 py-4 bg-red-600 text-white rounded-lg text-sm tracking-wider hover:bg-red-700 transition-all duration-300 group relative overflow-hidden"
              style={{ boxShadow: "0 4px 20px rgba(220,38,38,0.3)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = "0 4px 30px rgba(220,38,38,0.6)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = "0 4px 20px rgba(220,38,38,0.3)")
              }
            >
              <span className="relative z-10 flex items-center gap-2">
                SOLICITAR COTIZACIÓN
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              id="hero-cta-whatsapp"
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 font-heading px-8 py-4 border border-gray-600 text-gray-300 rounded-lg text-sm tracking-wider hover:border-white hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              LLAMAR AHORA
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[hsl(0,0%,4%)] to-transparent pointer-events-none" />


    </section>
  );
}
