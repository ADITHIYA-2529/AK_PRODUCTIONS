import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SplashScreenProps {
  onComplete: () => void
}

interface Particle {
  id: number
  size: number
  x: number
  y: number
  delay: number
  duration: number
  opacity: number
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // 4.2s - 5.0s: Trigger smooth fade out to website
    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, 4200)

    // 5.0s: Complete animation and unmount
    const finishTimer = setTimeout(() => {
      onComplete()
    }, 5000)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(finishTimer)
    }
  }, [onComplete])

  // Floating Golden Particles
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 50 }).map((_, index) => ({
      id: index,
      size: Math.random() * 3.5 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 4 + 4,
      opacity: Math.random() * 0.7 + 0.2,
    }))
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999999] overflow-hidden bg-black flex items-center justify-center select-none pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: fadeOut ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* ── Pure Black Background (#000000) ── */}
        <div className="absolute inset-0 bg-black" />

        {/* ── Luxury Dark Vignette ── */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.95)_100%)] pointer-events-none z-10" />

        {/* ── 0.0s – 0.5s: Golden Ambient Center Glow ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: [0, 0.4, 0.25],
            scale: [0.6, 1.25, 1.0],
          }}
          transition={{
            duration: 3.5,
            ease: 'easeOut',
          }}
          className="absolute w-[800px] h-[800px] sm:w-[1000px] sm:h-[1000px] rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.22)_0%,rgba(184,134,11,0.08)_45%,transparent_70%)] pointer-events-none z-0"
        />

        {/* ── 0.0s – 5.0s: Floating Tiny Golden Particles ── */}
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-[#FFE28A] shadow-[0_0_8px_#D4AF37] pointer-events-none z-10"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: [0, p.opacity, 0],
              y: [20, -140],
              scale: [0.4, 1.2, 0.5],
            }}
            transition={{
              repeat: Infinity,
              delay: p.delay,
              duration: p.duration,
              ease: 'linear',
            }}
          />
        ))}

        {/* ── 3.3s – 4.2s: Camera Slow Push-in Container ── */}
        <motion.div
          className="relative flex flex-col items-center justify-center z-20 px-4"
          initial={{ scale: 0.96 }}
          animate={{
            scale: [0.96, 1.0, 1.04, 1.04],
          }}
          transition={{
            duration: 4.8,
            times: [0, 0.3, 0.85, 1],
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* ── Volumetric Light Rays ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.35, 0.18],
              scale: [0.5, 1.3, 1.1],
              rotate: [0, 90],
            }}
            transition={{
              duration: 4.5,
              ease: 'linear',
            }}
            className="absolute w-[650px] h-[650px] rounded-full pointer-events-none z-0"
          >
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,215,100,0.12)_30deg,transparent_60deg,rgba(255,215,100,0.1)_90deg,transparent_120deg,rgba(255,215,100,0.12)_150deg,transparent_180deg,rgba(255,215,100,0.1)_210deg,transparent_240deg,rgba(255,215,100,0.12)_270deg,transparent_300deg,rgba(255,215,100,0.1)_330deg,transparent_360deg)] blur-2xl rounded-full" />
          </motion.div>

          {/* ── 3D Emblem & Logo Container (Perspective 1200px) ── */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 flex items-center justify-center [perspective:1200px]">

            {/* ── 0.5s – 1.3s: Golden Light Travelling in Circular Motion (Forming Metallic Ring) ── */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible [transform:translateZ(10px)]"
              viewBox="0 0 100 100"
            >
              <defs>
                <linearGradient id="goldRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF2B2" stopOpacity="1" />
                  <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#8A6414" stopOpacity="0.6" />
                </linearGradient>
                <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Glowing Metallic Ring Formation */}
              <motion.circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke="url(#goldRingGrad)"
                strokeWidth="1.4"
                filter="url(#goldGlow)"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0, rotate: -90 }}
                animate={{
                  pathLength: [0, 1],
                  opacity: [0, 1, 0.85],
                  rotate: [-90, 270],
                }}
                transition={{
                  pathLength: { delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  opacity: { delay: 0.5, duration: 0.8, ease: 'easeOut' },
                  rotate: { delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                }}
              />
            </svg>

            {/* ── 1.3s – 2.0s: 3D Transparent AK PRODUCTIONS Logo Reveal (Background Removed) ── */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.5,
                rotateX: 18,
                rotateY: -15,
                translateZ: -50,
                filter: 'blur(20px) drop-shadow(0 0 0px rgba(212,175,55,0))',
              }}
              animate={{
                opacity: 1,
                scale: [0.5, 1.05, 1.0],
                rotateX: [18, -5, 0],
                rotateY: [-15, 6, 0],
                translateZ: [-50, 30, 20],
                filter: [
                  'blur(0px) drop-shadow(0 0 0px rgba(212,175,55,0))',
                  'blur(0px) drop-shadow(0 0 45px rgba(255,215,100,0.75))',
                  'blur(0px) drop-shadow(0 0 25px rgba(212,175,55,0.4))',
                ],
              }}
              transition={{
                opacity: { delay: 1.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                scale: { delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                rotateX: { delay: 1.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                rotateY: { delay: 1.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                translateZ: { delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                filter: { delay: 1.3, duration: 1.5, times: [0, 0.5, 1], ease: 'easeInOut' },
              }}
              className="relative w-full h-full flex items-center justify-center z-30 rounded-full [transform-style:preserve-3d]"
            >
              {/* 3D Depth Extrusion Shadow Layer */}
              <img
                src="/AK PRODUCTIONS LOGO.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover scale-[1.02] pointer-events-none rounded-full mix-blend-lighten filter blur-[3px] brightness-75 drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] [transform:translateZ(-20px)]"
              />

              {/* Main 3D Gold Emblem (Background Removed via Blend Lighten/Screen) */}
              <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center relative z-30 [clip-path:circle(49.8%_at_50%_50%)] mix-blend-lighten [transform:translateZ(25px)]">
                <img
                  src="/AK PRODUCTIONS LOGO.png"
                  alt="AK PRODUCTIONS"
                  className="w-full h-full object-cover scale-[1.02] relative z-30 filter brightness-115 contrast-125 drop-shadow-[0_15px_30px_rgba(255,215,100,0.5)]"
                />
              </div>
            </motion.div>
          </div>

          {/* ── 2.0s – 2.6s: Text Reveal ("AK PRODUCTIONS") ── */}
          <div className="overflow-hidden mt-8">
            <motion.h1
              initial={{
                opacity: 0,
                y: 30,
                letterSpacing: '1.5rem',
              }}
              animate={{
                opacity: 1,
                y: 0,
                letterSpacing: '0.45rem',
              }}
              transition={{
                delay: 2.0,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-center uppercase font-bold tracking-[0.45rem] text-transparent bg-clip-text bg-gradient-to-r from-[#A97824] via-[#FFE28A] to-[#B8860B] text-2xl sm:text-3xl md:text-4xl drop-shadow-[0_0_20px_rgba(255,215,80,0.35)] whitespace-nowrap pl-[0.45rem]"
            >
              AK PRODUCTIONS
            </motion.h1>
          </div>

          {/* Premium Subtitle / Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.7 }}
            className="mt-3 text-[11px] sm:text-xs uppercase tracking-[0.55rem] text-yellow-100/70 pl-[0.55rem]"
          >
            Creating Extraordinary Experiences
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}