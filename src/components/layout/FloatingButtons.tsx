import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Phone, ChevronUp, MessageCircle } from 'lucide-react'
import { cn } from '@/utils/cn'
import { getFloatingContact } from '@/sanity/queries'

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [phone, setPhone] = useState('+919677203639')

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Fetch contact phone from Sanity
    getFloatingContact()
      .then((data) => { if (data?.phone) setPhone(data.phone.replace(/[^0-9]/g, '')) })
      .catch(() => {}) // silently fallback

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const whatsappUrl = `https://wa.me/${phone}?text=Hello%20AK%20Productions!%20I%20would%20like%20to%20enquire%20about%20your%20services.`

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2.5 sm:gap-3.5">
      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            onClick={scrollToTop}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-white border border-brand-border transition-all duration-300 shadow-float-sm"
            aria-label="Scroll to top"
          >
            <ChevronUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Phone */}
      <motion.a
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        href={`tel:+${phone}`}
        className="w-12 h-12 rounded-full bg-white border border-brand-border flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-white transition-all duration-300 hover:scale-110 shadow-float-sm"
        aria-label="Call us"
      >
        <Phone size={18} />
      </motion.a>

      {/* WhatsApp */}
      <motion.a
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center shadow-float hover:bg-emerald-400 transition-all duration-300 hover:scale-110 animate-pulse-gold"
        aria-label="WhatsApp us"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </motion.a>

      {/* Sticky Book Button */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        className="hidden md:block"
      >
        <Link
          to="/contact"
          className={cn(
            'flex items-center gap-2 px-4 py-3 bg-brand-gold text-white',
            'text-xs font-bold tracking-wider uppercase rounded-full shadow-float-sm',
            'transition-all duration-300 hover:scale-105 hover:bg-brand-gold-secondary hover:shadow-float'
          )}
        >
          <MessageCircle size={14} />
          Book Now
        </Link>
      </motion.div>
    </div>
  )
}
