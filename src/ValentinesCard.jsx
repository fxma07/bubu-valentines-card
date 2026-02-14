import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** Card size – increase these to make the card bigger (width, height in px) */
const CARD_WIDTH = 400;
const CARD_HEIGHT = 500;

/** When open, card shifts by this many px so the inside stays centered (tweak if needed) */
const OPEN_CENTER_OFFSET_X = 180;

/** Simple 5-petal flower SVG for background decoration */
function FlowerIcon({ className, size = 40, opacity = 0.35, style }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity, ...style }}
      aria-hidden
    >
      <circle cx="20" cy="20" r="4" fill="#f9a8d4" />
      <ellipse cx="20" cy="12" rx="6" ry="8" fill="#fbcfe8" transform="rotate(0 20 20)" />
      <ellipse cx="20" cy="12" rx="6" ry="8" fill="#fbcfe8" transform="rotate(72 20 20)" />
      <ellipse cx="20" cy="12" rx="6" ry="8" fill="#fbcfe8" transform="rotate(144 20 20)" />
      <ellipse cx="20" cy="12" rx="6" ry="8" fill="#fbcfe8" transform="rotate(216 20 20)" />
      <ellipse cx="20" cy="12" rx="6" ry="8" fill="#fbcfe8" transform="rotate(288 20 20)" />
    </svg>
  );
}

/** Small rose-style flower for background */
function RoseIcon({ className, size = 32, opacity = 0.3 }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }} aria-hidden>
      <circle cx="16" cy="16" r="3" fill="#e11d48" />
      <ellipse cx="16" cy="10" rx="5" ry="7" fill="#fb7185" />
      <ellipse cx="16" cy="10" rx="5" ry="7" fill="#fb7185" transform="rotate(60 16 16)" />
      <ellipse cx="16" cy="10" rx="5" ry="7" fill="#fb7185" transform="rotate(120 16 16)" />
      <ellipse cx="16" cy="10" rx="5" ry="7" fill="#fb7185" transform="rotate(180 16 16)" />
      <ellipse cx="16" cy="10" rx="5" ry="7" fill="#fb7185" transform="rotate(240 16 16)" />
      <ellipse cx="16" cy="10" rx="5" ry="7" fill="#fb7185" transform="rotate(300 16 16)" />
    </svg>
  );
}

export default function ValentinesCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex overflow-x-hidden relative justify-center items-center p-4 w-full min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-red-50">
      {/* Background flowers – clustered closer to the card */}
      <div className="overflow-hidden absolute inset-0 z-0 pointer-events-none" aria-hidden>
        {/* Left of card */}
        <FlowerIcon className="absolute top-[28%] left-[12%]" size={48} opacity={0.28} />
        <RoseIcon className="absolute top-[22%] left-[18%]" size={36} opacity={0.25} />
        <FlowerIcon className="absolute top-[38%] left-[8%]" size={40} opacity={0.24} style={{ transform: "rotate(-15deg)" }} />
        <FlowerIcon className="absolute top-[50%] left-[14%]" size={44} opacity={0.26} style={{ transform: "rotate(8deg)" }} />
        <RoseIcon className="absolute top-[58%] left-[10%]" size={32} opacity={0.22} />
        <FlowerIcon className="absolute top-[65%] left-[16%]" size={36} opacity={0.23} style={{ transform: "rotate(-10deg)" }} />
        {/* Right of card */}
        <FlowerIcon className="absolute top-[26%] right-[14%]" size={44} opacity={0.25} style={{ transform: "rotate(12deg)" }} />
        <RoseIcon className="absolute top-[32%] right-[10%]" size={40} opacity={0.26} />
        <FlowerIcon className="absolute top-[42%] right-[16%]" size={38} opacity={0.24} style={{ transform: "rotate(-8deg)" }} />
        <RoseIcon className="absolute top-[48%] right-[12%]" size={28} opacity={0.22} />
        <FlowerIcon className="absolute top-[55%] right-[14%]" size={42} opacity={0.25} style={{ transform: "rotate(5deg)" }} />
        <FlowerIcon className="absolute top-[62%] right-[10%]" size={34} opacity={0.23} />
        {/* Above card */}
        <RoseIcon className="absolute top-[18%] left-[38%]" size={32} opacity={0.24} />
        <FlowerIcon className="absolute top-[14%] left-[42%]" size={40} opacity={0.22} style={{ transform: "rotate(-18deg)" }} />
        <FlowerIcon className="absolute top-[20%] right-[36%]" size={36} opacity={0.23} />
        {/* Below card */}
        <FlowerIcon className="absolute bottom-[22%] left-[40%]" size={44} opacity={0.26} style={{ transform: "rotate(10deg)" }} />
        <RoseIcon className="absolute bottom-[18%] right-[38%]" size={36} opacity={0.24} />
        <FlowerIcon className="absolute bottom-[28%] left-[44%]" size={30} opacity={0.2} />
        <RoseIcon className="absolute bottom-[25%] right-[42%]" size={28} opacity={0.21} />
        {/* Extra fill – very close to card edges */}
        <FlowerIcon className="absolute top-[35%] left-[22%]" size={28} opacity={0.2} />
        <RoseIcon className="absolute top-[44%] right-[24%]" size={24} opacity={0.19} />
        <FlowerIcon className="absolute top-[52%] left-[20%]" size={26} opacity={0.21} style={{ transform: "rotate(-5deg)" }} />
      </div>

      <div className="flex relative z-10 flex-col gap-4 items-center shrink-0">
        {/* Hint on top of the card – only when closed */}
        {!isOpen && <p className="z-20 text-lg animate-pulse pointer-events-none text-rose-400/90 font-script">Click the card to open 💕</p>}

        <div
          className="flex relative justify-center items-center shrink-0"
          style={{
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            perspective: "2000px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          {/* When open, animate card back to center (offset compensates for flip) */}
          <motion.div
            className="overflow-visible relative"
            style={{
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              transformStyle: "preserve-3d",
              transform: "translateZ(20px)",
            }}
            initial={false}
            animate={{
              x: isOpen ? OPEN_CENTER_OFFSET_X : 0,
            }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: isOpen ? 0.5 : 0,
            }}
          >
            {/* Inside (message) – behind the cover */}
            <div
              className="overflow-hidden absolute inset-0 z-0 rounded-2xl border shadow-xl border-rose-200/50"
              style={{
                background: "linear-gradient(145deg, #fff5f5 0%, #ffe4e6 50%, #fecdd3 100%)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08), inset 0 0 60px rgba(255,255,255,0.5)",
              }}
            >
              <div className="flex overflow-y-auto flex-col justify-center items-center p-8 h-full md:p-10 text-rose-900/90">
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="message"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="text-center max-w-[90%] space-y-5 md:space-y-6"
                    >
                      <p className="text-2xl leading-8 font-script">
                        Thank you for being you — my favorite person, my best friend, and the one who makes my heart full. Thank you for being patient with me
                        and for always being there for me.
                      </p>
                      <p className="pt-2 text-xl text-rose-600 font-script md:text-2xl">Forever yours, Bubu 💗</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>

            {/* Front cover – opens like a book (3D flip) */}
            <motion.div
              className="absolute inset-0 z-10 cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "0% 50% 0px",
              }}
              initial={false}
              animate={{
                rotateY: isOpen ? [0, -90, -180] : [-180, -90, 0],
              }}
              transition={{
                duration: 1.1,
                ease: [0.25, 0.46, 0.45, 0.94],
                times: [0, 0.5, 1],
              }}
              onClick={() => !isOpen && setIsOpen(true)}
            >
              <div
                className="overflow-hidden absolute inset-0 rounded-2xl border shadow-xl border-rose-200/50"
                style={{
                  backfaceVisibility: "hidden",
                  background: "linear-gradient(145deg, #fda4af 0%, #fb7185 35%, #e11d48 100%)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 8px 24px rgba(0,0,0,0.12)",
                }}
              >
                <div className="flex absolute inset-0 flex-col justify-center items-center p-6 text-white">
                  <motion.span
                    className="text-4xl font-bold text-center drop-shadow-lg md:text-5xl font-script"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    Happy Valentine's
                  </motion.span>
                  <motion.span
                    className="mt-4 text-6xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  >
                    💕
                  </motion.span>
                </div>
                <div className="absolute top-4 right-4 text-2xl text-white/30">♥</div>
                <div className="absolute left-4 bottom-6 text-xl text-white/30">♥</div>
              </div>
              {/* Back of cover – message visible when cover is flipped open */}
              <div
                className="flex overflow-hidden absolute inset-0 flex-col items-start p-8 rounded-2xl border border-rose-200/30"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  background: "linear-gradient(145deg, #fecdd3 0%, #fda4af 100%)",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.2)",
                }}
              >
                <p className="text-3xl text-start font-script text-rose-800/90">To my Bubu,</p>
                <p className="mt-4 font-serif text-xl italic leading-8 text-rose-700/90 indent-4 text-balance">
                  Another year and another Valentine's Day. We've been through a lot together and I'm so grateful to have you in my life. I am in love with you
                  more than ever. I am so proud that our love has grown stronger through the years and I can't wait to see what the future holds for us.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
