import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

interface BreadcrumbItem {
  label: string
  path?: string
}

interface PageHeaderProps {
  image: string
  title: string
  subtitle: string
  breadcrumbs: BreadcrumbItem[]
  className?: string
}

export default function PageHeader({
  image,
  title,
  subtitle,
  breadcrumbs,
  className,
}: PageHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  // Parallax zoom & offset calculation
  // Binds the scroll positions [0 to 600px] to image vertical shift [0 to 180px] and scale [1.05 to 1.25]
  const y = useTransform(scrollY, [0, 600], [0, 180])
  const scale = useTransform(scrollY, [0, 600], [1.05, 1.25])

  return (
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 1] }}
      className={cn(
        'relative h-[460px] md:h-[500px] w-full flex items-center justify-center overflow-hidden rounded-b-[40px] md:rounded-b-[56px] shadow-float-lg bg-brand-bg',
        className
      )}
    >
      {/* Parallax Image Wrapper */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          style={{ y, scale }}
          transition={{ duration: 0.1, ease: 'linear' }}
          className="w-full h-[120%] object-cover object-center"
        />
        {/* Cinematic dark overlay (38%) */}
        <div className="absolute inset-0 bg-black/38 z-10" />
      </div>

      {/* Content Container */}
      <div className="container-luxury relative z-20 text-center flex flex-col items-center justify-center pt-12">
        {/* Breadcrumb Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="flex items-center gap-2 mb-4 font-body text-xs font-semibold uppercase tracking-widest"
        >
          <Link to="/" className="text-white/70 hover:text-brand-gold-secondary transition-colors">
            Home
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-brand-gold-secondary font-display font-medium">/</span>
              {crumb.path ? (
                <Link
                  to={crumb.path}
                  className="text-brand-gold-secondary hover:text-white transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-brand-gold-secondary font-bold">
                  {crumb.label}
                </span>
              )}
            </div>
          ))}
        </motion.nav>

        {/* Big Luxury Title Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ textShadow: '0 5px 25px rgba(0,0,0,0.35)' }}
          className="font-display text-4xl md:text-[60px] font-extrabold uppercase tracking-wide leading-tight mb-4 select-none bg-gradient-to-r from-[#F8E8B0] via-[#E6C97A] via-[#C8A24A] to-[#9B6A18] bg-clip-text text-transparent"
        >
          {title}
        </motion.h1>

        {/* Elegant Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
          className="text-white/90 text-sm md:text-base font-accent tracking-wider font-light max-w-xl mx-auto"
        >
          {subtitle}
        </motion.p>
      </div>
    </motion.section>
  )
}
