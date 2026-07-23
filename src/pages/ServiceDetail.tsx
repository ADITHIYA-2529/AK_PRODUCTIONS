import { useState, useEffect, useRef } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check, ChevronDown } from 'lucide-react'
import { Service, getServiceBySlug } from '@/constants/services'
import { PACKAGES } from '@/constants/packages'
import { FAQS } from '@/constants/faqs'
import GalleryLightbox from '@/components/shared/GalleryLightbox'
import { formatCurrency } from '@/utils/formatters'
import { urlFor } from '@/sanity/image'
import { getServiceBySlug as fetchServiceBySanity } from '@/sanity/queries'

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 180])
  const scale = useTransform(scrollY, [0, 600], [1.05, 1.25])

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      return;
    }
    
    fetchServiceBySanity(slug)
      .then((data) => {
        if (data) {
          const mapped: Service = {
            id: data._id,
            slug: data.slug?.current || data.slug || '',
            name: data.name,
            category: data.category,
            tagline: data.tagline,
            description: data.description,
            longDescription: data.longDescription,
            icon: data.icon,
            heroImage: data.heroImage ? urlFor(data.heroImage).url() : '',
            gallery: data.gallery?.length ? data.gallery.map((img: any) => urlFor(img).url()) : [],
            features: data.features || [],
            startingPrice: data.startingPrice || 0,
            featured: !!data.featured,
          }
          setService(mapped)
        } else {
          // fallback to local static data
          const localService = getServiceBySlug(slug)
          setService(localService || null)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error("SANITY ERROR:", err)
        // fallback
        const localService = getServiceBySlug(slug)
        setService(localService || null)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin" />
      </div>
    )
  }

  if (!service) return <Navigate to="/services" replace />

  const servicePackages = PACKAGES.slice(0, 3)
  const serviceFaqs = FAQS.slice(0, 5)

  return (
    <>
      {/* Hero */}
      <motion.section
        ref={containerRef}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 1] }}
        className="relative h-[480px] md:h-[520px] w-full flex items-center justify-center overflow-hidden rounded-b-[40px] md:rounded-b-[56px] shadow-float-lg bg-brand-bg"
      >
        {/* Parallax Image Wrapper */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <motion.img
            src={service.heroImage}
            alt={service.name}
            style={{ y, scale }}
            transition={{ duration: 0.1, ease: 'linear' }}
            className="w-full h-[120%] object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/38 z-10" />
        </div>

        {/* Content Container */}
        <div className="container-luxury relative z-20 text-center flex flex-col items-center justify-center pt-12">
          {/* Breadcrumb / Category Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="flex items-center gap-2 mb-4 font-body text-xs font-semibold uppercase tracking-widest"
          >
            <Link to="/" className="text-white/70 hover:text-brand-gold-secondary transition-colors">
              Home
            </Link>
            <span className="text-brand-gold-secondary font-display font-medium">/</span>
            <Link to="/services" className="text-white/70 hover:text-brand-gold-secondary transition-colors">
              Services
            </Link>
            <span className="text-brand-gold-secondary font-display font-medium">/</span>
            <span className="text-brand-gold-secondary font-bold">
              {service.category}
            </span>
          </motion.nav>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ textShadow: '0 5px 25px rgba(0,0,0,0.35)' }}
            className="font-display text-4xl md:text-[50px] font-extrabold uppercase tracking-wide leading-tight mb-4 select-none bg-gradient-to-r from-[#F8E8B0] via-[#E6C97A] via-[#C8A24A] to-[#9B6A18] bg-clip-text text-transparent"
          >
            {service.name}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
            className="text-white/90 text-sm md:text-base font-accent tracking-wider font-light max-w-xl mx-auto mb-6"
          >
            {service.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex flex-wrap gap-4 items-center justify-center"
          >
            <Link to="/book-event" className="btn-gold font-bold text-xs">
              Book This Service <ArrowRight size={14} />
            </Link>
            <div className="text-white text-xs font-semibold uppercase tracking-wider bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20 shadow-button-sm">
              From <span className="text-brand-gold-secondary font-bold text-sm">
                {service.slug === 'catering' ? `${formatCurrency(service.startingPrice)}/person` : formatCurrency(service.startingPrice)}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Description */}
      <section className="section bg-brand-bg">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <span className="gold-line" />
                <span className="text-brand-gold text-xs uppercase tracking-widest font-semibold">About This Service</span>
              </div>
              <p className="text-brand-body text-lg leading-relaxed mb-8">{service.longDescription}</p>
              <div className="grid grid-cols-2 gap-3">
                {service.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2.5">
                    <Check size={14} className="text-brand-gold flex-shrink-0" />
                    <span className="text-brand-heading text-sm">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 border border-brand-border shadow-sm sticky top-24">
                <h3 className="font-display text-xl text-brand-heading font-semibold mb-4">Get a Quote</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-body">Service</span>
                    <span className="text-brand-heading font-medium">{service.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-body">Starting from</span>
                    <span className="text-brand-gold font-bold">
                      {service.slug === 'catering' ? `${formatCurrency(service.startingPrice)}/pax` : formatCurrency(service.startingPrice)}
                    </span>
                  </div>
                  <div className="h-px bg-brand-border" />
                </div>
                <Link to="/book-event" className="btn-gold w-full text-center justify-center mb-3">
                  Book Now <ArrowRight size={14} />
                </Link>
                <a
                  href={`https://wa.me/919677203639?text=Hello%20AK%20Productions!%20I'm%20interested%20in%20${encodeURIComponent(service.name)}%20service.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-emerald-500/40 text-emerald-600 text-sm hover:bg-emerald-50 transition-colors rounded-full font-medium"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  WhatsApp Enquiry
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section bg-brand-section">
        <div className="container-luxury">
          <div className="flex items-center gap-3 mb-8">
            <span className="gold-line" />
            <h2 className="font-display text-2xl text-brand-heading font-semibold">Service Gallery</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {service.gallery.map((img, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => { setLightboxIndex(i); setLightboxOpen(true) }}
                className="aspect-square overflow-hidden rounded-xl group border border-brand-border hover:border-brand-gold transition-all duration-300 shadow-sm"
              >
                <img src={img} alt={`${service.name} ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <GalleryLightbox images={service.gallery} isOpen={lightboxOpen} initialIndex={lightboxIndex} onClose={() => setLightboxOpen(false)} />

      {/* Packages */}
      <section className="section bg-brand-bg">
        <div className="container-luxury">
          <div className="flex items-center gap-3 mb-8">
            <span className="gold-line" />
            <h2 className="font-display text-2xl text-brand-heading font-semibold">Available Packages</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servicePackages.map((pkg) => (
              <div key={pkg.id} className={`bg-white rounded-2xl overflow-hidden border shadow-sm transition-all duration-300 ${pkg.popular ? 'border-brand-gold shadow-md' : 'border-brand-border hover:border-brand-gold hover:shadow-brand-soft'}`}>
                <div className={`p-5 ${pkg.popular ? 'bg-brand-gold/10 border-b border-brand-gold/20' : 'bg-brand-section border-b border-brand-border'}`}>
                  <h3 className="font-display text-xl text-brand-heading font-bold">{pkg.name} Package</h3>
                  <div className="text-brand-gold font-bold text-2xl mt-1">{formatCurrency(pkg.price)}</div>
                  {pkg.popular && <span className="text-xs text-brand-gold font-semibold uppercase tracking-widest mt-1 block">✦ Most Popular</span>}
                </div>
                <div className="p-5">
                  <ul className="space-y-2 mb-5">
                    {pkg.features.slice(0, 5).map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-brand-heading">
                        <Check size={12} className="text-brand-gold flex-shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/book-event"
                    className={`block text-center py-2.5 text-sm font-semibold uppercase tracking-wider transition-all rounded-full ${pkg.popular ? 'bg-brand-gold text-white hover:bg-brand-gold-secondary' : 'border border-brand-gold text-brand-gold hover:bg-brand-gold/10'}`}
                  >
                    Select Package
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-brand-section">
        <div className="container-luxury max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="gold-line" />
            <h2 className="font-display text-2xl text-brand-heading font-semibold">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {serviceFaqs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-xl border border-brand-border overflow-hidden hover:border-brand-gold transition-all duration-300 shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-brand-heading font-medium text-sm">{faq.question}</span>
                  <ChevronDown size={16} className={`text-brand-gold transition-transform flex-shrink-0 ml-4 ${openFaq === faq.id ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="px-5 pb-5 text-brand-body text-sm leading-relaxed border-t border-brand-border"
                  >
                    <div className="pt-4">{faq.answer}</div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-brand-bg">
        <div className="container-luxury text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-heading mb-4">
            Ready to Book <span className="text-gradient-gold">{service.name}?</span>
          </h2>
          <p className="text-brand-body mb-8 max-w-xl mx-auto">Get in touch today for a personalised quote and free consultation.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/book-event" className="btn-gold">Book Now <ArrowRight size={14} /></Link>
            <Link to="/contact" className="btn-outline-gold">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  )
}
