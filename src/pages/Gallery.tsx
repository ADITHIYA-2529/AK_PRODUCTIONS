import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ZoomIn, ArrowRight, Camera, Images, Sparkles } from 'lucide-react'
import SectionHeading from '@/components/shared/SectionHeading'
import GalleryLightbox from '@/components/shared/GalleryLightbox'
import { GALLERY_ITEMS, GalleryItem } from '@/constants/gallery'
import { urlFor } from '@/sanity/image'
import { getAllGallery, getSiteSettings } from '@/sanity/queries'

import PageHeader from '@/components/shared/PageHeader'

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(12)
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [galleryHeroImage, setGalleryHeroImage] = useState('https://res.cloudinary.com/gbarhqu6/image/upload/f_auto/q_auto/ChatGPT_Image_Jul_24_2026_03_11_11_PM_eyfmoh.png')

  useEffect(() => {
    Promise.all([getAllGallery(), getSiteSettings()])
      .then(([data, settingsData]) => {
        // Apply siteSettings hero image
        if (settingsData?.galleryHeroImage) {
          setGalleryHeroImage(urlFor(settingsData.galleryHeroImage).width(1400).url())
        }
        if (data && data.length > 0) {
          const mapped = data.map((item: any) => ({
            id: item._id,
            src: item.image ? urlFor(item.image).width(800).url() : 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80&auto=format&fit=crop',
            category: item.category || 'Other',
            title: item.title || '',
            aspectRatio: item.aspectRatio || 'square',
            altText: item.altText || item.title || 'AK Productions Luxury Event Gallery',
            featured: !!item.featured,
            displayOrder: item.displayOrder ?? 10,
            description: item.description || '',
          }))
          setGalleryItems(mapped)
        } else {
          setGalleryItems(GALLERY_ITEMS)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('SANITY ERROR:', err)
        setGalleryItems(GALLERY_ITEMS)
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

  const categoriesToUse = ['All', ...Array.from(new Set(galleryItems.map(item => item.category))).filter(Boolean)]
  const filtered = activeCategory === 'All' ? galleryItems : galleryItems.filter(item => item.category === activeCategory)
  const visible = filtered.slice(0, visibleCount)

  const openLightbox = (i: number) => {
    setLightboxIndex(i)
    setLightboxOpen(true)
  }

  return (
    <>
      {/* ── Page Hero ── */}
      <PageHeader
        image={galleryHeroImage}
        title="OUR GALLERY"
        subtitle="Explore a collection of unforgettable moments, beautifully captured from our successful events."
        breadcrumbs={[{ label: 'Gallery' }]}
      />

      {/* ── Gallery Stats Strip ── */}
      <section className="py-10 border-b border-brand-border bg-brand-section">
        <div className="container-luxury">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-20">
            {[
              { icon: Images, value: `${galleryItems.length}+`, label: 'Photos in Gallery' },
              { icon: Camera, value: '500+', label: 'Events Captured' },
              { icon: Sparkles, value: categoriesToUse.length - 1, label: 'Event Categories' },
            ].map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/22 flex items-center justify-center mb-1">
                  <Icon size={20} className="text-brand-gold" />
                </div>
                <div className="font-display text-2xl font-bold text-gradient-gold">{value}</div>
                <div className="text-brand-body/60 text-xs uppercase tracking-widest font-body">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter Pills ── */}
      <section className="py-5 border-b border-brand-border bg-white sticky top-[76px] z-30 shadow-float-sm">
        <div className="container-luxury">
          <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
            {categoriesToUse.map(cat => {
              const count = cat === 'All' ? galleryItems.length : galleryItems.filter(i => i.category === cat).length
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setVisibleCount(12) }}
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

      {/* ── Luxury Masonry Gallery ── */}
      <section className="section bg-brand-bg">
        <div className="container-luxury">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
            >
              {visible.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className="break-inside-avoid group relative overflow-hidden rounded-3xl cursor-pointer mb-4 shadow-card border border-brand-border hover:shadow-card-hover hover:border-brand-gold/35 transition-all duration-400"
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={item.src}
                    alt={(item as any).altText || item.title || 'AK Productions Event Gallery'}
                    className={`w-full object-cover transition-transform duration-600 group-hover:scale-108 ${item.aspectRatio === 'portrait' ? 'aspect-[3/4]' :
                      item.aspectRatio === 'landscape' ? 'aspect-[4/3]' : 'aspect-square'
                      }`}
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-transparent group-hover:bg-brand-heading/55 transition-all duration-400 flex flex-col items-center justify-center gap-2">
                    <ZoomIn
                      size={28}
                      className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300 drop-shadow-lg"
                    />
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-center px-3">
                      {item.title && (
                        <p className="text-white text-xs font-medium line-clamp-2 leading-tight">{item.title}</p>
                      )}
                      <span className="text-brand-gold text-[9px] uppercase tracking-widest mt-0.5 block">{item.category}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-brand-body font-body">
              <Images className="mx-auto text-brand-gold/35 mb-4" size={48} />
              <p>No gallery images found in this category.</p>
            </div>
          )}

          {/* Load More */}
          {visibleCount < filtered.length && (
            <div className="text-center mt-12">
              <button
                onClick={() => setVisibleCount(v => v + 8)}
                className="btn-outline-gold font-bold"
              >
                Load More Photos <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <GalleryLightbox
        images={visible.map(i => i.src)}
        titles={visible.map(i => i.title)}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      {/* ── CTA ── */}
      <section className="section bg-brand-section">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-3xl font-bold text-brand-heading mb-4">
              Love What You See?{' '}
              <span className="text-gradient-gold">Let's Create Your Story.</span>
            </h2>
            <Link to="/contact" className="btn-gold mt-6">
              Book Your Event <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
