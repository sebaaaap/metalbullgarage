"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
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
      // Faster animation: DRAW_F reduced from 380 to 180
      const DRAW_F = 180, FADE_F = 45;
      let raf: number;

      const W = canvas.width;
      const H = canvas.height;
      const CX = W / 2;
      const CY = H / 2;
      const R = Math.min(W, H) / 2 - PAD;

      function spawnSparks(wx: number, wy: number) {
        // Reduced count for mobile performance
        const count = 3 + Math.floor(Math.random() * 4);
        for (let i = 0; i < count; i++) {
          const speed = 1.2 + Math.random() * 4.5;
          const a = Math.random() * Math.PI * 2;
          sparks.push({
            x: wx, y: wy,
            vx: Math.cos(a) * speed,
            vy: Math.sin(a) * speed - 1,
            life: 0, maxLife: 15 + Math.random() * 20,
            size: 0.8 + Math.random() * 1.8,
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
          c.shadowBlur = 12; // Reduced blur
          c.lineCap = "round";
          c.beginPath();
          c.arc(CX, CY, R, -Math.PI / 2, arcEnd, false);
          c.stroke();
          c.restore();

          const gl = c.createRadialGradient(wx, wy, 0, wx, wy, 15);
          gl.addColorStop(0, "rgba(255,255,220,1)");
          gl.addColorStop(0.2, "rgba(255,200,60,0.9)");
          gl.addColorStop(0.55, "rgba(255,50,0,0.5)");
          gl.addColorStop(1, "rgba(255,0,0,0)");
          c.save();
          c.fillStyle = gl;
          c.beginPath();
          c.arc(wx, wy, 15, 0, Math.PI * 2);
          c.fill();
          c.restore();

          if (stateFrame % 3 === 0) spawnSparks(wx, wy); // Spawn less frequently
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
          c.shadowBlur = 5;
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

    // Instant start for the welding arc
    const drawAction = () => draw(ctx);
    drawAction();
    return () => { };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute pointer-events-none z-10"
      style={{ inset: `-${30}px`, width: `calc(100% + 60px)`, height: `calc(100% + 60px)` }}
    />
  );
};

// --- Defer constant animation to avoid main thread jank during mount ---
const LogoFloat = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springCfg = { stiffness: 180, damping: 7, mass: 1.2 };
  const springX = useSpring(rawX, springCfg);
  const springY = useSpring(rawY, springCfg);
  const rotateY = useTransform(springX, [-1, 1], [-25, 25]); // Reduced angles for performance
  const rotateX = useTransform(springY, [-1, 1], [20, -20]);

  useEffect(() => {
    setIsReady(true);
  }, []);

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
      whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300, damping: 10 } }}
      whileTap={{ scale: 0.94, transition: { duration: 0.2 } }}
      style={{ rotateX, rotateY, perspective: 600, transformStyle: "preserve-3d", cursor: "pointer" }}
      animate={isReady ? { y: [0, -10, 0], rotateZ: [0, 0.5, -0.5, 0] } : {}}
      transition={{
        y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
        rotateZ: { repeat: Infinity, duration: 4, ease: "easeInOut" },
      }}
    >
      {children}
    </motion.div>
  );
};

const Counter = ({ value, label }: { value: string; label: string }) => {
  const countValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const target = parseInt(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (isInView) {
      const controls = animate(countValue, target, {
        duration: 2.0,
        ease: "easeOut",
        onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
      });
      return () => controls.stop();
    }
  }, [isInView, target, countValue]);

  return (
    <div ref={ref} className="text-center transition-all duration-300">
      <div className="font-heading text-3xl sm:text-4xl text-red-500 mb-1">
        {displayValue}{suffix}
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Image - Optimized */}
      <div className="absolute inset-0">
        <Image
          src="/hero-garage.jpg"
          alt="Metal Bulls Garage"
          fill
          className="object-cover object-center"
          priority
          quality={75}
          sizes="100vw"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-20 w-full">
        <div className="flex flex-col items-center text-center">
          {/* Logo - Synchronized entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-8"
          >
            <LogoFloat onClick={() => setWeldKey(k => k + 1)}>
              <div className="relative w-[clamp(11rem,50vw,16rem)] h-[clamp(11rem,50vw,16rem)]">
                <WeldingArc key={weldKey} />
                <Image
                  src="/metabulllogo.png"
                  alt="Metal Bulls Garage"
                  fill
                  className="object-contain drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]"
                  priority
                />
              </div>
            </LogoFloat>
          </motion.div>

          {/* Headline - Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <h1 className="font-heading leading-none tracking-wide text-center">
              <span
                className="block text-[clamp(2.5rem,7vw,5.5rem)] text-white"
                style={{ textShadow: "0 0 60px rgba(220,38,38,0.2)" }}
              >
                METAL BULL
              </span>
              <span
                className="block text-[clamp(2.5rem,7vw,5.5rem)]"
                style={{
                  WebkitTextStroke: "1.5px rgba(220,38,38,0.8)",
                  color: "transparent",
                }}
              >
                GARAGE
              </span>
            </h1>
          </motion.div>

          {/* Subtitle - Sync with Headline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-xs sm:text-base tracking-[0.2em] uppercase mb-10 flex items-center gap-3 flex-wrap justify-center"
          >
            <span>Autos &amp; Motos</span>
            <span className="w-1 h-1 rounded-full bg-red-600 hidden sm:inline-block" />
            <span>Taller Mecánico</span>
            <span className="w-1 h-1 rounded-full bg-red-600 hidden sm:inline-block" />
            <span>Quilicura</span>
          </motion.div>

          {/* Stats - Sync with Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex items-center gap-4 sm:gap-0 mb-12"
          >
            <div className="px-4 sm:px-8 text-center">
              <Counter value="10+" label="Años Exp." />
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="px-4 sm:px-8 text-center">
              <Counter value="5000+" label="Clientes" />
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="px-4 sm:px-8 text-center">
              <Counter value="100%" label="Garantía" />
            </div>
          </motion.div>

          {/* CTAs - Final entry */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-5 w-full max-w-sm sm:max-w-2xl px-4 justify-center"
          >
            <a
              href="#contacto"
              className="sm:px-10 py-4 bg-red-600 text-white rounded-lg text-xs sm:text-sm font-heading tracking-widest hover:bg-red-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(220,38,38,0.3)] hover:shadow-[0_8px_30px_rgba(220,38,38,0.5)] group"
            >
              SOLICITAR COTIZACIÓN
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:px-10 py-4 border border-white/20 text-gray-300 rounded-lg text-xs sm:text-sm font-heading tracking-widest hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-3"
            >
              <Phone className="w-4 h-4" />
              LLAMAR AHORA
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
