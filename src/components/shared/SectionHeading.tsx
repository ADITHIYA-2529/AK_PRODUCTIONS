import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { fadeInUp, staggerContainer } from '@/animations/variants'

interface SectionHeadingProps {
  pretitle?: string
  title: string
  highlight?: string
  subtitle?: string
  centered?: boolean
  className?: string
  light?: boolean
}

export default function SectionHeading({
  pretitle,
  title,
  highlight,
  subtitle,
  centered = true,
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={cn(
        'mb-12 md:mb-16',
        centered && 'text-center',
        className
      )}
    >
      {pretitle && (
        <motion.div
          variants={fadeInUp}
          className={cn('flex items-center gap-3 mb-4', centered ? 'justify-center' : '')}
        >
          <span className="gold-line" />
          <span className="text-brand-gold text-[11px] font-body font-semibold uppercase tracking-[0.26em]">
            {pretitle}
          </span>
          {centered && <span className="gold-line" />}
        </motion.div>
      )}

      <motion.h2
        variants={fadeInUp}
        className={cn(
          'font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight',
          light ? 'text-white' : 'text-brand-heading'
        )}
      >
        {title}{' '}
        {highlight && (
          <span className="text-gradient-gold">{highlight}</span>
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={fadeInUp}
          className={cn(
            'mt-4 text-base md:text-lg max-w-2xl leading-relaxed font-body font-light',
            light ? 'text-white/70' : 'text-brand-body',
            centered && 'mx-auto'
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
