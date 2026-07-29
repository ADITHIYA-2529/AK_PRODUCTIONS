import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Gem } from 'lucide-react'
import { cn } from '@/utils/cn'
import { getSiteSettings } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'

const logoImg = "/AK PRODUCTIONS LOGO.png";

// ── Primary nav links for desktop ──
const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
]

// ── Mobile drawer nav links (includes Admin) ──
const MOBILE_NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
  { label: 'Admin', path: '/admin' },
]

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [siteSettings, setSiteSettings] = useState<any>(null)
  const location = useLocation()

  // Load site settings (logo)
  useEffect(() => {
    getSiteSettings()
      .then(data => { if (data) setSiteSettings(data) })
      .catch(err => console.error('SANITY SITE SETTINGS ERROR:', err))
  }, [])

  // Close mobile on route change
  useEffect(() => { setIsMobileOpen(false) }, [location.pathname])

  // Scroll shadow
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Derive logo: Sanity-managed first, then static fallback
  const navLogoSrc = siteSettings?.navbarLogo
    ? urlFor(siteSettings.navbarLogo).width(112).height(112).url()
    : logoImg

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <>
      {/* ── Main Navbar ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/96 backdrop-blur-md shadow-nav border-b border-brand-border/60 py-3'
            : 'bg-white/80  backdrop-blur-sm py-4'
        )}
      >
        <div className="container-luxury flex items-center justify-between">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-3.5 flex-shrink-0 group">
            <div className="relative">
              {/* Gold ring on hover */}
              <div className="absolute inset-0 rounded-full border-2 border-brand-gold/0 group-hover:border-brand-gold/40 transition-all duration-300 scale-110" />
              <img
                src={navLogoSrc}
                alt="AK Productions"
                className="w-16 h-16 md:w-[70px] md:h-[70px] rounded-full object-cover shadow-float-sm border border-brand-border/60"
                loading="lazy"
              />
            </div>
            <div className="leading-none">
              <div className="font-display text-2xl md:text-3xl font-bold text-brand-heading tracking-tight">
                <span>AK</span>
                <span className="text-brand-gold ml-1.5">PRODUCTIONS</span>
              </div>
            </div>
          </Link>

          {/* ── Desktop Links ── */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={() => cn(
                  'relative px-5 py-2.5 text-[11px] font-body font-semibold uppercase tracking-[0.18em] transition-colors duration-300 group rounded-full',
                  isActive(path)
                    ? 'text-brand-gold'
                    : 'text-brand-heading/75 hover:text-brand-gold hover:bg-brand-gold/5'
                )}
              >
                {label}
                {/* Gold underline indicator */}
                <span
                  className={cn(
                    'absolute bottom-1 left-5 right-5 h-[2px] bg-brand-gold rounded-full origin-left transition-transform duration-300',
                    isActive(path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  )}
                />
              </NavLink>
            ))}
          </div>

          {/* ── CTA + Hamburger ── */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden lg:inline-flex btn-gold text-[10px] py-2.5 px-6 font-bold"
            >
              Book Now
            </Link>

            <button
              onClick={() => setIsMobileOpen(v => !v)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-brand-heading/70 hover:text-brand-gold transition-colors rounded-full hover:bg-brand-gold/8"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </motion.nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 bg-white flex flex-col pt-24 pb-10 overflow-y-auto"
          >
            {/* Gold top line */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

            <div className="container-luxury flex flex-col gap-1 flex-1">
              {MOBILE_NAV_LINKS.map(({ label, path }) => (
                <NavLink
                  key={path}
                  to={path}
                  end={path === '/'}
                  className={({ isActive: a }) => cn(
                    'flex items-center justify-between py-4 sm:py-5 border-b border-brand-border/60 text-base font-body font-semibold uppercase tracking-widest transition-colors duration-200',
                    a ? 'text-brand-gold' : 'text-brand-heading/80 hover:text-brand-gold'
                  )}
                >
                  <span>{label}</span>
                  {isActive(path) && (
                    <span className="w-2 h-2 rounded-full bg-brand-gold" />
                  )}
                </NavLink>
              ))}

              <div className="pt-8">
                <Link to="/contact" className="btn-gold w-full justify-center font-bold py-4">
                  Book Consultation
                </Link>
              </div>

              {/* Brand badge */}
              <div className="mt-auto pt-8 flex items-center gap-2 text-brand-body/40">
                <Gem size={12} className="text-brand-gold/50" />
                <span className="text-[10px] uppercase tracking-widest font-body">
                  AK Productions · Premium Event Management · Chennai
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
