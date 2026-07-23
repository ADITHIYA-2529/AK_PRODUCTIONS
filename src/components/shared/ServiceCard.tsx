import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Heart } from 'lucide-react'
import { Service } from '@/constants/services'
import { useWishlistContext } from '@/contexts/WishlistContext'
import { formatCurrency } from '@/utils/formatters'
import { cn } from '@/utils/cn'

interface ServiceCardProps {
  service: Service
  index?: number
}

export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const { toggleWishlist, isWishlisted } = useWishlistContext()
  const wishlisted = isWishlisted(service.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-4xl border border-brand-border overflow-hidden shadow-card hover:shadow-card-hover hover:border-brand-gold/30 transition-all duration-400"
    >
      {/* ── Image ── */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={service.heroImage}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-heading/55 via-transparent to-transparent" />

        {/* Category badge */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-white/92 text-[10px] text-brand-gold uppercase tracking-widest font-bold rounded-full border border-brand-border shadow-sm">
          {service.category}
        </div>

        {/* Wishlist button */}
        <button
          onClick={() => toggleWishlist(service.id)}
          className="absolute top-3 right-3 w-8 h-8 bg-white/92 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border border-brand-border hover:bg-white hover:border-brand-gold/40"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={14}
            className={cn('transition-all', wishlisted ? 'fill-red-500 text-red-500' : 'text-brand-body/60')}
          />
        </button>

        {/* Price badge */}
        {service.startingPrice > 0 && (
          <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm rounded-xl px-2.5 py-1.5 text-right">
            <div className="text-[9px] text-white/70 uppercase tracking-wider">From</div>
            <div className="text-white font-display font-bold text-sm">
              {service.slug === 'catering'
                ? `${formatCurrency(service.startingPrice)}/person`
                : formatCurrency(service.startingPrice)}
            </div>
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="p-6">
        <h3 className="font-display text-lg text-brand-heading font-bold mb-1.5 group-hover:text-brand-gold transition-colors duration-300">
          {service.name}
        </h3>
        <p className="text-brand-body text-sm leading-relaxed mb-4 line-clamp-2 font-light">
          {service.description}
        </p>

        {/* Feature tags */}
        {service.features?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {service.features.slice(0, 3).map(feat => (
              <span
                key={feat}
                className="text-[10px] text-brand-body/70 bg-brand-section px-2.5 py-0.5 rounded-full border border-brand-border"
              >
                {feat}
              </span>
            ))}
            {service.features.length > 3 && (
              <span className="text-[10px] text-brand-gold bg-brand-gold/10 px-2.5 py-0.5 rounded-full border border-brand-gold/20">
                +{service.features.length - 3} more
              </span>
            )}
          </div>
        )}

        <Link
          to={`/services/${service.slug}`}
          className="inline-flex items-center gap-1.5 text-brand-gold hover:text-brand-brown text-[11px] font-semibold uppercase tracking-wider transition-colors group/link"
        >
          Explore Service
          <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}
