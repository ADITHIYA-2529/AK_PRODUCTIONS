import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '@/components/shared/SectionHeading'
import ServiceCard from '@/components/shared/ServiceCard'
import ProcessSteps from '@/components/shared/ProcessSteps'
import { SERVICES, Service } from '@/constants/services'
import { staggerContainer } from '@/animations/variants'
import { urlFor } from '@/sanity/image'
import { getAllServices, getSiteSettings } from '@/sanity/queries'
import PageHeader from '@/components/shared/PageHeader'
import { Layers, CheckCircle2, Clock } from 'lucide-react'

// ─── Framer variants ──────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

function SectionEyebrow({ children, center = false }: { children: string; center?: boolean }) {
  return (
    <div className={`flex items-center gap-3 mb-4 ${center ? 'justify-center' : ''}`}>
      <span className="gold-line" />
      <span className="text-brand-gold text-[11px] font-body font-semibold uppercase tracking-[0.28em]">
        {children}
      </span>
      {center && <span className="gold-line" />}
    </div>
  )
}

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [servicesHeroImage, setServicesHeroImage] = useState('https://res.cloudinary.com/gbarhqu6/image/upload/f_auto/q_auto/ChatGPT_Image_Jul_24_2026_03_08_58_PM_1_kz33q5.png')

  useEffect(() => {
    Promise.all([getAllServices(), getSiteSettings()])
      .then(([data, settingsData]) => {
        // Apply siteSettings hero image
        if (settingsData?.servicesHeroImage) {
          setServicesHeroImage(urlFor(settingsData.servicesHeroImage).width(1400).url())
        }
        if (data && data.length > 0) {
          const mapped = data.map((s: any) => {
            const currentSlug = s.slug?.current || s.slug || ''
            const fallbackImg = SERVICES.find(f => f.slug === currentSlug)?.heroImage || 'https://res.cloudinary.com/gbarhqu6/image/upload/f_auto/q_auto/ChatGPT_Image_Jul_24_2026_03_08_58_PM_1_kz33q5.png'
            return {
              id: s._id,
              slug: currentSlug,
              name: s.name,
              category: s.category,
              tagline: s.tagline,
              description: s.description,
              longDescription: s.longDescription,
              icon: s.icon,
              heroImage: s.heroImage ? urlFor(s.heroImage).url() : fallbackImg,
              gallery: s.gallery?.length ? s.gallery.map((img: any) => urlFor(img).url()) : [],
              features: s.features || [],
              startingPrice: s.startingPrice || 0,
              featured: !!s.featured,
            }
          })
          setServices(mapped)
        } else {
          setServices(SERVICES)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('SANITY ERROR:', err)
        setServices(SERVICES)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin" />
      </div>
    )
  }

  // Filter out any EMI/Loan/Finance service from appearing as a standalone card
  const validServices = services.filter(s =>
    !/emi|loan|finance/i.test(s.name) && !/emi|loan|finance/i.test(s.slug || '')
  )

  const categoriesToUse = ['All', ...Array.from(new Set(validServices.map(s => s.category))).filter(Boolean)]
  const filtered = activeCategory === 'All' ? validServices : validServices.filter(s => s.category === activeCategory)
  const getCategoryCount = (cat: string) => cat === 'All' ? validServices.length : validServices.filter(s => s.category === cat).length

  return (
    <>
      {/* ── Page Hero ── */}
      <PageHeader
        image={servicesHeroImage}
        title="OUR SERVICES"
        subtitle="Comprehensive event solutions, from creative planning and production to flawless execution."
        breadcrumbs={[{ label: 'Services' }]}
      />

      {/* ── Category Filter Bar ── */}
      <section className="py-5 border-b border-brand-border bg-white sticky top-[76px] z-30 shadow-float-sm">
        <div className="container-luxury">
          <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
            {categoriesToUse.map(cat => {
              const count = getCategoryCount(cat)
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${isActive
                    ? 'bg-brand-gold text-white shadow-button'
                    : 'bg-brand-section text-brand-body border border-brand-border hover:border-brand-gold/40 hover:text-brand-heading'
                    }`}
                >
                  {cat}
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/25 text-white' : 'bg-brand-border/80 text-brand-body'
                    }`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="section bg-brand-bg">
        <div className="container-luxury">
          <SectionHeading
            pretitle={`${filtered.length} Services`}
            title="Everything You Need for"
            highlight="Your Perfect Event"
            subtitle="From decoration to catering, photography to entertainment — we handle it all under one roof."
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filtered.map((service, i) => (
                  <ServiceCard key={service.id} service={service} index={i} />
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-brand-body font-body">
              No services in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* ── How We Work ── */}
      <ProcessSteps />

      {/* ── Why Choose Us Strip ── */}
      <section className="section bg-brand-section">
        <div className="container-luxury">
          <div className="text-center mb-12">
            <SectionEyebrow center>Our Advantage</SectionEyebrow>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-heading">
              Why <span className="text-gradient-gold">Choose Us</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { title: 'All Under One Roof', desc: 'No need to coordinate multiple vendors — we handle everything from décor to catering.', icon: Layers },
              { title: '10+ Years Experience', desc: 'A decade of expertise delivering flawless events across all categories.', icon: CheckCircle2 },
              { title: 'Bespoke Customisation', desc: 'Every event is unique. We tailor our services to match your exact vision.', icon: Clock },
            ].map(({ title, desc, icon: Icon }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-4xl p-8 border border-brand-border shadow-card hover:shadow-card-hover hover:border-brand-gold/30 transition-all duration-400 group"
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-brand-gold/10 border border-brand-gold/22 flex items-center justify-center group-hover:bg-brand-gold group-hover:border-brand-gold transition-all duration-300">
                  <Icon size={24} className="text-brand-gold group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="text-gradient-gold font-display text-4xl font-bold mb-3">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-lg text-brand-heading font-semibold mb-2">{title}</h3>
                <p className="text-brand-body text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
