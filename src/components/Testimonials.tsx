"use client";

import { motion } from "framer-motion";
import { Star, Quote, CheckCircle2 } from "lucide-react";

const reviews = [
  {
    name: "Carlos Mendoza",
    date: "Hace 2 meses",
    rating: 5,
    text: "Excelente servicio, llevé mi camioneta con un problema de motor y la dejaron como nueva. Muy profesionales y honestos con los precios.",
    initial: "C",
    verified: true,
  },
  {
    name: "María González",
    date: "Hace 1 mes",
    rating: 5,
    text: "El mejor taller de la zona. Siempre me atienden rápido y explican todo el trabajo que realizan. Se nota que saben lo que hacen.",
    initial: "M",
    verified: true,
  },
  {
    name: "Roberto Silva",
    date: "Hace 3 semanas",
    rating: 5,
    text: "Profesionales de primera. He llevado todos mis autos aquí y jamás he tenido una mala experiencia. Los mecánicos son muy amables.",
    initial: "R",
    verified: true,
  },
  {
    name: "Ana Martínez",
    date: "Hace 1 semana",
    rating: 5,
    text: "Me encanta la honestidad del equipo. No te venden servicios innecesarios y el trabajo siempre queda perfecto. Definitivamente mi taller de confianza.",
    initial: "A",
    verified: true,
  },
  {
    name: "Pedro Aravena",
    date: "Hace 2 semanas",
    rating: 5,
    text: "Muy buena atención, se nota la experiencia en el trato y el diagnostico fue muy acertado. Recomendado para todo tipo de vehículos.",
    initial: "P",
    verified: true
  },
  {
    name: "Ignacio Torres",
    date: "Hace 4 días",
    rating: 5,
    text: "Excelente atención de parte de todo el equipo. Rapidez y calidad en el servicio. Mi auto quedó impecable!",
    initial: "I",
    verified: true
  }
];

// Double the array for seamless scrolling
const allReviews = [...reviews, ...reviews];

export default function Testimonials() {
  return (
    <section id="testimonios" className="py-24 relative overflow-hidden bg-black">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-600/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-gray-400 font-medium ml-2">4.9 / 5.0 en Google Reviews</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-heading mb-4">
            <span className="text-metallic">LO QUE DICEN</span>{" "}
            <span className="text-red-600">NUESTROS CLIENTES</span>
          </h2>
        </motion.div>
      </div>

      {/* Infinite Logo Scroller / Carousel */}
      <div className="flex relative items-center py-10">
        <motion.div
          className="flex gap-6 whitespace-nowrap"
          animate={{
            x: ["0%", "-50%"]
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ width: "max-content" }}
        >
          {allReviews.map((review, index) => (
            <div
              key={`${review.name}-${index}`}
              className="w-[350px] sm:w-[450px] bg-[hsl(0,0%,7%)] border border-white/10 rounded-2xl p-6 relative group hover:border-red-600/30 transition-all duration-300 inline-block overflow-hidden"
            >
              <div className="absolute top-6 right-6 opacity-30 group-hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white/20">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-heading text-lg shadow-lg">
                  {review.initial}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-white font-medium text-sm leading-none">{review.name}</h3>
                    {review.verified && (
                      <CheckCircle2 size={12} className="text-blue-500" />
                    )}
                  </div>
                  <p className="text-gray-500 text-[10px] mt-1 uppercase tracking-wider">{review.date}</p>
                </div>
              </div>

              <div className="flex gap-0.5 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed whitespace-normal italic">
                "{review.text}"
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="https://google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-medium border-b border-transparent hover:border-white pb-0.5"
          >
            Ver todas las reseñas en Google Maps
          </a>
        </motion.div>
      </div>
    </section>
  );
}
