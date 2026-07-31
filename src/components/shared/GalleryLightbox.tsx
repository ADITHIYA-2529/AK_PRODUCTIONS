import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react'

interface GalleryLightboxProps {
  images: string[]
  titles?: string[]
  mediaTypes?: string[]   // 'image' | 'video' per item
  initialIndex?: number
  isOpen: boolean
  onClose: () => void
}

export default function GalleryLightbox({
  images,
  titles,
  mediaTypes,
  initialIndex = 0,
  isOpen,
  onClose,
}: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  // Sync index when lightbox is opened
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
    }
  }, [isOpen, initialIndex])

  const prev = () => setCurrentIndex(i => (i - 1 + images.length) % images.length)
  const next = () => setCurrentIndex(i => (i + 1) % images.length)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
    if (e.key === 'Escape') onClose()
  }

  const isVideo = (i: number) => mediaTypes?.[i] === 'video'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-brand-bg/95 backdrop-blur-xl flex items-center justify-center"
          onClick={onClose}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close */}
          <button
            className="absolute top-6 right-6 w-10 h-10 bg-white border border-brand-border rounded-full flex items-center justify-center text-brand-heading hover:text-brand-gold hover:border-brand-gold transition-colors duration-300 z-10 shadow-sm"
            onClick={onClose}
          >
            <X size={20} />
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-6 bg-white border border-brand-border px-4 py-2 rounded-full text-sm text-brand-body font-semibold shadow-sm">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Main Media */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl max-h-[75vh] w-full mx-16 rounded-2xl overflow-hidden border border-brand-border shadow-md bg-white p-2"
              onClick={(e) => e.stopPropagation()}
            >
              {isVideo(currentIndex) ? (
                <video
                  key={images[currentIndex]}
                  src={images[currentIndex]}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain max-h-[72vh] rounded-xl mx-auto"
                />
              ) : (
                <img
                  src={images[currentIndex]}
                  alt={titles?.[currentIndex] || `Gallery image ${currentIndex + 1}`}
                  className="w-full h-full object-contain max-h-[72vh] rounded-xl mx-auto"
                />
              )}
              {titles?.[currentIndex] && (
                <div className="absolute bottom-0 inset-x-0 bg-white/95 border-t border-brand-border p-4 rounded-b-2xl">
                  <p className="text-brand-heading font-display text-base font-semibold">{titles[currentIndex]}</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Prev/Next */}
          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 w-12 h-12 bg-white border border-brand-border rounded-full flex items-center justify-center text-brand-heading hover:text-brand-gold hover:border-brand-gold transition-all duration-300 shadow-md"
                onClick={(e) => { e.stopPropagation(); prev() }}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="absolute right-4 w-12 h-12 bg-white border border-brand-border rounded-full flex items-center justify-center text-brand-heading hover:text-brand-gold hover:border-brand-gold transition-all duration-300 shadow-md"
                onClick={(e) => { e.stopPropagation(); next() }}
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Thumbnails */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 max-w-xs overflow-x-auto p-1 bg-white border border-brand-border rounded-xl shadow-sm scrollbar-hide">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(i) }}
                className={`relative flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  i === currentIndex ? 'border-brand-gold scale-105' : 'border-brand-border opacity-60 hover:opacity-100'
                }`}
              >
                {isVideo(i) ? (
                  <div className="w-full h-full bg-brand-section flex items-center justify-center">
                    <Play size={16} className="text-brand-gold" />
                  </div>
                ) : (
                  <img src={src} alt="" className="w-full h-full object-cover" />
                )}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
