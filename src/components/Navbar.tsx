"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#testimonios", label: "Reseñas" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-black/95 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
          }`}
        id="navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <a href="#inicio" className="flex items-center" aria-label="Ir al inicio">
              <motion.div
                className="relative w-20 h-20 sm:w-[88px] sm:h-[88px] cursor-pointer"
                style={{ filter: "drop-shadow(0 0 12px rgba(220,38,38,0.5))" }}
                whileHover={{
                  rotate: [0, -12, 10, -8, 6, -4, 2, 0],
                  scale: [1, 1.1, 1.08, 1.1, 1.08, 1.1, 1.08, 1.05],
                  filter: [
                    "drop-shadow(0 0 12px rgba(220,38,38,0.5))",
                    "drop-shadow(0 0 28px rgba(220,38,38,0.9))",
                    "drop-shadow(0 0 22px rgba(220,38,38,0.7))",
                    "drop-shadow(0 0 28px rgba(220,38,38,0.9))",
                  ],
                  transition: { duration: 0.55, ease: "easeInOut" },
                }}
                whileTap={{ scale: 0.9, rotate: -8, transition: { duration: 0.15 } }}
              >
                <Image
                  src="/metabulllogo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8" role="navigation" aria-label="Navegación principal">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-heading text-sm text-gray-400 hover:text-red-600 transition-colors duration-300 tracking-wider relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              <a
                href="#contacto"
                id="nav-cta-button"
                className="font-heading text-sm px-5 py-2.5 bg-red-600 text-white rounded tracking-wider hover:bg-red-700 transition-all duration-300"
                style={{ boxShadow: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 20px rgba(220,38,38,0.5)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                COTIZAR
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle"
              className="md:hidden p-2 text-gray-300 hover:text-red-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black/98 backdrop-blur-md border-b border-white/10"
              id="mobile-menu"
            >
              <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    className="font-heading text-base text-gray-400 hover:text-red-500 transition-colors duration-300 py-2 border-b border-white/5 tracking-wider"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#contacto"
                  onClick={handleNavClick}
                  className="font-heading text-sm px-5 py-3 bg-red-600 text-white rounded text-center tracking-wider mt-2"
                >
                  COTIZAR AHORA
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
