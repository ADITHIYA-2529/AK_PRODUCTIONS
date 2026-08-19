import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Star, ShieldCheck, Heart, Award, ArrowRight, MessageSquareHeart } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'
import SectionHeading from '@/components/shared/SectionHeading'
import TestimonialCard from '@/components/shared/TestimonialCard'
import { TESTIMONIALS } from '@/constants/testimonials'

export default function Testimonials() {
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', ...Array.from(new Set(TESTIMONIALS.map(t => t.eventType))).filter(Boolean)]

  const filteredTestimonials = activeCategory === 'All'
    ? TESTIMONIALS
    : TESTIMONIALS.filter(t => t.eventType === activeCategory)

  return (
    <>
      {/* Hero Page Header */}
      <PageHeader
        image="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=85&auto=format&fit=crop"
        title="CLIENT TESTIMONIALS"
        subtitle="Stories of Joy, Luxury & Unforgettable Celebrations"
        breadcrumbs={[{ label: 'Testimonials' }]}
      />

      {/* Stats Banner */}
      <section className="py-12 bg-white border-b border-brand-border">
        <div className="container-luxury">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="flex justify-center mb-2">
                <Star className="fill-brand-gold text-brand-gold" size={24} />
              </div>
              <div className="font-display text-3xl font-bold text-brand-heading">5.0 / 5.0</div>
              <p className="text-brand-body text-xs mt-1 uppercase tracking-wider font-semibold">Client Rating</p>
            </div>
            <div className="p-4">
              <div className="flex justify-center mb-2">
                <Award className="text-brand-gold" size={24} />
              </div>
              <div className="font-display text-3xl font-bold text-brand-heading">1500+</div>
              <p className="text-brand-body text-xs mt-1 uppercase tracking-wider font-semibold">Events Executed</p>
            </div>
            <div className="p-4">
              <div className="flex justify-center mb-2">
                <ShieldCheck className="text-brand-gold" size={24} />
              </div>
              <div className="font-display text-3xl font-bold text-brand-heading">100%</div>
              <p className="text-brand-body text-xs mt-1 uppercase tracking-wider font-semibold">On-Time Execution</p>
            </div>
            <div className="p-4">
              <div className="flex justify-center mb-2">
                <Heart className="text-brand-gold" size={24} />
              </div>
              <div className="font-display text-3xl font-bold text-brand-heading">98%</div>
              <p className="text-brand-body text-xs mt-1 uppercase tracking-wider font-semibold">Repeat & Referral Clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Testimonials Section */}
      <section className="section bg-brand-bg">
        <div className="container-luxury">
          <SectionHeading
            pretitle="Real Client Reviews"
            title="Trusted by"
            highlight="1500+ Families & Brands"
            subtitle="Read authentic feedback from couples, families, and corporate leaders who entrusted AK Productions with their most special occasions."
          />

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-brand-gold text-white shadow-button'
                    : 'bg-white text-brand-body hover:text-brand-heading border border-brand-border hover:border-brand-gold/30 shadow-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Testimonials Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredTestimonials.map((testimonial, i) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-cta border-t border-brand-border">
        <div className="container-luxury text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-semibold uppercase tracking-widest mb-6">
            <MessageSquareHeart size={14} />
            <span>Ready to Create Your Memory?</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand-heading mb-6 leading-tight">
            Let's Make Your Event <span className="text-gradient-gold">Unforgettable</span>
          </h2>
          <p className="text-brand-body text-base sm:text-lg mb-8 font-body font-light">
            Contact our dedicated event planning team today to discuss your vision, themes, and customized options.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/book-event" className="btn-gold font-bold w-full sm:w-auto justify-center">
              <span>Book Your Event</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn-outline font-bold w-full sm:w-auto justify-center">
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
