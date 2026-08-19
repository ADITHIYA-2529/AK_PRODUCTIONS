import { motion } from 'framer-motion'
import { Star, Quote, MapPin, CheckCircle2 } from 'lucide-react'
import { Testimonial } from '@/constants/testimonials'

interface TestimonialCardProps {
  testimonial: Testimonial
  index?: number
}

export default function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6 }}
      className="group relative bg-white rounded-3xl p-6 sm:p-8 border border-brand-border hover:border-brand-gold/30 shadow-card hover:shadow-card-hover transition-all duration-400 flex flex-col justify-between h-full overflow-hidden"
    >
      {/* Subtle top gold gradient line on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Header: Stars & Quote Icon */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < testimonial.rating ? 'fill-brand-gold text-brand-gold' : 'text-brand-border'}
              />
            ))}
          </div>
          <div className="w-9 h-9 rounded-full bg-brand-section flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-colors duration-300">
            <Quote size={16} />
          </div>
        </div>

        {/* Comment Text */}
        <p className="text-brand-body text-sm sm:text-base leading-relaxed mb-6 font-body italic">
          "{testimonial.comment}"
        </p>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3">
          {testimonial.avatar ? (
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-11 h-11 rounded-full object-cover border border-brand-gold/20 shadow-sm"
              loading="lazy"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-brand-gold/10 text-brand-gold font-display font-bold flex items-center justify-center text-sm border border-brand-gold/20">
              {testimonial.name.charAt(0)}
            </div>
          )}
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-display font-bold text-brand-heading text-sm sm:text-base leading-snug">
                {testimonial.name}
              </h4>
              <CheckCircle2 size={14} className="text-brand-gold fill-brand-gold/10" />
            </div>
            <p className="text-brand-body/70 text-xs font-body">
              {testimonial.role || testimonial.eventType}
            </p>
          </div>
        </div>

        {testimonial.location && (
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-brand-body/60 font-body">
            <MapPin size={12} className="text-brand-gold" />
            <span>{testimonial.location.split(',')[0]}</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
