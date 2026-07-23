import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, ChevronDown, ArrowRight } from 'lucide-react'
import { getAllFaqs } from '@/sanity/queries'
import { FAQS } from '@/constants/faqs'

import PageHeader from '@/components/shared/PageHeader'

export default function FAQ() {
  const [openFaq, setOpenFaq]         = useState<string | null>(null)
  const [search, setSearch]           = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [faqs, setFaqs]               = useState(FAQS)

  useEffect(() => {
    getAllFaqs()
      .then((data) => {
        if (data && data.length > 0) {
          setFaqs(data.map((f: any) => ({
            id:       f._id,
            question: f.question,
            answer:   f.answer,
            category: f.category || 'General',
          })))
        }
      })
      .catch((err) => console.error('SANITY FAQ ERROR:', err))
  }, [])

  const faqCategories = ['All', ...Array.from(new Set(faqs.map(f => f.category))).filter(Boolean)]

  const filtered = faqs.filter(faq => {
    const matchesSearch = search === '' ||
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <>
      {/* Hero */}
      <PageHeader
        image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80"
        title="HELP & FAQ"
        subtitle="Frequently Asked Questions"
        breadcrumbs={[{ label: 'FAQ' }]}
      />

      {/* Search Section */}
      <section className="py-8 bg-brand-bg">
        <div className="container-luxury text-center">
          <div className="relative max-w-md mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-body/40" />
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white border border-brand-border rounded-full pl-11 pr-4 py-3.5 text-brand-heading text-sm placeholder:text-brand-body/40 focus:outline-none focus:border-brand-gold shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-5 border-b border-brand-border bg-white sticky top-[72px] z-30 shadow-sm">
        <div className="container-luxury">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {faqCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-brand-gold text-white shadow-sm'
                    : 'bg-brand-section text-brand-body border border-brand-border hover:text-brand-heading hover:border-brand-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section bg-brand-bg">
        <div className="container-luxury max-w-3xl">
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={activeCategory + search}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-3"
              >
                {filtered.map((faq, i) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="bg-white rounded-xl border border-brand-border hover:border-brand-gold hover:shadow-brand-soft transition-all duration-300 shadow-sm overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                      className="w-full flex items-start justify-between p-5 text-left gap-4"
                      aria-expanded={openFaq === faq.id}
                    >
                      <div>
                        <span className="text-brand-gold text-[10px] uppercase tracking-widest font-semibold block mb-1">{faq.category}</span>
                        <span className="text-brand-heading font-medium text-sm leading-snug">{faq.question}</span>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`text-brand-gold flex-shrink-0 mt-0.5 transition-transform duration-300 ${openFaq === faq.id ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {openFaq === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-5 pb-5 text-brand-body text-sm leading-relaxed border-t border-brand-border"
                      >
                        <div className="pt-4">{faq.answer}</div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <p className="text-brand-body text-lg mb-4">No results for "{search}"</p>
                <button onClick={() => setSearch('')} className="text-brand-gold text-sm hover:underline font-semibold">
                  Clear search
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="section bg-brand-section border-t border-brand-border">
        <div className="container-luxury">
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-brand-border text-center max-w-2xl mx-auto shadow-sm">
            <div className="text-gradient-gold font-display text-4xl mb-4">?</div>
            <h2 className="font-display text-2xl font-bold text-brand-heading mb-3">Still Have Questions?</h2>
            <p className="text-brand-body mb-8 text-sm leading-relaxed">
              Our event specialists are happy to help. Reach out via WhatsApp or book a free 30-minute consultation call.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="https://wa.me/919677203639?text=Hello%20AK%20Productions!%20I%20have%20a%20question%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                WhatsApp Us <ArrowRight size={14} />
              </a>
              <Link to="/contact" className="btn-outline-gold">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
