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
import { useRef } from "react";

const services = [
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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Add smoothing to the light movement
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
      350px circle at ${springX}px ${springY}px,
      rgba(220, 38, 38, 0.35),
      transparent 80%
    )
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div
        className="relative bg-[hsl(0,0%,7%)] border border-white/10 rounded-xl p-8 h-full transition-all duration-400 hover:border-red-600/60 overflow-hidden cursor-default shadow-lg hover:-translate-y-1"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* Spotlight Follower */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{ background }}
        />

        {/* Background Icon Symbol */}
        <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-110 transition-all duration-700 pointer-events-none">
          <service.icon className="w-44 h-44 -rotate-12 text-red-600" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="font-heading text-xl text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-gray-400/80 text-sm leading-relaxed mb-8">{service.description}</p>

          {/* Highlight tag */}
          <div className="flex items-center gap-1.5 text-xs text-red-500/80 font-heading tracking-wider uppercase font-medium">
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-1" />
            {service.highlight}
          </div>
        </div>

        {/* Bottom hover line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-red-600 to-red-400 group-hover:w-full transition-all duration-500" />
      </div>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
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
            En <span className="text-white font-medium">Metal Bulls Garage</span> brindamos soluciones integrales en vulcanización, mecánica general y mantenimiento preventivo. Con un enfoque especializado, ofrecemos convenios exclusivos y servicios personalizados para flotas de empresas y PYMES, garantizando la operatividad de sus vehículos en todo momento.
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
        <a
          href="#contacto"
          className="inline-flex items-center gap-3 font-heading text-sm px-10 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300 tracking-widest hover:shadow-[0_10px_30px_rgba(220,38,38,0.4)]"
        >
          COTIZAR FLOTILLA
          <ChevronRight className="w-5 h-5" />
        </a>
      </div>
    </motion.div>
  );
}
