import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { getContactData, getSiteSettings } from '@/sanity/queries'
import { urlFor } from '@/sanity/image'
import { Instagram, Facebook, Phone, Mail, MapPin, ArrowRight, Gem } from 'lucide-react'
import { staggerContainer, fadeInUp } from '@/animations/variants'

const logoImg = "/AK PRODUCTIONS LOGO.png";

const FOOTER_SERVICES = [
  { label: 'Wedding Decoration', path: '/services/wedding-decoration' },
  { label: 'Corporate Events', path: '/services/corporate-events' },
  { label: 'Birthday Decoration', path: '/services/birthday-decoration' },
  { label: 'Photography', path: '/services/photography' },
  { label: 'Stage Decoration', path: '/services/theme-decoration' },
  { label: 'All Services', path: '/services' },
]

const FOOTER_QUICK_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Events', path: '/events' },
  { label: 'Contact', path: '/contact' },
]

export default function Footer() {
  const [contact, setContact] = useState<any>(null)
  const [siteSettings, setSiteSettings] = useState<any>(null)

  useEffect(() => {
    getContactData()
      .then(data => { if (data) setContact(data) })
      .catch(err => console.error('SANITY ERROR:', err))
    getSiteSettings()
      .then(data => { if (data) setSiteSettings(data) })
      .catch(err => console.error('SANITY SITE SETTINGS ERROR:', err))
  }, [])

  const phone = contact?.phone || '+91 96772 03639'
  const email = contact?.email || 'akeventschennai@gmail.com'
  const instagramUrl = contact?.instagramUrl || 'https://www.instagram.com/ak_events3639'
  const facebookUrl = contact?.facebookUrl || 'https://www.facebook.com/profile.php?id=61580711224848'

  // Derive logo: Sanity-managed first, then static fallback
  const footerLogoSrc = siteSettings?.footerLogo
    ? urlFor(siteSettings.footerLogo).width(96).height(96).url()
    : logoImg

  const socialLinks = [
    { label: 'Instagram', href: instagramUrl, icon: Instagram },
    { label: 'Facebook', href: facebookUrl, icon: Facebook },
  ]

  return (
    <footer className="relative bg-[#1E1C1A] text-white overflow-hidden">

      {/* Gold top accent */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent w-full" />

      {/* Subtle warm glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,162,74,0.06)_0%,transparent_65%)] pointer-events-none" />

      {/* ── Pre-footer CTA ── */}
      <div className="relative border-b border-white/8">
        <div className="container-luxury py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
              Ready to create something{' '}
              <span className="text-brand-gold">extraordinary?</span>
            </h3>
            <p className="text-white/55 mt-2 text-sm font-body font-light">
              Let's turn your vision into a breathtaking reality.
            </p>
          </div>
          <Link
            to="/contact"
            className="btn-gold flex-shrink-0 font-bold whitespace-nowrap"
          >
            Start Planning <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* ── Main Columns ── */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="container-luxury py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
      >

        {/* Brand */}
        <motion.div variants={fadeInUp} className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-3 mb-6">
            <img
              src={footerLogoSrc}
              alt="AK Productions"
              className="w-12 h-12 rounded-full object-cover border border-brand-gold/30 shadow-float-sm"
              loading="lazy"
            />
            <div className="leading-none">
              <div className="font-display text-xl font-bold text-white">
                AK<span className="text-brand-gold ml-1">Productions</span>
              </div>
              <div className="text-[9px] text-white/40 tracking-[0.22em] uppercase mt-0.5 font-body">
                Chennai
              </div>
            </div>
          </Link>

          <p className="text-white/55 text-sm leading-relaxed mb-6 font-body font-light">
            Chennai's premier luxury event management company. Creating extraordinary moments that
            become lifelong memories.
          </p>

          {/* Social icons */}
          <div className="flex gap-2.5">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 bg-white/8 hover:bg-brand-gold flex items-center justify-center text-white/70 hover:text-white border border-white/12 hover:border-brand-gold rounded-full transition-all duration-300 shadow-sm"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Services */}
        <motion.div variants={fadeInUp}>
          <h4 className="font-display text-xs font-bold text-white/80 uppercase tracking-[0.22em] mb-6">
            Services
          </h4>
          <ul className="space-y-3">
            {FOOTER_SERVICES.map(({ label, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className="text-white/55 hover:text-brand-gold text-sm transition-colors duration-200 flex items-center gap-2 group font-body"
                >
                  <span className="w-0 group-hover:w-3 h-px bg-brand-gold transition-all duration-300 flex-shrink-0" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Quick Links */}
        <motion.div variants={fadeInUp}>
          <h4 className="font-display text-xs font-bold text-white/80 uppercase tracking-[0.22em] mb-6">
            Quick Links
          </h4>
          <ul className="space-y-3">
            {FOOTER_QUICK_LINKS.map(({ label, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className="text-white/55 hover:text-brand-gold text-sm transition-colors duration-200 flex items-center gap-2 group font-body"
                >
                  <span className="w-0 group-hover:w-3 h-px bg-brand-gold transition-all duration-300 flex-shrink-0" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div variants={fadeInUp}>
          <h4 className="font-display text-xs font-bold text-white/80 uppercase tracking-[0.22em] mb-6">
            Contact
          </h4>
          <div className="space-y-4">
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="flex items-start gap-3 group"
            >
              <div className="w-8 h-8 rounded-full bg-brand-gold/12 border border-brand-gold/22 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-brand-gold transition-all duration-300">
                <Phone size={13} className="text-brand-gold group-hover:text-white transition-colors" />
              </div>
              <div>
                <div className="text-white/70 text-sm font-body hover:text-brand-gold transition-colors">{phone}</div>
                <div className="text-white/35 text-[11px] font-body">Mon–Sun, 9 AM – 9 PM</div>
              </div>
            </a>

            <a
              href={`mailto:${email}`}
              className="flex items-start gap-3 group"
            >
              <div className="w-8 h-8 rounded-full bg-brand-gold/12 border border-brand-gold/22 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-brand-gold transition-all duration-300">
                <Mail size={13} className="text-brand-gold group-hover:text-white transition-colors" />
              </div>
              <span className="text-white/70 text-sm font-body hover:text-brand-gold transition-colors break-all">{email}</span>
            </a>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-gold/12 border border-brand-gold/22 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin size={13} className="text-brand-gold" />
              </div>
              <span className="text-white/70 text-sm font-body">Chennai, Tamil Nadu, India</span>
            </div>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2.5 text-sm text-white/60 hover:text-[#25D366] transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <span>WhatsApp Us</span>
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Divider ── */}
      <div className="h-px bg-white/8" />

      {/* ── Bottom Bar ── */}
      <div className="container-luxury py-5 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2 text-white/35">
          <Gem size={10} className="text-brand-gold/50" />
          <p className="text-xs font-body">
            © {new Date().getFullYear()} AK Productions. All rights reserved. Chennai, India.
          </p>
        </div>
        <div className="flex gap-5">
          {[
            { label: 'Privacy Policy', path: '/contact' },
            { label: 'Contact', path: '/contact' },
          ].map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              className="text-white/35 hover:text-brand-gold text-xs transition-colors font-body"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
