import { motion } from 'framer-motion'
import { Check, Star, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Package } from '@/constants/packages'
import { formatCurrency } from '@/utils/formatters'
import { cn } from '@/utils/cn'
import { scaleIn } from '@/animations/variants'

interface PackageCardProps {
  pkg: Package
  index?: number
}

export default function PackageCard({ pkg, index = 0 }: PackageCardProps) {
  const tierColors: Record<string, string> = {
    bronze: 'from-amber-700 to-amber-900',
    silver: 'from-slate-400 to-slate-600',
    gold: 'from-gold-400 to-gold-700',
    platinum: 'from-slate-200 to-slate-400',
  }

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className={cn(
        'relative bg-brand-card rounded-2xl overflow-hidden flex flex-col transition-all duration-300 border border-brand-border shadow-sm',
        pkg.popular ? 'border-2 border-brand-gold shadow-md' : 'hover:border-brand-gold hover:shadow-brand-soft'
      )}
    >
      {pkg.popular && (
        <div className="absolute top-0 left-0 right-0 flex justify-center">
          <div className="bg-white px-4 py-1 text-xs font-bold text-brand-gold uppercase tracking-widest border-b border-brand-border shadow-sm rounded-b-lg">
            ✦ Most Popular
          </div>
        </div>
      )}

      {/* Header */}
      <div className={cn('pt-8 pb-6 px-6 bg-gradient-to-br', tierColors[pkg.tier], 'opacity-90')}>
        <div className="text-center">
          <span className="text-white/50 text-lg mb-2 block">{pkg.icon}</span>
          <h3 className="font-display text-2xl font-bold text-white">{pkg.name}</h3>
          <div className="mt-3">
            <span className="text-white/50 text-sm">Starting at</span>
            <div className="font-display text-3xl font-bold text-white mt-0.5">
              {formatCurrency(pkg.price)}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <p className="text-brand-body text-sm leading-relaxed mb-6">{pkg.description}</p>

        {/* Features */}
        <ul className="space-y-3 flex-1 mb-6">
          {pkg.features.map((feat) => (
            <li key={feat} className="flex items-start gap-2.5">
              <Check size={14} className="text-brand-gold mt-0.5 flex-shrink-0" />
              <span className="text-brand-heading text-sm font-medium">{feat}</span>
            </li>
          ))}
          {pkg.notIncluded.map((feat) => (
            <li key={feat} className="flex items-start gap-2.5 opacity-40">
              <span className="text-brand-body/50 text-sm mt-0.5 w-3.5 text-center flex-shrink-0">—</span>
              <span className="text-brand-body/50 text-sm line-through">{feat}</span>
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className={cn(
            'flex items-center justify-center gap-2 py-3 px-6 font-semibold text-sm uppercase tracking-wider transition-all duration-300 rounded-full',
            pkg.popular
              ? 'bg-brand-gold text-white hover:bg-brand-gold-secondary hover:text-brand-heading shadow-sm'
              : 'btn-outline-gold'
          )}
        >
          Book This Package <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  )
}
