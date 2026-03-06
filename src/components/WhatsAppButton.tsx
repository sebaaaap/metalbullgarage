"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = "56968305358";
  const message = encodeURIComponent("¡Hola! Me gustaría solicitar una cotización para mi vehículo.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 group pointer-events-auto"
      aria-label="Contactar por WhatsApp"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />

      {/* Pulse Effect */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25 group-hover:opacity-40" />

      {/* Main Button */}
      <div className="relative w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] group-hover:shadow-[0_15px_40px_rgba(37,211,102,0.6)] transition-all">
        <MessageCircle size={32} className="text-white fill-white" />
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 pointer-events-none">
        <div className="bg-white text-gray-900 px-4 py-2 rounded-xl text-sm font-bold shadow-xl whitespace-nowrap">
          ¿Necesitas ayuda? ¡Háblanos!
          <div className="absolute top-full right-6 border-8 border-transparent border-t-white" />
        </div>
      </div>
    </motion.a>
  );
}
