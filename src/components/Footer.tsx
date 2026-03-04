"use client";

import Image from "next/image";
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";

const footerLinks = {
  servicios: [
    { label: "Mecánica General", href: "#servicios" },
    { label: "Servicio de Motor", href: "#servicios" },
    { label: "Frenos y Suspensión", href: "#servicios" },
    { label: "Sistema Eléctrico", href: "#servicios" },
  ],
  empresa: [
    { label: "Sobre Nosotros", href: "#nosotros" },
    { label: "Nuestros Servicios", href: "#servicios" },
    { label: "Preguntas Frecuentes", href: "#" },
    { label: "Contacto", href: "#contacto" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black pt-20 pb-10 relative overflow-hidden">
      {/* Top subtle border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Top Section: Brand & Social */}
        <div className="flex flex-col items-center text-center pb-12 border-b border-white/5">
          <a href="#inicio" className="inline-block mb-4 group" aria-label="Ir al inicio">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_25px_rgba(220,38,38,0.7)]">
              <Image
                src="/metabulllogo.png"
                alt="Logo"
                fill
                className="object-contain drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]"
              />
            </div>
          </a>
          <p className="font-heading text-2xl sm:text-3xl mb-6 tracking-wider">
            <span className="text-white">METAL BULLS</span>{" "}
            <span className="text-red-600">GARAGE</span>
          </p>

          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mb-8">
            Llevando la excelencia mecánica al siguiente nivel con pasión, precisión y potencia. Tu taller de confianza para vehículos de alta gama y uso diario.
          </p>

          <div className="flex gap-4">
            <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 hover:border-red-600 hover:-translate-y-1 transition-all duration-300 shadow-lg">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 hover:border-red-600 hover:-translate-y-1 transition-all duration-300 shadow-lg">
              <Facebook size={20} />
            </a>
          </div>
        </div>

        {/* Middle Section: Links & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12">

          {/* Services */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-heading text-lg text-white mb-6 uppercase tracking-widest relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-1/2 md:after:left-0 after:-translate-x-1/2 md:after:translate-x-0 after:w-12 after:h-0.5 after:bg-red-600">
              Servicios
            </h4>
            <ul className="space-y-4 text-center md:text-left">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-400 hover:text-red-500 transition-colors flex items-center justify-center md:justify-start gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-heading text-lg text-white mb-6 uppercase tracking-widest relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-1/2 md:after:left-0 after:-translate-x-1/2 md:after:translate-x-0 after:w-12 after:h-0.5 after:bg-red-600">
              Navegación
            </h4>
            <ul className="space-y-4 text-center md:text-left">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-400 hover:text-red-500 transition-colors flex items-center justify-center md:justify-start gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-heading text-lg text-white mb-6 uppercase tracking-widest relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-1/2 md:after:left-0 after:-translate-x-1/2 md:after:translate-x-0 after:w-12 after:h-0.5 after:bg-red-600">
              Contacto
            </h4>
            <ul className="space-y-6">
              <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
                <MapPin size={20} className="text-red-500 shrink-0" />
                <div className="text-center md:text-left">
                  <p className="text-gray-400 text-sm">Santa Luisa 173, Quilicura</p>
                  <p className="text-gray-400 text-sm">Región Metropolitana</p>
                </div>
              </li>
              <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
                <Phone size={20} className="text-red-500 shrink-0" />
                <div className="text-center md:text-left">
                  <p className="text-gray-400 text-sm">+56 9 1234 5678</p>
                </div>
              </li>
              <li className="flex flex-col md:flex-row items-center md:items-start gap-3">
                <Mail size={20} className="text-red-500 shrink-0" />
                <div className="text-center md:text-left">
                  <p className="text-gray-400 text-sm">contacto@metalbulls.com</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex justify-center items-center">
          <p className="text-gray-500 text-xs tracking-wider">
            © {currentYear} — TODOS LOS DERECHOS RESERVADOS.
          </p>
        </div>
      </div>
    </footer>
  );
}
