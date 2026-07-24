import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Calendar, Users, ArrowRight, Tag, ExternalLink, Clock, Sparkles } from 'lucide-react'
import { urlFor } from '@/sanity/image'
import { getAllEvents } from '@/sanity/queries'
import { PORTFOLIO_ITEMS, PORTFOLIO_CATEGORIES, PortfolioItem } from '@/data/portfolio'
import PageHeader from '@/components/shared/PageHeader'

// ─── Helpers ──────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

// ─────────────────────────────────────────────────────────────
export default function Events() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [allEvents, setAllEvents]           = useState<PortfolioItem[]>([])
  const [loading, setLoading]               = useState(true)

  useEffect(() => {
    getAllEvents()
      .then((data) => {
        if (data && data.length > 0) {
          const mapped: PortfolioItem[] = data.map((e: any) => ({
            id:          e._id,
            title:       e.title,
            subtitle:    e.subtitle    || '',
            category:    e.category   || 'Other',
            coverImage:  e.coverImage ? urlFor(e.coverImage).url() : '',
            images:      e.images?.length ? e.images.map((img: any) => urlFor(img).url()) : [],
            guests:      e.guests      ?? 0,
            venue:       e.venue       || '',
            description: e.description || '',
            tags:        e.tags        || [],
            date:        e.date        || '',
            status:      e.status      || 'past',
            featured:    !!e.featured,
          }))
          setAllEvents(mapped)
        } else {
          // fallback: treat static data as "past", first 2 as "upcoming"
          const fallback = PORTFOLIO_ITEMS.map((p, i) => ({ ...p, status: i < 2 ? 'upcoming' : 'past', featured: i === 0 }))
          setAllEvents(fallback as any)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('SANITY ERROR:', err)
        const fallback = PORTFOLIO_ITEMS.map((p, i) => ({ ...p, status: i < 2 ? 'upcoming' : 'past', featured: i === 0 }))
        setAllEvents(fallback as any)
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

  const upcomingEvents = allEvents.filter((e: any) => e.status === 'upcoming')
  const pastEvents     = allEvents.filter((e: any) => e.status !== 'upcoming')
  const featured       = allEvents.find((e: any) => e.featured) || allEvents[0]

  // Derive categories dynamically from past events
  const categories = ['All', ...Array.from(new Set(pastEvents.map(e => e.category))).filter(Boolean)]

  const filtered = activeCategory === 'All'
    ? pastEvents
    : pastEvents.filter(p => p.category === activeCategory)

  return (
    <>
      {/* HERO */}
      <PageHeader
        image="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&q=85&auto=format&fit=crop"
        title="OUR EVENTS"
        subtitle="A Showcase of Extraordinary Productions"
        breadcrumbs={[{ label: 'Events' }]}
      />

      {/* STATS STRIP */}
      <section className="py-10 border-b border-brand-border bg-brand-section">
        <div className="container-luxury">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-20">
            {[
              { value: `${allEvents.length || '500'}+`, label: 'Events Executed'  },
              { value: '10+',                           label: 'Years Experience' },
              { value: '50k+',                          label: 'Happy Guests'     },
              { value: '30+',                           label: 'Expert Team'      },
            ].map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <div className="font-display text-3xl font-bold text-gradient-gold">{value}</div>
                <div className="text-brand-body text-[11px] uppercase tracking-widest mt-1 font-body">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      {upcomingEvents.length > 0 && (
        <section className="section bg-brand-bg">
          <div className="container-luxury">
            <div className="flex items-center gap-3 mb-10">
              <span className="gold-line" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-heading">
                Upcoming <span className="text-gradient-gold">Events</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {upcomingEvents.map((event: any, i: number) => (
                <motion.article
                  key={event.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-brand-border hover:border-brand-gold hover:shadow-brand-soft transition-all duration-400 bg-white shadow-sm"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={event.coverImage}
                      alt={event.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-heading/50 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-brand-gold/30 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                      <span className="text-brand-gold text-[10px] font-body font-bold uppercase tracking-widest">Upcoming</span>
                    </div>
                  </div>

                  <div className="p-7">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-brand-gold text-[10px] font-body font-semibold uppercase tracking-widest bg-brand-gold/10 px-2.5 py-1 rounded-full">
                        {event.category}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl text-brand-heading font-bold mb-3 group-hover:text-brand-gold transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-brand-body text-sm leading-relaxed font-body mb-5 line-clamp-2">{event.description}</p>

                    <div className="flex flex-wrap gap-4 text-[11px] text-brand-body mb-6 font-body">
                      {event.date && <span className="flex items-center gap-1.5"><Clock size={12} className="text-brand-gold" /> {event.date}</span>}
                      {event.venue && <span className="flex items-center gap-1.5"><MapPin size={12} className="text-brand-gold" /> {event.venue.split(',')[0]}</span>}
                      {event.guests > 0 && <span className="flex items-center gap-1.5"><Users size={12} className="text-brand-gold" /> {event.guests} Guests</span>}
                    </div>

                    <Link to="/contact" className="btn-gold font-bold text-xs">
                      Reserve Your Spot <ArrowRight size={13} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FEATURED PROJECT BANNER */}
      {featured && (
        <section className="section bg-brand-section">
          <div className="container-luxury">
            <div className="flex items-center gap-3 mb-10">
              <span className="gold-line" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-heading">
                Featured <span className="text-gradient-gold">Showcase</span>
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group relative rounded-2xl overflow-hidden border border-brand-border hover:border-brand-gold transition-all duration-500 min-h-[420px] shadow-sm"
            >
              <img
                src={featured.coverImage}
                alt={featured.title}
                className="w-full h-[460px] object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-heading/90 via-brand-heading/60 to-transparent" />

              <div className="absolute inset-0 flex items-center">
                <div className="p-8 md:p-14 max-w-lg">
                  <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20 mb-5">
                    <Sparkles size={10} className="text-brand-gold-secondary" />
                    <span className="text-brand-gold-secondary text-[10px] font-body font-bold uppercase tracking-widest">
                      {featured.category}
                    </span>
                  </div>

                  <p className="text-brand-gold-secondary font-accent italic text-base mb-2">{featured.subtitle}</p>
                  <h3 className="font-display text-3xl md:text-5xl text-white font-bold mb-4 leading-tight">
                    {featured.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-7 line-clamp-3 font-body">
                    {featured.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-[11px] text-white/60 mb-7 font-body">
                    {featured.guests > 0 && <span className="flex items-center gap-1.5"><Users size={12} className="text-brand-gold-secondary" /> {featured.guests} Guests</span>}
                    {featured.venue && <span className="flex items-center gap-1.5"><MapPin size={12} className="text-brand-gold-secondary" /> {featured.venue.split(',')[0]}</span>}
                    {featured.date && <span className="flex items-center gap-1.5"><Calendar size={12} className="text-brand-gold-secondary" /> {featured.date}</span>}
                  </div>

                  {featured.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-7">
                      {featured.tags.map((tag: string) => (
                        <span key={tag} className="flex items-center gap-1 bg-white/10 px-2.5 py-1 text-[10px] text-white/60 rounded-full border border-white/10 font-body">
                          <Tag size={8} /> {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link to="/contact" className="btn-gold font-bold">
                    Plan a Similar Event <ExternalLink size={13} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* FILTER + PAST EVENTS GRID */}
      <section className="bg-brand-bg">
        {/* Sticky Filter Bar */}
        <div className="py-5 border-y border-brand-border sticky top-[72px] z-30 bg-white shadow-sm">
          <div className="container-luxury">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {categories.map(cat => {
                const count = cat === 'All' ? pastEvents.length : pastEvents.filter(p => p.category === cat).length
                const isActive = activeCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-body font-bold uppercase tracking-wider transition-all duration-300 ${
                      isActive
                        ? 'bg-brand-gold text-white shadow-sm'
                        : 'bg-brand-section text-brand-body border border-brand-border hover:text-brand-heading hover:border-brand-gold'
                    }`}
                  >
                    {cat}
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white/25 text-white' : 'bg-brand-border text-brand-body'
                    }`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="section">
          <div className="container-luxury">
            <div className="flex items-center gap-3 mb-10">
              <span className="gold-line" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-heading">
                Past <span className="text-gradient-gold">Events</span>
              </h2>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
              >
                {filtered.map((item: any, i: number) => (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.07 }}
                    className="group relative overflow-hidden rounded-2xl bg-white border border-brand-border hover:border-brand-gold hover:shadow-brand-soft transition-all duration-300 shadow-sm"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-heading/60 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] text-brand-gold font-body font-bold uppercase tracking-widest rounded-full border border-brand-border shadow-sm">
                        {item.category}
                      </div>
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <Link
                          to="/contact"
                          className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[10px] text-brand-gold border border-brand-gold/30 rounded-full hover:bg-brand-gold hover:text-white transition-all font-body font-semibold shadow-sm"
                        >
                          View Details <ArrowRight size={10} />
                        </Link>
                      </div>
                    </div>

                    <div className="p-5">
                      <p className="text-brand-gold font-accent italic text-sm mb-1">{item.subtitle}</p>
                      <h3 className="font-display text-lg text-brand-heading font-bold mb-3 group-hover:text-brand-gold transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-brand-body text-sm leading-relaxed mb-4 line-clamp-2 font-body">{item.description}</p>
                      <div className="flex items-center gap-4 text-[11px] text-brand-body pt-4 border-t border-brand-border font-body">
                        {item.guests > 0 && <span className="flex items-center gap-1"><Users size={11} className="text-brand-gold" /> {item.guests} Guests</span>}
                        {item.venue && <span className="flex items-center gap-1"><MapPin size={11} className="text-brand-gold" /> {item.venue.split(',')[0]}</span>}
                        {item.date && <span className="flex items-center gap-1 ml-auto"><Calendar size={11} className="text-brand-gold" /> {item.date}</span>}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-brand-body font-body">
                No events in this category yet.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="section bg-brand-section border-t border-brand-border">
        <div className="container-luxury text-center">
          <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-heading mb-4">
              Want Us to Create Your{' '}
              <span className="text-gradient-gold">Masterpiece?</span>
            </h2>
            <p className="text-brand-body mb-8 max-w-xl mx-auto font-body">
              Let's plan your event together. Book a free consultation with our design team today.
            </p>
            <Link to="/contact" className="btn-gold font-bold">
              Start Planning <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
