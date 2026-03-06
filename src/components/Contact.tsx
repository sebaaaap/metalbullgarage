"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { services } from "./Services";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    service: "",
    message: "",
  });

  const servicesList = services.map(s => s.title);

  const serviceSelectRef = useRef<HTMLSelectElement>(null);

  // Pre-selecciona el servicio al llegar desde una tarjeta de servicio
  useEffect(() => {
    const handler = (e: Event) => {
      const serviceName = (e as CustomEvent<string>).detail;
      setFormData((prev) => ({ ...prev, service: serviceName }));
      // Pequeño delay para que el scroll termine antes de hacer focus
      setTimeout(() => {
        if (serviceSelectRef.current) {
          serviceSelectRef.current.focus();
          serviceSelectRef.current.classList.add("ring-2", "ring-red-600");
          setTimeout(() => {
            serviceSelectRef.current?.classList.remove("ring-2", "ring-red-600");
          }, 2000);
        }
      }, 800);
    };
    window.addEventListener("service-preselect", handler);
    return () => window.removeEventListener("service-preselect", handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("¡Cotización solicitada con éxito!");
    setFormData({ name: "", brand: "", model: "", year: "", service: "", message: "" });
  };

  return (
    <section id="contacto" className="py-24 relative bg-[hsl(0,0%,4%)] overflow-hidden min-h-[800px] flex items-center">
      {/* Decorative background logo or pattern */}
      <div className="absolute -bottom-24 -right-24 opacity-[0.02] rotate-12 pointer-events-none z-0">
        <div className="w-[600px] h-[600px] border-[40px] border-red-600 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left Side: Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-red-600/10 border border-red-600/20 rounded-full">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-red-400 text-xs font-heading tracking-widest text-nowrap">CONTACTO DIRECTO</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-heading mb-8 leading-tight">
              <span className="text-white">¿LISTO PARA</span><br />
              <span className="text-red-600">COTIZAR</span>
              <span className="text-white block">TU SERVICIO?</span>
            </h2>

            <p className="text-gray-300 text-lg mb-12 leading-relaxed max-w-md">
              Completa el formulario con los datos de tu vehículo y el servicio que necesitas. Te enviaremos una cotización detallada en minutos.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-500 group-hover:bg-red-600 transition-all duration-400 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-heading text-lg text-white mb-1 uppercase">UBICACIÓN</h4>
                  <p className="text-gray-400">Santa Luisa 173, Quilicura, Región Metropolitana</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-500 group-hover:bg-red-600 transition-all duration-400 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-heading text-lg text-white mb-1 uppercase">WHATSAPP</h4>
                  <p className="text-gray-400">+56 9 6830 5358</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-500 group-hover:bg-red-600 transition-all duration-400 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-heading text-lg text-white mb-1 uppercase">HORARIO</h4>
                  <p className="text-gray-400">Lun - Vie: 9:00 - 19:00 | Sáb: 9:00 - 14:00</p>
                </div>
              </div>
            </div>


          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-10 relative shadow-2xl overflow-hidden mt-8 sm:mt-0">
              {/* Internal glow */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-900" />

              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-heading font-medium text-gray-400 uppercase tracking-widest pl-1">Nombre</label>
                  <input
                    required
                    type="text"
                    placeholder="Tu nombre completo"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-red-600 transition-colors text-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-heading font-medium text-gray-400 uppercase tracking-widest pl-1">Marca</label>
                    <input
                      required
                      type="text"
                      placeholder="Ej. Toyota"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-red-600 transition-colors text-sm"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-heading font-medium text-gray-400 uppercase tracking-widest pl-1">Modelo</label>
                    <input
                      required
                      type="text"
                      placeholder="Ej. Hilux"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-red-600 transition-colors text-sm"
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-heading font-medium text-gray-400 uppercase tracking-widest pl-1">Año</label>
                    <input
                      required
                      type="text"
                      placeholder="2023"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-red-600 transition-colors text-sm"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-heading font-medium text-gray-400 uppercase tracking-widest pl-1">Servicio a Cotizar</label>
                  <select
                    ref={serviceSelectRef}
                    required
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-red-600 transition-all text-sm appearance-none cursor-pointer focus:ring-2 focus:ring-red-600/20"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  >
                    <option value="" disabled>Selecciona un servicio</option>
                    {servicesList.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-heading font-medium text-gray-400 uppercase tracking-widest pl-1">Comentario / Detalles</label>
                  <textarea
                    rows={3}
                    placeholder="Cuéntanos más sobre lo que necesita tu vehículo..."
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-red-600 transition-colors resize-none text-sm"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-heading text-lg tracking-widest py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 hover:shadow-[0_10px_30px_rgba(220,38,38,0.3)] mt-4"
                >
                  SOLICITAR COTIZACIÓN
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>

        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 rounded-3xl overflow-hidden border border-white/10 h-[400px] grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3332.6738221!2d-70.7406829!3d-33.3467031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c10000000000%3A0x0!2zU2FudGEgTHVpc2EgMTczLCBRdWlsaWN1cmEsIFJlZ2nDs24gTWV0cm9wb2xpdGFuYQ!5e0!3m2!1ses-419!2scl!4v1709164800000!5m2!1ses-419!2scl"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Metal Bulls Garage"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
