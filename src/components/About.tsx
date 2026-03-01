"use client";

import { motion, useInView } from "framer-motion";
import { Shield, Award, Clock, Users, CheckCircle } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const Counter = ({ value, label }: { value: string, label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Extract number from string (e.g., "10+" -> 10)
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
    <div ref={ref} className="relative z-10">
      <div className="font-heading text-4xl text-white mb-2">
        {count}{suffix}
      </div>
      <div className="text-gray-500 text-xs uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
};

const stats = [
  { icon: Clock, value: "10+", label: "Años de Experiencia" },
  { icon: Users, value: "5000+", label: "Clientes Satisfechos" },
  { icon: Award, value: "100%", label: "Calidad Garantizada" },
  { icon: Shield, value: "24/7", label: "Atención al Cliente" },
];

const features = [
  "Especialistas en neumáticos y llantas",
  "Equipos de diagnóstico de última generación",
  "Garantía en todos los servicios realizados",
  "Alianza con las mejores marcas del mercado",
  "Pasión por los vehículos y el mundo tuerca",
  "Atención personalizada y eficiente",
];

export default function About() {
  return (
    <section
      id="nosotros"
      className="py-24 relative overflow-hidden"
      style={{ background: "hsl(0,0%,6%)" }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 30px, hsl(0,72%,51%) 30px, hsl(0,72%,51%) 31px)`,
          }}
        />
      </div>

      {/* Left red accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-red-600/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-red-600/10 border border-red-600/20 rounded-full">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-400 text-xs font-heading tracking-widest uppercase">Nuestra Trayectoria</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-heading mb-6">
              <span className="text-metallic">PASIÓN</span>{" "}
              <span className="text-red-600">AUTOMOTRIZ</span>
            </h2>

            <div className="w-16 h-1 bg-red-600 mb-8" />

            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              En <strong className="text-white">Metal Bulls Garage</strong> somos un taller especializado en la reparación experta de neumáticos y llantas, brindando servicios automotrices integrales que recorren toda la pasión del mundo tuerca.
            </p>

            <p className="text-gray-400 mb-8 leading-relaxed">
              Con <strong className="text-red-400">10 años de experiencia</strong>, estamos equipados para resolver cualquier desafío que presente tu vehículo. Trabajamos exclusivamente con las mejores marcas del mercado y utilizamos equipos de diagnóstico con la última tecnología para garantizar un trabajo óptimo y brindarte la mejor experiencia de servicio.
            </p>

            {/* Features list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-2.5"
                >
                  <CheckCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400 text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-5"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative bg-[hsl(0,0%,4%)] border border-white/10 rounded-xl p-8 text-center group overflow-hidden"
                style={{ transition: "all 0.4s ease" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(220,38,38,0.5)";
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(220,38,38,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <stat.icon className="w-10 h-10 text-red-500 mx-auto mb-4 relative z-10" />
                <Counter value={stat.value} label={stat.label} />

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="col-span-2 bg-gradient-to-br from-red-900/20 to-red-950/10 border border-red-600/30 rounded-xl p-6 text-center"
            >
              <p className="text-gray-400 text-sm mb-3">
                ¿Listo para experimentar el servicio Metal Bulls?
              </p>
              <a
                href="#contacto"
                id="about-cta"
                className="inline-flex items-center justify-center gap-2 font-heading text-sm px-6 py-2.5 bg-red-600 text-white rounded tracking-wider hover:bg-red-700 transition-all duration-300"
              >
                AGENDAR SERVICIO
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
