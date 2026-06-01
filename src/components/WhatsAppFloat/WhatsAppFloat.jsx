import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const WhatsAppFloat = () => {
  const waLink =
    "https://wa.me/6281393139307?text=Halo%2C%20saya%20ingin%20tanya%20layanan%20Indo%20Caris%20International";

  return (
    <motion.a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      className="whatsapp-float"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 24px rgba(37, 211, 102, 0.4)",
        cursor: "pointer",
        textDecoration: "none",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      whileHover={{
        scale: 1.1,
        boxShadow: "0 6px 32px rgba(37, 211, 102, 0.6)",
      }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon icon="mdi:whatsapp" style={{ fontSize: "32px", color: "#fff" }} />

      {/* Pulse ring */}
      <span
        style={{
          position: "absolute",
          inset: "-4px",
          borderRadius: "50%",
          border: "2px solid rgba(37, 211, 102, 0.4)",
          animation: "wa-pulse 2s ease-in-out infinite",
        }}
      />

      <style>{`
        @keyframes wa-pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 0; }
        }
        @media (max-width: 640px) {
          .whatsapp-float {
            bottom: 16px !important;
            right: 16px !important;
            width: 56px !important;
            height: 56px !important;
          }
        }
      `}</style>
    </motion.a>
  );
};

export default WhatsAppFloat;
