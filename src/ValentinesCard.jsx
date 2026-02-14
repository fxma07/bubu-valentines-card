import { useState, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** Desktop card size (px) */
const CARD_WIDTH_DESKTOP = 400;
const CARD_HEIGHT_DESKTOP = 500;
const OPEN_OFFSET_DESKTOP = 180;

/** Breakpoint below which we use mobile sizing */
const MOBILE_BREAKPOINT = 480;

/** Responsive: isMobile and openOffset. Card size is done via CSS so it works before JS. */
function useCardSize() {
  const [size, setSize] = useState(() => ({
    isMobile: typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT,
    offset: typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT ? 0 : OPEN_OFFSET_DESKTOP,
  }));

  useLayoutEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setSize((prev) => ({
        ...prev,
        isMobile: mobile,
        offset: mobile ? 0 : OPEN_OFFSET_DESKTOP,
      }));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

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
  /** On mobile: 1 = first page (To my Bubu), 2 = second page (main message). Only used when isOpen && isMobile. */
  const [mobilePage, setMobilePage] = useState(1);
  const { offset: openOffset, isMobile } = useCardSize();

  const handleOpen = () => {
    if (!isOpen) {
      setMobilePage(1);
      setIsOpen(true);
    }
  };


  return (
    <div className="flex overflow-x-hidden relative justify-center items-center p-3 sm:p-4 w-full min-h-[100dvh] bg-gradient-to-br from-rose-100 via-pink-50 to-red-50">
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
        {!isOpen && (
          <p className="z-20 px-2 text-lg text-center animate-pulse pointer-events-none sm:text-lg text-rose-400/90 font-script">
            <span className="sm:hidden">Tap the card to open 💕</span>
            <span className="hidden sm:inline">Click the card to open 💕</span>
          </p>
        )}

        <div
          className="flex relative justify-center items-center shrink-0 card-container"
          style={{
            perspective: "2000px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          {/* When open, animate card back to center (offset compensates for flip). Size via CSS so responsive before JS. */}
          <motion.div
            className="overflow-visible relative card-inner"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(20px)",
            }}
            initial={false}
            animate={{
              x: isOpen && !isMobile ? openOffset : 0,
            }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: isOpen && !isMobile ? 0.5 : 0,
            }}
          >
            {/* Inside (message) – behind the cover. On mobile: two pages with flip; on desktop: single main message. */}
            <div
              className="overflow-hidden absolute inset-0 z-0 rounded-2xl border shadow-xl border-rose-200/50"
              style={{
                background: "linear-gradient(145deg, #fff5f5 0%, #ffe4e6 50%, #fecdd3 100%)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08), inset 0 0 60px rgba(255,255,255,0.5)",
              }}
            >
              {isOpen && isMobile ? (
                /* Mobile: two-page flip */
                <motion.div
                  className="relative w-full h-full"
                  style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
                  initial={false}
                  animate={{ rotateY: mobilePage === 2 ? 180 : 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* Page 1 – To my Bubu (back-of-cover letter) */}
                  <div
                    className="absolute inset-0 flex flex-col overflow-y-auto p-5 text-rose-900/90"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <p className="text-2xl font-script text-rose-800/90">To my Bubu,</p>
                    <p className="mt-3 font-serif text-lg italic leading-relaxed text-rose-700/90 indent-2 text-balance flex-1">
                      Another year and another Valentine's Day. We've been through a lot together and I'm so grateful to have you in my life. I am in love with you
                      more than ever. I am so proud that our love has grown stronger through the years and I can't wait to see what the future holds for us.
                    </p>
                    <button
                      type="button"
                      onClick={() => setMobilePage(2)}
                      className="mt-4 py-2.5 px-4 rounded-xl bg-rose-400/80 hover:bg-rose-500/90 text-white font-script text-xl shadow-md active:scale-[0.98]"
                    >
                      Next →
                    </button>
                  </div>
                  {/* Page 2 – main message (flipped, so rotateY 180 so content reads correct) */}
                  <div
                    className="absolute inset-0 flex flex-col overflow-y-auto p-5 text-rose-900/90"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setMobilePage(1)}
                      className="mb-2 self-start py-1.5 px-3 rounded-lg text-rose-600 hover:bg-rose-100/80 font-script text-lg"
                    >
                      ← Back
                    </button>
                    <div className="flex-1 flex flex-col justify-center text-center max-w-[95%] mx-auto space-y-4">
                      <p className="text-xl leading-relaxed font-script">
                        Thank you for being you — my favorite person, my best friend, and the one who makes my heart full. Thank you for being patient with me
                        and for always being there for me.
                      </p>
                      <p className="pt-2 text-xl text-rose-600 font-script">Forever yours, Bubu 💗</p>
                    </div>
                  </div>
                </motion.div>
              ) : isOpen ? (
                /* Desktop: single main message */
                <div className="flex overflow-y-auto flex-col justify-center items-center p-5 h-full sm:p-8 md:p-10 text-rose-900/90">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-center max-w-[95%] sm:max-w-[90%] space-y-4 sm:space-y-5 md:space-y-6"
                  >
                    <p className="text-lg leading-relaxed sm:text-2xl sm:leading-8 font-script">
                      Thank you for being you — my favorite person, my best friend, and the one who makes my heart full. Thank you for being patient with me
                      and for always being there for me.
                    </p>
                    <p className="pt-2 text-lg text-rose-600 sm:text-xl font-script md:text-2xl">Forever yours, Bubu 💗</p>
                  </motion.div>
                </div>
              ) : null}
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
              onClick={handleOpen}
            >
              <div
                className="overflow-hidden absolute inset-0 rounded-2xl border shadow-xl border-rose-200/50"
                style={{
                  backfaceVisibility: "hidden",
                  background: "linear-gradient(145deg, #fda4af 0%, #fb7185 35%, #e11d48 100%)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 8px 24px rgba(0,0,0,0.12)",
                }}
              >
                <div className="flex absolute inset-0 flex-col justify-center items-center p-4 text-white sm:p-6">
                  <motion.span
                    className="px-2 text-3xl font-bold text-center drop-shadow-lg sm:text-4xl md:text-5xl font-script"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    Happy Valentine's
                  </motion.span>
                  <motion.span
                    className="mt-2 text-5xl sm:mt-4 sm:text-6xl"
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
              {/* Back of cover – on desktop show message; on mobile show blank (same content is Page 1 inside) */}
              <div
                className="flex overflow-hidden absolute inset-0 flex-col items-start rounded-2xl border border-rose-200/30 sm:p-8"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  background: "linear-gradient(145deg, #fecdd3 0%, #fda4af 100%)",
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.2)",
                }}
              >
                {!isMobile && (
                  <>
                    <p className="p-5 sm:p-0 text-2xl sm:text-3xl text-start font-script text-rose-800/90">To my Bubu,</p>
                    <p className="p-5 pt-3 font-serif text-base italic leading-relaxed sm:pt-4 sm:text-xl sm:leading-8 text-rose-700/90 indent-2 sm:indent-4 text-balance sm:p-0">
                      Another year and another Valentine's Day. We've been through a lot together and I'm so grateful to have you in my life. I am in love with you
                      more than ever. I am so proud that our love has grown stronger through the years and I can't wait to see what the future holds for us.
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
