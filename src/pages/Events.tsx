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
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

// ─────────────────────────────────────────────────────────────
export default function Events() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [allEvents, setAllEvents] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllEvents()
      .then((data) => {
        if (data && data.length > 0) {
          const mapped: PortfolioItem[] = data.map((e: any) => ({
            id: e._id,
            slug: e.slug || e._id,
            title: e.title,
            subtitle: e.subtitle || '',
            category: e.category || 'Other',
            coverImage: e.coverImage ? urlFor(e.coverImage).url() : '',
            images: e.images?.length ? e.images.map((img: any) => urlFor(img).url()) : [],
            guests: e.guests ?? 0,
            venue: e.venue || '',
            description: e.description || '',
            tags: e.tags || [],
            date: e.date || '',
            time: e.time || '',
            organizer: e.organizer || '',
            registrationDeadline: e.registrationDeadline || '',
            status: e.status || 'past',
            featured: !!e.featured,
          }))
          setAllEvents(mapped)
        } else {
          // fallback: treat static data as "past", first 2 as "upcoming"
          const fallback = PORTFOLIO_ITEMS.map((p, i) => ({ ...p, slug: p.slug || p.id, status: i < 2 ? 'upcoming' : 'past', featured: i === 0 }))
          setAllEvents(fallback as any)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('SANITY ERROR:', err)
        const fallback = PORTFOLIO_ITEMS.map((p, i) => ({ ...p, slug: p.slug || p.id, status: i < 2 ? 'upcoming' : 'past', featured: i === 0 }))
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
  const pastEvents = allEvents.filter((e: any) => e.status !== 'upcoming')
  const featured = allEvents.find((e: any) => e.featured) || allEvents[0]

  // Derive categories dynamically from past events
  const categories = ['All', ...Array.from(new Set(pastEvents.map(e => e.category))).filter(Boolean)]

  const filtered = activeCategory === 'All'
    ? pastEvents
    : pastEvents.filter(p => p.category === activeCategory)

  return (
    <>
      {/* HERO */}
      <PageHeader
        image="https://res.cloudinary.com/gbarhqu6/image/upload/f_auto/q_auto/ChatGPT_Image_Jul_25_2026_06_04_14_PM_h7qhy6.png"
        title="OUR EVENTS"
        subtitle="A Showcase of Extraordinary Productions"
        breadcrumbs={[{ label: 'Events' }]}
      />

      {/* STATS STRIP */}
      <section className="py-10 border-b border-brand-border bg-brand-section">
        <div className="container-luxury">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-20">
            {[
              { value: `${allEvents.length || '500'}+`, label: 'Events Executed' },
              { value: '10+', label: 'Years Experience' },
              { value: '50k+', label: 'Happy Guests' },
              { value: '30+', label: 'Expert Team' },
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

                    <Link to={`/events/${event.slug || event.id}`} className="btn-gold font-bold text-xs">
                      View Details & Register <ArrowRight size={13} />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}




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
