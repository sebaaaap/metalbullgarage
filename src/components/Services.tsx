"use client";

import { motion, useMotionValue, useMotionTemplate, useSpring } from "framer-motion";
import {
  Droplets,
  Truck,
  Building2,
  ShoppingBag,
  Wind,
  Orbit,
  Disc,
  Search,
  Zap,
  Target,
  Wrench,
  Circle,
  Monitor,
  CheckCircle,
  ChevronRight
} from "lucide-react";
import { useRef, useState } from "react";

export const services = [
  {
    icon: Zap,
    title: "Mecánica Rápida",
    description: "Intervenciones ágiles y diagnóstico puntual para resolver problemas cotidianos sin esperas.",
    highlight: "Atención express",
  },
  {
    icon: Circle,
    title: "Venta y Rep. de Neumáticos",
    description: "Venta de neumáticos nuevos de las mejores marcas y reparación técnica de pinchazos.",
    highlight: "Stock de marcas líderes",
  },
  {
    icon: Truck,
    title: "Vulca Móvil",
    description: "Asistencia de vulcanización en terreno para Quilicura y alrededores. ¡Llegamos donde estés!",
    highlight: "Servicio 24/7 en Quilicura",
  },
  {
    icon: Droplets,
    title: "Cambio de Aceite",
    description: "Lubricación de motor con filtros originales para prolongar la vida útil de tu vehículo.",
    highlight: "Mantenimiento vital",
  },
  {
    icon: Disc,
    title: "Pastillas de Freno",
    description: "Revisión técnica y cambio de pastillas con compuestos de alto rendimiento para frenados precisos.",
    highlight: "Frenado premium",
  },
  {
    icon: Search,
    title: "Scanner Electrónico",
    description: "Lectura de códigos de falla y diagnóstico computarizado completo de todos los módulos.",
    highlight: "Precisión digital",
  },
  {
    icon: Target,
    title: "Balanceo",
    description: "Ajuste computarizado para eliminar vibraciones en el volante y evitar desgaste irregular.",
    highlight: "Conducción suave",
  },
  {
    icon: Wrench,
    title: "Reparación de Llantas",
    description: "Restauración de llantas dañadas, golpes y fisuras con terminaciones de alta calidad.",
    highlight: "Acabado profesional",
  },
  {
    icon: Droplets,
    title: "Servicio de Inyectores",
    description: "Limpieza ultrasónica y calibración para optimizar el consumo de combustible y la potencia de tu motor.",
    highlight: "Máxima eficiencia",
  },
  {
    icon: Wind,
    title: "Aire Acondicionado",
    description: "Carga de gas, detección de fugas y mantenimiento completo para un clima perfecto en cabina.",
    highlight: "Confort total",
  },
  {
    icon: Monitor,
    title: "Servicio TPMS",
    description: "Diagnóstico, programación y reemplazo de sensores de presión de neumáticos.",
    highlight: "Tecnología de punta",
  },
  {
    icon: Orbit,
    title: "Cambio de Rodamientos",
    description: "Diagnóstico y reemplazo de rodamientos de masa para una conducción silenciosa y estable.",
    highlight: "Seguridad vial",
  },
  {
    icon: ShoppingBag,
    title: "Venta de Accesorios",
    description: "Variedad de accesorios de alta calidad para mejorar el equipamiento y estética de tu auto.",
    highlight: "Stock disponible",
  },
  {
    icon: Building2,
    title: "Empresas y PYMES",
    description: "Servicio personalizado y convenios de mantenimiento para flotas corporativas, garantizando operatividad.",
    highlight: "Convenios especiales",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`
    radial-gradient(
      350px circle at ${springX}px ${springY}px,
      rgba(220, 38, 38, 0.35),
      transparent 80%
    )
  `;

  // Static background for mobile (no tracking)
  const mobileBackground = "radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.15), transparent 80%)";

  function handleCotizar(e: React.MouseEvent) {
    e.stopPropagation(); // Evitar que la tarjeta se voltee de vuelta al hacer click

    // 1. Emitir evento para el formulario
    window.dispatchEvent(
      new CustomEvent("service-preselect", { detail: service.title })
    );

    // 2. Scroll forzado al formulario
    const contactSection = document.getElementById("contacto");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      onClick={() => setIsFlipped((f) => !f)}
      className="cursor-pointer w-full max-w-[calc(100vw-40px)] mx-auto sm:max-w-none"
      style={{ perspective: 1200, height: "280px" }}
    >
      <motion.div
        animate={{ rotateX: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
        style={{
          transformStyle: "preserve-3d",
          height: "100%",
          position: "relative",
        }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 group"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            pointerEvents: isFlipped ? "none" : "auto"
          }}
        >
          <div
            className="relative bg-[hsl(0,0%,7%)] border border-white/10 rounded-xl p-5 sm:p-6 pb-8 h-full shadow-lg hover:border-red-600/60 transition-all duration-300"
            onMouseMove={handleMouseMove}
          >
            {/* Spotlight - Dynamic on Desktop (sm:), Static on Mobile */}
            <motion.div
              className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 overflow-hidden hidden sm:block"
              style={{ background }}
            />
            <div
              className="pointer-events-none absolute -inset-px rounded-xl opacity-20 z-0 overflow-hidden sm:hidden"
              style={{ background: mobileBackground }}
            />

            {/* Background icon */}
            <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-700 pointer-events-none">
              <service.icon className="w-44 h-44 -rotate-12 text-red-600" />
            </div>
            {/* Content */}
            <div className="relative z-10 flex flex-col h-full gap-2 sm:gap-3">
              <h3 className="font-heading text-xl sm:text-xl text-white group-hover:text-red-400 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-400/80 text-sm sm:text-sm leading-relaxed line-clamp-3">
                {service.description}
              </p>
              <div className="mt-auto flex items-center gap-1.5 text-[10px] text-red-500/80 font-heading tracking-widest uppercase">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full shrink-0" />
                {service.highlight}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-red-600 to-red-400 group-hover:w-full transition-all duration-500" />
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateX(180deg)",
            pointerEvents: isFlipped ? "auto" : "none"
          }}
        >
          <div className="relative h-full bg-[hsl(0,0%,6%)] border border-red-600/40 rounded-xl p-5 flex flex-col items-center justify-center gap-3 overflow-hidden shadow-2xl">
            {/* Glow bg */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />

            <service.icon className="w-10 h-10 text-red-500 relative z-10" style={{ filter: "drop-shadow(0 0 10px rgba(220,38,38,0.5))" }} />
            <h3 className="font-heading text-xl sm:text-xl text-white text-center leading-tight max-w-[90%] relative z-10">{service.title}</h3>

            <button
              onClick={handleCotizar}
              className="relative z-[100] mt-1 font-heading text-xs px-6 py-2.5 bg-red-600 text-white rounded-lg tracking-widest hover:bg-red-500 active:scale-95 transition-all duration-200 shadow-[0_4px_15px_rgba(220,38,38,0.3)] hover:shadow-[0_4px_25px_rgba(220,38,38,0.6)] cursor-pointer"
            >
              COTIZAR
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="servicios" className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(0,0%,4%) 0%, hsl(0,0%,6%) 100%)" }}>
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(0,72%,51%) 1px, transparent 1px), linear-gradient(90deg, hsl(0,72%,51%) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-red-600/10 border border-red-600/20 rounded-full">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-400 text-xs font-heading tracking-widest uppercase">Expertos a tu servicio</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading mb-4">
            <span className="text-metallic">NUESTROS</span>{" "}
            <span className="text-red-600">SERVICIOS</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Brindamos soluciones integrales en vulcanización, mecánica general y mantenimiento preventivo. Con un enfoque especializado, ofrecemos convenios exclusivos y servicios personalizados para flotas de empresas y PYMES, garantizando la operatividad de sus vehículos en todo momento.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <BottomCTA />
      </div>
    </section>
  );
}

function BottomCTA() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function handleTouchMove({ currentTarget, touches }: React.TouchEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(touches[0].clientX - left);
    mouseY.set(touches[0].clientY - top);
  }

  const background = useMotionTemplate`
    radial-gradient(
      600px circle at ${springX}px ${springY}px,
      rgba(220, 38, 38, 0.35),
      transparent 80%
    )
  `;

  function handleCotizarFlotilla() {
    window.dispatchEvent(
      new CustomEvent("service-preselect", { detail: "Empresas y PYMES" })
    );
    const section = document.getElementById("contacto");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-16 bg-black border border-red-600/20 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden group/cta"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* Spotlight Follower */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300 z-0"
        style={{ background }}
      />

      <div className="relative z-10">
        <h4 className="font-heading text-2xl sm:text-3xl text-white mb-4">¿BUSCAS UN CONVENIO PARA TU EMPRESA?</h4>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">Mantenemos tu flota comercial siempre lista. Consulta por nuestros planes especiales para PYMES y empresas con atención prioritaria.</p>
        <button
          onClick={handleCotizarFlotilla}
          className="inline-flex items-center gap-3 font-heading text-sm px-10 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300 tracking-widest hover:shadow-[0_10px_30px_rgba(220,38,38,0.4)]"
        >
          COTIZAR FLOTILLA
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
