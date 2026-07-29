import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import SectionHeading from '@/components/shared/SectionHeading'
import PackageCard from '@/components/shared/PackageCard'
import PackageComparison from '@/components/features/PackageComparison'
import AiBudgetCalculator from '@/components/features/AiBudgetCalculator'
import { getAllPackages, getPricingFaqs } from '@/sanity/queries'
import { PACKAGES } from '@/constants/packages'
import { FAQS } from '@/constants/faqs'

import PageHeader from '@/components/shared/PageHeader'

export default function Packages() {
  const [openFaq, setOpenFaq]   = useState<string | null>(null)
  const [packages, setPackages] = useState(PACKAGES)
  const [faqs, setFaqs]         = useState(FAQS)

  useEffect(() => {
    getAllPackages()
      .then((data) => { if (data?.length) setPackages(data.map((p: any) => ({ ...p, id: p._id }))) })
      .catch((err) => console.error('SANITY PACKAGE ERROR:', err))

    getPricingFaqs()
      .then((data) => {
        if (data?.length) {
          setFaqs(data.map((f: any) => ({ id: f._id, question: f.question, answer: f.answer, category: f.category || 'Pricing' })))
        }
      })
      .catch((err) => console.error('SANITY FAQ ERROR:', err))
  }, [])

  return (
    <>
      {/* Hero */}
      <PageHeader
        image="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1920&q=85&auto=format&fit=crop"
        title="OUR PACKAGES"
        subtitle="Transparent Pricing, Luxury Value"
        breadcrumbs={[{ label: 'Packages' }]}
      />

      {/* Package Cards */}
      <section className="section bg-brand-bg">
        <div className="container-luxury">
          <SectionHeading
            pretitle="Choose Your Package"
            title="Find the"
            highlight="Perfect Fit"
            subtitle="All packages include dedicated event coordination and can be fully customised to your requirements."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} index={i} />
            ))}
          </div>
          <p className="text-center text-brand-body/50 text-xs mt-8">
            * All packages are customisable. Final pricing depends on specific requirements and event date.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section bg-brand-section border-t border-b border-brand-border">
        <div className="container-luxury">
          <SectionHeading
            pretitle="Compare"
            title="Package"
            highlight="Comparison"
            subtitle="See exactly what's included in each tier."
          />
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-brand-border shadow-sm">
            <PackageComparison />
          </div>
        </div>
      </section>

      {/* AI Budget Calculator */}
      <section className="section bg-brand-bg">
        <div className="container-luxury">
          <SectionHeading
            pretitle="Budget Tool"
            title="AI Budget"
            highlight="Calculator"
            subtitle="Get an instant budget estimate for your event — completely free."
          />
          <div className="max-w-4xl mx-auto">
            <AiBudgetCalculator />
          </div>
        </div>
      </section>

      {/* Custom Quote */}
      <section className="section bg-brand-section border-t border-b border-brand-border">
        <div className="container-luxury">
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-brand-border text-center max-w-3xl mx-auto shadow-sm">
            <div className="text-gradient-gold font-display text-5xl font-bold mb-4">✦</div>
            <h2 className="font-display text-3xl font-bold text-brand-heading mb-4">
              Need a Custom Quote?
            </h2>
            <p className="text-brand-body mb-8 leading-relaxed">
              Our premium events are fully bespoke. Share your vision and we'll craft a personalised proposal that exceeds your expectations — and fits your budget.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/book-event" className="btn-gold">Get Custom Quote <ArrowRight size={14} /></Link>
              <a href="https://wa.me/919677203639?text=Hello%20AK%20Productions!%20I%20would%20like%20to%2520enquire%20about%20your%20packages." target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-brand-bg">
        <div className="container-luxury max-w-3xl">
          <SectionHeading pretitle="Questions" title="Pricing" highlight="FAQ" />
          <div className="space-y-3">
            {faqs.filter(f => f.category === 'Pricing').map(faq => (
              <div key={faq.id} className="bg-white rounded-xl border border-brand-border hover:border-brand-gold transition-all duration-300 shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-brand-heading font-medium text-sm">{faq.question}</span>
                  <ChevronDown size={16} className={`text-brand-gold transition-transform flex-shrink-0 ml-4 ${openFaq === faq.id ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === faq.id && (
                  <div className="px-5 pb-5 text-brand-body text-sm leading-relaxed border-t border-brand-border pt-4">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
