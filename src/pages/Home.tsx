import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { urlFor } from '@/sanity/image'
import {
  getHomeData, getAboutData, getContactData,
  getFeaturedServices, getHomeGallery, getHomeEvents, getSiteSettings
} from '@/sanity/queries'
import {
  ArrowRight, Building2, Heart, Cake, Camera, Sparkles, Film,
  MapPin, Calendar, Award, Gem, Phone, Mail,
  CheckCircle2, Star, Zap, Shield, Trophy
} from 'lucide-react'
import { GALLERY_ITEMS } from '@/constants/gallery'
import { PORTFOLIO_ITEMS } from '@/data/portfolio'

// ─── Static fallback services ─────────────────────────────────
const FALLBACK_PREVIEW_SERVICES = [
  { icon: Heart, title: 'Wedding Planning', desc: 'Artistic concept design and complete styling for luxury and traditional weddings.', slug: 'wedding-decoration' },
  { icon: Building2, title: 'Corporate Events', desc: 'Impeccable conferences, summits, and executive galas with brand-focused alignment.', slug: 'corporate-events' },
  { icon: Cake, title: 'Birthday Celebrations', desc: 'Bespoke themed celebrations, magnificent cake settings, and creative milestones.', slug: 'birthday-decoration' },
  { icon: Camera, title: 'Photography', desc: 'Cinema-grade candid photo coverage preserving authentic details and memories.', slug: 'photography' },
  { icon: Film, title: 'Videography', desc: '4K narrative-driven event summaries and professional drone highlight films.', slug: 'videography' },
  { icon: Sparkles, title: 'Stage & Decoration', desc: 'High-concept installations, floral architecture, and media-ready environments.', slug: 'theme-decoration' },
]

// ─── Why Choose Us ────────────────────────────────────────────
const WHY_ITEMS = [
  { icon: Star, title: 'Award-Winning Quality', desc: 'Every event is crafted with cinematic precision and artisanal attention to detail.' },
  { icon: Shield, title: 'Trusted by 1500+ Clients', desc: 'Consistent 5-star reviews and repeat clientele across Chennai and South India.' },
  { icon: Zap, title: 'All Under One Roof', desc: 'Photography, décor, catering, entertainment — seamlessly coordinated by one team.' },
  { icon: CheckCircle2, title: 'Zero Compromise', desc: 'Our "on time, every time" promise ensures your event runs without a single hiccup.' },
]

// ─── Framer variants ──────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.10 } },
}
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

// ─── Sub-components ───────────────────────────────────────────
function SectionEyebrow({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="gold-line" />
      <span className="text-brand-gold text-[11px] font-body font-semibold uppercase tracking-[0.28em]">
        {children}
      </span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
export default function Home() {
  const [home, setHome] = useState<any>(null)
  const [about, setAbout] = useState<any>(null)
  const [contact, setContact] = useState<any>(null)
  const [siteSettings, setSiteSettings] = useState<any>(null)
  const [featuredServices, setFeaturedServices] = useState<any[]>([])
  const [galleryItems, setGalleryItems] = useState(GALLERY_ITEMS)
  const [previewEvents, setPreviewEvents] = useState(PORTFOLIO_ITEMS.slice(0, 3))

  useEffect(() => {
    Promise.all([
      getHomeData(), getAboutData(), getContactData(),
      getFeaturedServices(), getHomeGallery(), getHomeEvents(), getSiteSettings(),
    ]).then(([homeData, aboutData, contactData, servicesData, galleryData, eventsData, settingsData]) => {
      if (homeData) setHome(homeData)
      if (aboutData) setAbout(aboutData)
      if (contactData) setContact(contactData)
      if (settingsData) setSiteSettings(settingsData)
      if (servicesData?.length) setFeaturedServices(servicesData)
      if (galleryData?.length) {
        setGalleryItems(galleryData
          .filter((item: any) => item.image || item.videoUrl)
          .map((item: any) => ({
            id: item._id,
            src: item.image ? urlFor(item.image).url() : '',
            videoUrl: item.videoUrl || '',
            mediaType: (item.mediaType === 'video' ? 'video' : 'image') as 'image' | 'video',
            category: item.category || 'Other',
            title: item.title || '',
            aspectRatio: (item.aspectRatio || 'square') as 'square' | 'portrait' | 'landscape',
          })))
      }
      if (eventsData?.length) {
        setPreviewEvents(eventsData.map((e: any) => ({
          id: e._id, title: e.title, subtitle: e.subtitle || '',
          category: e.category || '',
          coverImage: e.coverImage ? urlFor(e.coverImage).url() : '',
          venue: e.venue || '', date: e.date || '', guests: e.guests || 0,
          description: e.description || '', tags: e.tags || [], images: [],
        })))
      }
    }).catch(err => console.error('SANITY ERROR:', err))
  }, [])

  // ─── Derived values ─────────────────────────────────────────
  const heroTitle = home?.heroTitle || 'Crafting Extraordinary Experiences'
  const heroSubtitle = home?.heroSubtitle || 'From unforgettable celebrations to corporate events, we transform every vision into a remarkable reality.'
  const heroDescription = home?.heroDescription || ''
  const heroButtonText = home?.heroButtonText || 'Explore Events'

  const eventsCount = home?.eventsCount || '500+'
  const yearsCount = home?.yearsCount || '10+'
  const clientsCount = home?.clientsCount || '1500+'

  const aboutPara1 = home?.aboutPreviewText || about?.description?.split('\n\n')?.[0]
    || 'AK Productions is a premium, full-service event management studio founded in Chennai in 2015. We transform every client\'s vision into a breathtaking, flawlessly executed reality — delivering luxury experiences that exceed expectations.'
  const aboutPara2 = home?.aboutPreviewText2 || about?.description?.split('\n\n')?.[1]
    || 'From intimate royal weddings to large-scale corporate summits, our 30-member team deploys dedicated design systems and round-the-clock coordination to ensure absolute consistency.'

  const aboutImages: string[] = about?.images?.length
    ? about.images.map((img: any) => urlFor(img).url())
    : [
      'https://res.cloudinary.com/gbarhqu6/image/upload/f_auto/q_auto/pexels-thevisionaryvows-33914537_azpgjt.jpg',
      'https://res.cloudinary.com/gbarhqu6/image/upload/f_auto/q_auto/pexels-darshandave-30840225_eohudh.jpg',
      'https://res.cloudinary.com/gbarhqu6/image/upload/f_auto/q_auto/pexels-brunounreal-15117022_jwhxkw.jpg',
      'https://res.cloudinary.com/gbarhqu6/image/upload/f_auto/q_auto/vidit-goswami-a6Kee4s4aPw-unsplash_l2hpky.jpg',
    ]

  const phone = contact?.phone || '+91 96772 03639'
  const email = contact?.email || 'akeventschennai@gmail.com'
  const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}`

  const previewServices = featuredServices.length
    ? featuredServices.map((s: any) => ({
      icon: FALLBACK_PREVIEW_SERVICES.find(f => f.slug === s.slug?.current)?.icon || Sparkles,
      title: s.name, desc: s.description || '',
      slug: s.slug?.current || s.slug || '',
    }))
    : FALLBACK_PREVIEW_SERVICES

  const previewGallery = galleryItems.slice(0, 6)

  // Hero image — siteSettings first, then first about image, then CDN fallback
  const heroImg = siteSettings?.homeHeroImage
    ? urlFor(siteSettings.homeHeroImage).width(1200).url()
    : 'https://res.cloudinary.com/gbarhqu6/image/upload/f_auto/q_auto/download_1_uidaog.jpg'

  return (
    <div className="bg-brand-bg text-brand-body overflow-hidden">

      {/* ══════════════════════════════════════════
          1 · HERO — Split Two-Column Layout
          ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-12">

        {/* Soft warm background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-bg via-brand-bg to-brand-section" />
        {/* Radial gold glow top-right */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_top_right,rgba(200,162,74,0.08)_0%,transparent_65%)] pointer-events-none" />
        {/* Decorative gold curved SVG lines */}
        <svg
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[540px] sm:h-[540px] opacity-[0.07] pointer-events-none"
          viewBox="0 0 540 540" fill="none"
        >
          <circle cx="270" cy="270" r="220" stroke="#C8A24A" strokeWidth="1.5" />
          <circle cx="270" cy="270" r="170" stroke="#C8A24A" strokeWidth="1" />
          <circle cx="270" cy="270" r="120" stroke="#C8A24A" strokeWidth="0.8" />
          <path d="M60 270 Q180 120 420 270 Q540 350 420 420" stroke="#C8A24A" strokeWidth="1" />
          <path d="M120 150 Q280 80  480 240" stroke="#C8A24A" strokeWidth="0.8" />
        </svg>

        <div className="container-luxury relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 items-center">

            {/* ── Left: Text ── */}
            <div className="order-2 lg:order-1">
              {/* Eyebrow badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 mb-7 bg-white px-5 py-2.5 rounded-full border border-brand-border shadow-card"
              >
                <Gem size={11} className="text-brand-gold" />
                <span className="text-brand-gold text-[11px] font-body font-semibold uppercase tracking-[0.22em]">
                  Premium Event Management · Chennai
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-display text-3xl sm:text-5xl xl:text-6xl font-bold text-brand-heading leading-[1.08] mb-5"
              >
                {heroTitle.split(' ').map((word: string, i: number) =>
                  i === heroTitle.split(' ').length - 1
                    ? <span key={i} className="text-gradient-gold"> {word}</span>
                    : <span key={i}>{i > 0 ? ' ' : ''}{word}</span>
                )}
              </motion.h1>

              {heroSubtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="text-brand-body text-sm sm:text-base md:text-lg leading-relaxed mb-8 font-body font-light max-w-xl"
                >
                  {heroSubtitle}
                </motion.p>
              )}

              {heroDescription && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-brand-body text-base md:text-lg leading-relaxed mb-10 font-body font-light max-w-lg"
                >
                  {heroDescription}
                </motion.p>
              )}

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10"
              >
                <Link to="/events" className="btn-gold font-bold">
                  {heroButtonText} <ArrowRight size={15} />
                </Link>
                <Link to="/contact" className="btn-outline-gold font-bold">
                  Book Consultation
                </Link>
              </motion.div>

              {/* Quick stats row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.45 }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { value: eventsCount, label: 'Events Completed' },
                  { value: clientsCount, label: 'Happy Clients' },
                  { value: yearsCount, label: 'Years Experience' },
                  { value: '25+', label: 'Professional Team' },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center sm:text-left">
                    <div className="font-display text-2xl font-bold text-gradient-gold">{value}</div>
                    <div className="text-brand-body/60 text-[11px] uppercase tracking-wider font-body mt-0.5">{label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Right: 3D Image Frame ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.0, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="order-1 lg:order-2 relative flex justify-center lg:justify-end"
            >
              {/* Main image with 3D frame */}
              <div className="relative w-full max-w-[520px]">

                {/* Gold circle accent (large) */}
                <div className="absolute -right-2 sm:-right-8 top-0 sm:-top-8 w-48 sm:w-64 h-48 sm:h-64 rounded-full border border-brand-gold/18 bg-brand-gold/3 animate-float-slow pointer-events-none" />
                <div className="absolute -left-2 sm:-left-4 bottom-0 sm:-bottom-6 w-32 sm:w-40 h-32 sm:h-40 rounded-full border border-brand-gold/12 bg-brand-gold/2 pointer-events-none" />

                {/* Image */}
                <div className="hero-image-frame animate-float relative z-10">
                  <img
                    src={heroImg}
                    alt="AK Productions Premium Events"
                    className="w-full aspect-[4/5] object-cover"
                  />
                  {/* Soft bottom vignette */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-bg/30 to-transparent" />
                </div>

                {/* Floating badge — Years */}
                <motion.div
                  initial={{ opacity: 0, x: -20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                  className="floating-badge absolute left-1 sm:-left-8 top-14 sm:top-16 z-20 px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-2.5"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-gold flex items-center justify-center flex-shrink-0">
                    <Award size={14} className="text-white" />
                  </div>
                  <div>
                    <div className="font-display text-base sm:text-lg font-bold text-brand-heading leading-none">{yearsCount}</div>
                    <div className="text-[9px] sm:text-[10px] text-brand-body/60 font-body">Years Excellence</div>
                  </div>
                </motion.div>

                {/* Floating badge — Events */}
                <motion.div
                  initial={{ opacity: 0, x: 20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.0 }}
                  className="floating-badge absolute right-1 sm:-right-6 bottom-14 sm:bottom-24 z-20 px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-2.5"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-gold flex items-center justify-center flex-shrink-0">
                    <Trophy size={14} className="text-white" />
                  </div>
                  <div>
                    <div className="font-display text-base sm:text-lg font-bold text-brand-heading leading-none">{eventsCount}</div>
                    <div className="text-[9px] sm:text-[10px] text-brand-body/60 font-body">Events Crafted</div>
                  </div>
                </motion.div>

                {/* Floating badge — Clients */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.2 }}
                  className="floating-badge absolute right-1 sm:right-4 top-1 sm:-top-6 z-20 px-2.5 sm:px-4 py-1.5 sm:py-2.5 flex items-center gap-1.5 sm:gap-2"
                >
                  <div className="flex -space-x-1.5">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-brand-gold/20 border-2 border-white flex items-center justify-center">
                        <Star size={8} className="text-brand-gold" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-display font-semibold text-brand-heading">{clientsCount} Clients</span>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2 · WHAT WE DO
          ══════════════════════════════════════════ */}
      <section className="section bg-brand-section">
        <div className="container-luxury">
          <div className="text-center mb-14">
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <SectionEyebrow>What We Do</SectionEyebrow>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-brand-heading">
                Crafting{' '}
                <span className="text-gradient-gold">Unforgettable Moments</span>
              </h2>
              <p className="text-brand-body mt-4 max-w-xl mx-auto font-body font-light leading-relaxed">
                From concept to curtain call — we manage every detail so you can be fully present
                in your perfect day.
              </p>
            </motion.div>
          </div>

          {/* 3-col feature grid */}
          <motion.div
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { num: '01', title: 'Concept & Design', desc: 'We translate your vision into detailed mood boards, 3D renders, and design blueprints before a single item is ordered.', icon: Sparkles },
              { num: '02', title: 'End-to-End Coordination', desc: 'From vendor sourcing to day-of management — our team handles every moving part with military-grade precision.', icon: Shield },
              { num: '03', title: 'Cinematic Documentation', desc: 'Our in-house photographers and videographers capture every emotion, every detail, in stunning 4K clarity.', icon: Camera },
            ].map(({ num, title, desc, icon: Icon }) => (
              <motion.div
                key={num} variants={scaleIn}
                whileHover={{ y: -6 }}
                className="bg-white rounded-4xl p-8 border border-brand-border shadow-card hover:shadow-card-hover hover:border-brand-gold/30 transition-all duration-400 relative overflow-hidden group"
              >
                {/* Number watermark */}
                <div className="absolute top-4 right-5 font-display text-7xl font-bold text-brand-gold/6 leading-none select-none group-hover:text-brand-gold/10 transition-colors">
                  {num}
                </div>
                <div className="w-13 h-13 mb-5 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                  <Icon size={24} className="text-brand-gold" />
                </div>
                <h3 className="font-display text-xl text-brand-heading font-bold mb-3">{title}</h3>
                <p className="text-brand-body text-sm leading-relaxed font-body font-light">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3 · ABOUT PREVIEW
          ══════════════════════════════════════════ */}
      <section className="section bg-brand-bg">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Text */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="lg:pr-8"
            >
              <SectionEyebrow>About AK Productions</SectionEyebrow>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-brand-heading leading-tight mb-6">
                A Decade of{' '}
                <span className="text-gradient-gold">Flawless Craftsmanship</span>
              </h2>
              <p className="text-brand-body leading-relaxed font-body font-light mb-4">
                {aboutPara1}
              </p>
              <p className="text-brand-body leading-relaxed font-body font-light mb-8">
                {aboutPara2}
              </p>
              <Link to="/about" className="btn-outline-gold font-bold text-xs">
                Learn More About Us <ArrowRight size={13} />
              </Link>
            </motion.div>

            {/* Image grid */}
            <motion.div
              variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {aboutImages.map((src, i) => (
                  <div
                    key={i}
                    className={`overflow-hidden rounded-3xl shadow-card border border-brand-border ${i === 1 ? 'mt-8' : ''} ${i === 2 ? '-mt-8' : ''}`}
                  >
                    <img
                      src={src} alt="AK Productions"
                      className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>
              {/* Years badge */}
              <div className="absolute bottom-2 sm:-bottom-5 right-2 sm:-right-4 bg-white rounded-3xl px-4 sm:px-5 py-3 sm:py-4 text-center border border-brand-border shadow-float">
                <div className="font-display text-2xl sm:text-3xl font-bold text-gradient-gold">{yearsCount}</div>
                <div className="text-brand-body/65 text-[10px] sm:text-[11px] font-body mt-0.5">Years of Excellence</div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4 · FEATURED SERVICES
          ══════════════════════════════════════════ */}
      <section className="section bg-brand-section">
        <div className="container-luxury">

          <div className="text-center mb-14">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <SectionEyebrow>Our Specialties</SectionEyebrow>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-brand-heading">
                Signature <span className="text-gradient-gold">Services</span>
              </h2>
              <p className="text-brand-body mt-4 max-w-xl mx-auto font-body font-light">
                Meticulously coordinated capabilities, designed to translate your vision into a
                world-class experience.
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {previewServices.map(({ icon: Icon, title, desc, slug }) => (
              <motion.div
                key={title} variants={fadeUp}
                whileHover={{ y: -8 }}
                className="bg-white rounded-4xl p-8 border border-brand-border shadow-card hover:shadow-card-hover hover:border-brand-gold/30 transition-all duration-400 flex flex-col group"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold mb-5 group-hover:bg-brand-gold group-hover:border-brand-gold transition-all duration-300">
                  <Icon size={24} className="group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-display text-lg text-brand-heading font-bold mb-2">{title}</h3>
                <p className="text-brand-body text-sm leading-relaxed font-body font-light flex-1 mb-6">{desc}</p>
                <Link
                  to={`/services/${slug}`}
                  className="text-brand-gold hover:text-brand-brown flex items-center gap-1.5 text-[11px] font-body font-semibold uppercase tracking-wider group"
                >
                  Learn More <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link to="/services" className="btn-outline-gold font-bold">
              View All Services <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5 · FEATURED GALLERY
          ══════════════════════════════════════════ */}
      <section className="section bg-brand-bg">
        <div className="container-luxury">

          <div className="text-center mb-14">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <SectionEyebrow>Visual Archive</SectionEyebrow>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-brand-heading">
                Luxury <span className="text-gradient-gold">Gallery</span>
              </h2>
              <p className="text-brand-body mt-4 max-w-xl mx-auto font-body font-light">
                Browse visual blueprints and completed sets from our design workshops.
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {previewGallery.map((item, i) => (
              <motion.div
                key={item.id} variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`group relative overflow-hidden rounded-3xl cursor-pointer border border-brand-border shadow-card hover:shadow-card-hover hover:border-brand-gold/30 transition-all duration-400 ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
              >
                <div className={`overflow-hidden ${i === 0 ? 'aspect-[4/3] md:aspect-square' : 'aspect-square'}`}>
                  {(item as any).mediaType === 'video' ? (
                    <video
                      src={(item as any).videoUrl}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onMouseEnter={e => (e.currentTarget as HTMLVideoElement).play()}
                      onMouseLeave={e => { const v = e.currentTarget as HTMLVideoElement; v.pause(); v.currentTime = 0 }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={item.src} alt={item.title} loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-brand-heading/0 group-hover:bg-brand-heading/50 transition-all duration-400 flex flex-col justify-end p-4">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sm text-white font-body font-medium truncate">
                    {item.title}
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-gold text-[10px] uppercase tracking-widest font-body mt-0.5">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link to="/gallery" className="btn-outline-gold font-bold">
              View Full Gallery <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6 · FEATURED EVENTS PREVIEW
          ══════════════════════════════════════════ */}
      <section className="section bg-brand-section">
        <div className="container-luxury">

          <div className="text-center mb-14">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <SectionEyebrow>Our Work</SectionEyebrow>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-brand-heading">
                Featured <span className="text-gradient-gold">Events</span>
              </h2>
              <p className="text-brand-body mt-4 max-w-xl mx-auto font-body font-light">
                A handpicked selection of our recent projects, executed with precise artistic direction.
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {previewEvents.map((item) => (
              <motion.article
                key={item.id} variants={fadeUp}
                whileHover={{ y: -8 }}
                className="group overflow-hidden rounded-4xl bg-white border border-brand-border shadow-card hover:shadow-card-hover hover:border-brand-gold/30 transition-all duration-400 flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
                  <img
                    src={item.coverImage} alt={item.title} loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-heading/55 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 bg-white/92 px-3 py-1 text-[10px] text-brand-gold font-body font-bold uppercase tracking-widest rounded-full border border-brand-border shadow-sm">
                    {item.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-xl text-brand-heading font-bold mb-3 group-hover:text-brand-gold transition-colors duration-300">
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-[11px] text-brand-body/55 mb-6 font-body">
                    {item.venue && (
                      <span className="flex items-center gap-1.5">
                        <MapPin size={11} className="text-brand-gold" /> {item.venue.split(',')[0]}
                      </span>
                    )}
                    {item.date && (
                      <span className="flex items-center gap-1.5">
                        <Calendar size={11} className="text-brand-gold" /> {item.date}
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/events/${(item as any).slug || item.id}`}
                    className="btn-outline-gold w-full text-center justify-center py-2.5 text-[11px] font-bold mt-auto"
                  >
                    View Details
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link to="/events" className="btn-gold font-bold">
              View All Events <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7 · WHY CHOOSE US
          ══════════════════════════════════════════ */}
      <section className="section bg-brand-bg">
        <div className="container-luxury">
          <div className="text-center mb-14">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <SectionEyebrow>Why Choose Us</SectionEyebrow>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-brand-heading">
                Proven <span className="text-gradient-gold">Excellence</span>
              </h2>
            </motion.div>
          </div>

          <motion.div
            variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {WHY_ITEMS.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title} variants={fadeUp}
                whileHover={{ y: -8 }}
                transition={{ delay: i * 0.05 }}
                className="why-card p-7 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-brand-gold/10 border border-brand-gold/22 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold transition-all duration-300">
                  <Icon size={26} />
                </div>
                <h3 className="font-display text-lg text-brand-heading font-bold mb-2">{title}</h3>
                <p className="text-brand-body text-sm leading-relaxed font-body font-light">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          9 · CALL TO ACTION
          ══════════════════════════════════════════ */}
      <section className="relative py-28 bg-brand-bg overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=1920&q=85&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg via-brand-bg/92 to-brand-bg" />
        {/* Gold radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,162,74,0.06)_0%,transparent_65%)]" />

        <div className="container-luxury relative z-10 text-center max-w-3xl mx-auto">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            <SectionEyebrow>Ready to Begin?</SectionEyebrow>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-brand-heading mb-6 leading-tight">
              Let's Create Something{' '}
              <span className="text-gradient-gold">Unforgettable</span>
            </h2>
            <p className="text-brand-body mb-10 leading-relaxed font-body font-light max-w-xl mx-auto">
              Book a free consultation with our design team and let's start planning your perfect
              event today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link to="/contact" className="btn-gold font-bold">
                Get In Touch <ArrowRight size={14} />
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold font-bold"
              >
                WhatsApp Us
              </a>
            </div>

            {/* Contact info row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 pt-8 border-t border-brand-border">
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 text-brand-body hover:text-brand-gold transition-colors text-sm font-body font-medium">
                <Phone size={14} className="text-brand-gold" /> {phone}
              </a>
              <span className="hidden sm:block w-px h-4 bg-brand-border" />
              <a href={`mailto:${email}`} className="flex items-center gap-2 text-brand-body hover:text-brand-gold transition-colors text-sm font-body font-medium">
                <Mail size={14} className="text-brand-gold" /> {email}
              </a>
              <span className="hidden sm:block w-px h-4 bg-brand-border" />
              <span className="flex items-center gap-2 text-brand-body text-sm font-body font-medium">
                <MapPin size={14} className="text-brand-gold" /> Chennai, Tamil Nadu
              </span>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
