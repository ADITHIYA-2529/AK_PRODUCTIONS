import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setSliderPos((x / rect.width) * 100)
  }, [])

  const handleMouseDown = () => {
    isDragging.current = true
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging.current) updateSlider(e.clientX)
  }

  const handleMouseUp = () => {
    isDragging.current = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    updateSlider(e.touches[0].clientX)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl cursor-ew-resize select-none border border-brand-border shadow-sm"
      onTouchMove={handleTouchMove}
    >
      {/* After Image (full width) */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Before Image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: `${10000 / sliderPos}%`, maxWidth: 'none' }}
          draggable={false}
        />
      </div>

      {/* Divider Line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-brand-gold shadow-[0_0_8px_rgba(200,162,74,0.4)]"
        style={{ left: `${sliderPos}%` }}
      >
        {/* Handle */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white border border-brand-gold rounded-full shadow-md flex items-center justify-center cursor-ew-resize z-10 text-brand-gold"
          onMouseDown={handleMouseDown}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M8 5l-5 7 5 7V5zm8 0v14l5-7-5-7z" />
          </svg>
        </motion.div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm border border-brand-border px-3 py-1.5 rounded-lg text-xs font-semibold text-brand-heading uppercase tracking-widest shadow-sm">
        {beforeLabel}
      </div>
      <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm border border-brand-border px-3 py-1.5 rounded-lg text-xs font-semibold text-brand-heading uppercase tracking-widest shadow-sm">
        {afterLabel}
      </div>
    </div>
  )
}
