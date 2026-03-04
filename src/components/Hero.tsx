"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

// --- Canvas-based welding arc with real spark physics ---
const WeldingArc = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const PAD = 30;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = (c: CanvasRenderingContext2D) => {
      interface Spark {
        x: number; y: number;
        vx: number; vy: number;
        life: number; maxLife: number;
        size: number; hue: number;
      }

      let sparks: Spark[] = [];
      let state: "drawing" | "fading" | "done" = "drawing";
      let stateFrame = 0;
      const DRAW_F = 380, FADE_F = 55; // slow, runs once only
      let raf: number;

      const W = canvas.width;
      const H = canvas.height;
      const CX = W / 2;
      const CY = H / 2;
      const R = Math.min(W, H) / 2 - PAD;

      function spawnSparks(wx: number, wy: number) {
        const count = 5 + Math.floor(Math.random() * 6);
        for (let i = 0; i < count; i++) {
          const speed = 1.2 + Math.random() * 4.5;
          const a = Math.random() * Math.PI * 2;
          sparks.push({
            x: wx, y: wy,
            vx: Math.cos(a) * speed,
            vy: Math.sin(a) * speed - 1,
            life: 0, maxLife: 18 + Math.random() * 28,
            size: 0.8 + Math.random() * 2.2,
            hue: 15 + Math.random() * 45,
          });
        }
      }

      function tick() {
        c.clearRect(0, 0, W, H);

        if (state === "drawing") {
          const t = stateFrame / DRAW_F;
          const arcEnd = -Math.PI / 2 + t * Math.PI * 2;
          const wx = CX + Math.cos(arcEnd) * R;
          const wy = CY + Math.sin(arcEnd) * R;

          c.save();
          c.strokeStyle = "rgba(255, 70, 15, 0.85)";
          c.lineWidth = 2.5;
          c.shadowColor = "rgba(255, 100, 20, 1)";
          c.shadowBlur = 14;
          c.lineCap = "round";
          c.beginPath();
          c.arc(CX, CY, R, -Math.PI / 2, arcEnd, false);
          c.stroke();
          c.restore();

          const gl = c.createRadialGradient(wx, wy, 0, wx, wy, 18);
          gl.addColorStop(0, "rgba(255,255,220,1)");
          gl.addColorStop(0.2, "rgba(255,200,60,0.9)");
          gl.addColorStop(0.55, "rgba(255,50,0,0.5)");
          gl.addColorStop(1, "rgba(255,0,0,0)");
          c.save();
          c.fillStyle = gl;
          c.beginPath();
          c.arc(wx, wy, 18, 0, Math.PI * 2);
          c.fill();
          c.restore();

          if (stateFrame % 2 === 0) spawnSparks(wx, wy);
          stateFrame++;
          if (stateFrame >= DRAW_F) { state = "fading"; stateFrame = 0; }

        } else if (state === "fading") {
          const alpha = 1 - stateFrame / FADE_F;
          c.save();
          c.globalAlpha = Math.max(0, alpha);
          c.strokeStyle = "rgba(255, 70, 15, 0.85)";
          c.lineWidth = 2.5;
          c.shadowColor = "rgba(255, 100, 20, 1)";
          c.shadowBlur = 14;
          c.beginPath();
          c.arc(CX, CY, R, 0, Math.PI * 2);
          c.stroke();
          c.restore();
          stateFrame++;
          if (stateFrame >= FADE_F) { state = "done"; cancelAnimationFrame(raf); return; }
        }

        // Draw remaining sparks even during fading/done
        for (let i = sparks.length - 1; i >= 0; i--) {
          const s = sparks[i];
          s.x += s.vx;
          s.y += s.vy;
          s.vy += 0.14;
          s.vx *= 0.97;
          s.life++;
          const progress = s.life / s.maxLife;
          if (progress >= 1) { sparks.splice(i, 1); continue; }
          const al = 1 - progress;
          c.save();
          c.globalAlpha = al * 0.95;
          c.fillStyle = `hsl(${s.hue}, 100%, ${55 + al * 35}%)`;
          c.shadowColor = `hsl(${s.hue}, 100%, 70%)`;
          c.shadowBlur = 7;
          c.beginPath();
          c.arc(s.x, s.y, s.size * (1 - progress * 0.6), 0, Math.PI * 2);
          c.fill();
          c.restore();
        }

        raf = requestAnimationFrame(tick);
      }

      tick();
      return () => cancelAnimationFrame(raf);
    };

    return draw(ctx);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute pointer-events-none z-10"
      style={{ inset: `-${30}px`, width: `calc(100% + 60px)`, height: `calc(100% + 60px)` }}
    />
  );
};

// --- 3D floating/tilt effect on hover — BRUTO como un toro ---
const LogoFloat = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  // Spring muy elástico: bajo damping = mucho rebote, alta mass = más inercia
  const springCfg = { stiffness: 180, damping: 7, mass: 1.2 };
  const springX = useSpring(rawX, springCfg);
  const springY = useSpring(rawY, springCfg);
  // Ángulos muy exagerados: ±35° en Y, ±28° en X
  const rotateY = useTransform(springX, [-1, 1], [-35, 35]);
  const rotateX = useTransform(springY, [-1, 1], [28, -28]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2));
    rawY.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2));
  };
  const handleMouseLeave = () => { rawX.set(0); rawY.set(0); };

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.08, transition: { type: "spring", stiffness: 300, damping: 10 } }}
      whileTap={{ scale: 0.92, rotateZ: [-3, 3, -3, 0], transition: { duration: 0.35 } }}
      style={{ rotateX, rotateY, perspective: 500, transformStyle: "preserve-3d", cursor: "pointer" }}
      animate={{ y: [0, -22, 2, -18, 0], rotateZ: [0, 1.5, -1.5, 0.8, 0] }}
      transition={{
        y: { repeat: Infinity, duration: 3.2, ease: "easeInOut", times: [0, 0.35, 0.5, 0.75, 1] },
        rotateZ: { repeat: Infinity, duration: 3.2, ease: "easeInOut", times: [0, 0.35, 0.5, 0.75, 1] },
      }}
    >
      {children}
    </motion.div>
  );
};

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
  const [weldKey, setWeldKey] = useState(0);
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
            <LogoFloat onClick={() => setWeldKey(k => k + 1)}>
              <div className="relative w-44 h-44 sm:w-60 sm:h-60">
                {/* Welding Arc: runs once, restarts on click */}
                <WeldingArc key={weldKey} />
                <Image
                  src="/metabulllogo.png"
                  alt="Metal Bulls Garage"
                  fill
                  className="object-contain drop-shadow-[0_0_40px_rgba(220,38,38,0.7)]"
                  priority
                />
              </div>
            </LogoFloat>
          </motion.div>

          {/* Headline poderoso */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6"
          >
            <h1 className="font-heading leading-none tracking-wide text-center">
              <span
                className="block text-[clamp(2.8rem,8vw,6rem)] text-white"
                style={{ textShadow: "0 0 60px rgba(220,38,38,0.25)" }}
              >
                FUERZA
              </span>
              <span
                className="block text-[clamp(2.8rem,8vw,6rem)]"
                style={{
                  WebkitTextStroke: "2px rgba(220,38,38,0.9)",
                  color: "transparent",
                  textShadow: "0 0 40px rgba(220,38,38,0.3)",
                }}
              >
                &amp; PRECISIÓN
              </span>
            </h1>
          </motion.div>

          {/* Subtítulo refinado con separadores */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="text-gray-400 text-sm sm:text-base tracking-[0.25em] uppercase mb-10 flex items-center gap-3 flex-wrap justify-center"
          >
            <span>Taller Mecánico</span>
            <span className="w-1 h-1 rounded-full bg-red-600 inline-block" />
            <span>Neumáticos &amp; Llantas</span>
            <span className="w-1 h-1 rounded-full bg-red-600 inline-block" />
            <span>Quilicura</span>
          </motion.p>

          {/* Stats inline con divisores */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex items-center gap-0 mb-12"
          >
            <div className="px-8 text-center">
              <Counter value="10+" label="Años de Exp." />
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="px-8 text-center">
              <Counter value="5000+" label="Clientes" />
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="px-8 text-center">
              <Counter value="100%" label="Garantizado" />
            </div>
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
