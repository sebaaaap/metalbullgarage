"use client";

import Image from "next/image";
import { Facebook, Instagram, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

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
    <footer className="bg-black border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-4 xl:col-span-5">
            <a href="#inicio" className="flex items-center gap-3 mb-8 group">
              <div className="relative w-12 h-12">
                <Image
                  src="/metabulllogo.png"
                  alt="Metal Bulls Garage Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl text-white leading-tight tracking-wider transition-colors group-hover:text-red-600">
                  METAL BULLS
                </span>
                <span className="font-heading text-xs text-[hsl(0,72%,51%)] tracking-[0.3em] leading-tight">
                  GARAGE
                </span>
              </div>
            </a>
            <p className="text-gray-500 text-lg leading-relaxed max-w-sm mb-8">
              Llevando la excelencia mecánica al siguiente nivel con pasión, precisión y potencia. Tu taller de confianza para vehículos de alta gama y uso diario.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-xl bg-[hsl(0,0%,7%)] border border-white/5 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-600 transition-all duration-300">
                <Instagram size={22} />
              </a>
              <a href="#" className="w-12 h-12 rounded-xl bg-[hsl(0,0%,7%)] border border-white/5 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-600 transition-all duration-300">
                <Facebook size={22} />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="lg:col-span-2 xl:col-span-2">
            <h4 className="font-heading text-lg text-white mb-6 uppercase tracking-widest border-l-2 border-red-600 pl-4">Servicios</h4>
            <ul className="space-y-4">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1 group">
                    {link.label}
                    <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="lg:col-span-2 xl:col-span-2">
            <h4 className="font-heading text-lg text-white mb-6 uppercase tracking-widest border-l-2 border-red-600 pl-4">Navegación</h4>
            <ul className="space-y-4">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1 group">
                    {link.label}
                    <ArrowUpRight size={14} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4 xl:col-span-3">
            <h4 className="font-heading text-lg text-white mb-6 uppercase tracking-widest border-l-2 border-red-600 pl-4">Contacto</h4>
            <ul className="space-y-5">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-500 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm font-heading text-white mb-1 uppercase tracking-wider">Dirección</p>
                  <p className="text-gray-500 text-sm">Calle Mecánica #123, Ciudad del Motor</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-500 shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm font-heading text-white mb-1 uppercase tracking-wider">Llámanos</p>
                  <p className="text-gray-500 text-sm">+56 9 1234 5678</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-500 shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm font-heading text-white mb-1 uppercase tracking-wider">Email</p>
                  <p className="text-gray-500 text-sm">contacto@metalbulls.com</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-gray-600 text-sm order-2 sm:order-1">
            © {currentYear} METAL BULLS GARAGE. Todos los derechos reservados.
          </p>
          <div className="flex gap-8 order-1 sm:order-2">
            <a href="#" className="text-xs text-gray-600 hover:text-white transition-colors uppercase tracking-[0.2em]">Privacidad</a>
            <a href="#" className="text-xs text-gray-600 hover:text-white transition-colors uppercase tracking-[0.2em]">Términos</a>
            <a href="#" className="text-xs text-red-600 font-bold uppercase tracking-[0.2em] border-b border-red-600/30">MANTENCIÓN</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
