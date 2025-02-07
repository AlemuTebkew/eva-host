"use client";

import { useState } from "react";
import { FaTelegramPlane, FaTiktok } from "react-icons/fa";
import { motion } from "framer-motion";

export default function SocialButtons() {
  const [isHoveredTelegram, setIsHoveredTelegram] = useState(false);
  const [isHoveredTiktok, setIsHoveredTiktok] = useState(false);

  const openTelegram = () => {
    window.open("https://t.me/eastgafat_group" , "_blank");
  };

  
  return (
    <div className="fixed bottom-8 right-8 z-[999] flex flex-col items-end space-y-3 lg:flex-row lg:gap-3">
      {/* Telegram Button */}
      <motion.div
        onClick={openTelegram}
        onMouseEnter={() => setIsHoveredTelegram(true)}
        onMouseLeave={() => setIsHoveredTelegram(false)}
        whileTap={{ scale: 0.95 }}
        className="flex items-center rounded-full bg-blue-500 text-white shadow-lg transition-all duration-300 hover:bg-blue-600 cursor-pointer"
        style={{
          width: isHoveredTelegram ? "190px" : "40px",
          height: "40px",
          padding: isHoveredTelegram ? "0 16px" : "0 12px",
          justifyContent: isHoveredTelegram ? "space-between" : "center",
        }}
      >
        <motion.div className="flex items-center justify-center w-10 h-10">
          <FaTelegramPlane size={22} />
        </motion.div>
        {isHoveredTelegram && (
          <motion.span
            className="whitespace-nowrap text-sm font-medium ml-3"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            Join Our Telegram
          </motion.span>
        )}
      </motion.div>

      
    </div>
  );
}
