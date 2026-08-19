import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, MapPin, Calendar, Tag, ExternalLink } from 'lucide-react'
import SectionHeading from '@/components/shared/SectionHeading'
import { PORTFOLIO_ITEMS, PORTFOLIO_CATEGORIES, getEventDisplayDate } from '@/data/portfolio'
import { staggerContainer } from '@/animations/variants'
import PageHeader from '@/components/shared/PageHeader'

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(p => p.category === activeCategory)

  // Featured item is always the first from PORTFOLIO_ITEMS (most recent)
  const featured = PORTFOLIO_ITEMS[0]

  return (
    <>
      <PageHeader
        image="https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=1920&q=85&auto=format&fit=crop"
        title="OUR PORTFOLIO"
        subtitle="A Curated Selection of Our Finest Event Productions"
        breadcrumbs={[{ label: 'Portfolio' }]}
      />

      {/* Featured Project Banner */}
      <section className="section">
        <div className="container-luxury">
          <div className="flex items-center gap-3 mb-8">
            <span className="gold-line" />
            <span className="text-gold-400 text-xs font-semibold uppercase tracking-[0.25em]">Featured Project</span>
            <span className="gold-line" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative rounded-2xl overflow-hidden border border-gold/20 hover:border-gold/40 transition-all duration-500"
            style={{ minHeight: '420px' }}
          >
            <img
              src={featured.coverImage}
              alt={featured.title}
              className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/70 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="p-8 md:p-12 max-w-lg">
                {/* Category badge */}
                <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full border border-gold/25 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse-gold" />
                  <span className="text-gold-400 text-[10px] uppercase tracking-widest font-semibold">{featured.category}</span>
                </div>
                <p className="text-gold-400 font-accent italic text-base mb-2">{featured.subtitle}</p>
                <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-4 leading-tight">
                  {featured.title}
                </h2>
                <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-3">{featured.description}</p>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 mb-7 text-white/50 text-xs">
                  <span className="flex items-center gap-1.5">
                    <Users size={12} className="text-gold-400" />{featured.guests} Guests
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-gold-400" />{featured.venue.split(',')[0]}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-gold-400" />{getEventDisplayDate(featured)}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {featured.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 glass px-2.5 py-1 text-[10px] text-white/50 rounded-full border border-white/10">
                      <Tag size={8} />{tag}
                    </span>
                  ))}
                </div>

                <Link to="/contact" className="btn-gold">
                  Plan a Similar Event <ExternalLink size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-6 border-y border-gold/10 bg-surface-light sticky top-[72px] z-30">
        <div className="container-luxury">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {PORTFOLIO_CATEGORIES.map(cat => {
              const count = cat === 'All' ? PORTFOLIO_ITEMS.length : PORTFOLIO_ITEMS.filter(p => p.category === cat).length
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-all duration-300 rounded-full ${
                    isActive
                      ? 'bg-gradient-gold text-dark'
                      : 'glass text-white/60 hover:text-white border border-white/10 hover:border-gold/30'
                  }`}
                >
                  {cat}
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-dark/20 text-dark' : 'bg-white/10 text-white/40'
                  }`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section">
        <div className="container-luxury">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className="group relative overflow-hidden rounded-xl glass border border-white/10 hover:border-gold/30 transition-all duration-300 card-hover"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />

                    {/* Category */}
                    <div className="absolute top-3 left-3 glass px-2.5 py-1 text-[10px] text-gold-400 uppercase tracking-widest rounded-full border border-gold/20">
                      {item.category}
                    </div>

                    {/* Tags */}
                    <div className="absolute top-3 right-3 flex flex-wrap gap-1 justify-end max-w-[60%]">
                      {item.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="glass text-[9px] text-white/60 px-2 py-0.5 rounded-full border border-white/10">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* View Details overlay button */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <Link
                        to="/contact"
                        className="flex items-center gap-1.5 glass px-3 py-1.5 text-[10px] text-gold-400 border border-gold/30 rounded-full hover:bg-gold/20 transition-all"
                      >
                        View Details <ArrowRight size={10} />
                      </Link>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-gold-500 font-accent italic text-sm mb-1">{item.subtitle}</p>
                    <h3 className="font-display text-lg text-white font-bold mb-3 group-hover:text-gold-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex items-center gap-4 text-xs text-white/40 pb-4 border-b border-white/5">
                      <span className="flex items-center gap-1">
                        <Users size={12} />{item.guests} Guests
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />{item.venue.split(',')[0]}
                      </span>
                      <span className="flex items-center gap-1 ml-auto">
                        <Calendar size={12} />{getEventDisplayDate(item)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-white/40">No portfolio items in this category yet.</div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-surface-light">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Want Us to Create Your <span className="text-gradient-gold">Masterpiece?</span>
            </h2>
            <p className="text-white/50 mb-8 max-w-xl mx-auto">Let's plan your event together. Book a free consultation today.</p>
            <Link to="/contact" className="btn-gold">
              Start Planning <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
