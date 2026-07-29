import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  CheckCircle2, CreditCard, ShieldCheck, ArrowRight, Wallet,
  Calendar, Percent, Award, Sparkles, Building2
} from 'lucide-react'

// Accepted payment methods list
const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', desc: 'Google Pay, PhonePe, Paytm' },
  { id: 'cc', label: 'Credit Card', desc: 'All Major Bank Cards' },
  { id: 'dc', label: 'Debit Card', desc: 'Instant EMI Options' },
  { id: 'netbank', label: 'Net Banking', desc: '50+ Supported Banks' },
  { id: 'bank', label: 'Bank Transfer', desc: 'NEFT / RTGS / IMPS' },
]

// EMI Features list
const EMI_FEATURES = [
  { title: 'Easy EMI Options', desc: 'Simple digital documentation and hassle-free processing.', icon: Wallet },
  { title: 'Flexible Payment Plans', desc: 'Customize your payment schedule according to your convenience.', icon: Calendar },
  { title: 'Low Initial Advance', desc: 'Book your event date with a minimal upfront deposit.', icon: Percent },
  { title: 'Multiple EMI Tenures', desc: 'Choose installment periods ranging from 3 to 24 months.', icon: ClockIcon },
  { title: 'Quick Approval Assistance', desc: 'Instant eligibility check with dedicated team guidance.', icon: Award },
  { title: 'Transparent Pricing', desc: 'Zero hidden charges, clear breakdown before booking.', icon: ShieldCheck },
]

function ClockIcon(props: any) {
  return <Sparkles {...props} />
}

export default function EMISection() {
  return (
    <section className="section bg-gradient-to-b from-brand-bg via-brand-section/40 to-brand-bg relative overflow-hidden">
      {/* Decorative gold background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(200,162,74,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="container-luxury relative z-10">
        
        {/* ── Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-4 bg-white px-4 py-2 rounded-full border border-brand-border shadow-card"
          >
            <CreditCard size={13} className="text-brand-gold" />
            <span className="text-brand-gold text-[11px] font-body font-semibold uppercase tracking-[0.22em]">
              Flexible Financing
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand-heading"
          >
            Easy EMI <span className="text-gradient-gold">Available</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-brand-body text-sm sm:text-base mt-3 font-body font-light max-w-xl mx-auto"
          >
            Celebrate now and pay in convenient monthly installments.
          </motion.p>
        </div>

        {/* ── Main Information & Features Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          
          {/* Left Column: Flexible EMI & Payment Options Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-card hover:shadow-card-hover transition-all duration-400 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/22 flex items-center justify-center text-brand-gold mb-6">
                <Building2 size={22} />
              </div>

              <h3 className="font-display text-2xl text-brand-heading font-bold mb-4 leading-tight">
                Flexible EMI & Payment Options
              </h3>

              <p className="text-brand-body text-sm leading-relaxed font-body font-light mb-6">
                We believe every celebration should be memorable regardless of budget. Our flexible EMI and customized payment plans help you organize your event with a small advance payment and pay the remaining amount through convenient monthly installments. EMI availability is subject to eligibility and partner financing terms.
              </p>

              {/* Quick Eligibility Badge */}
              <div className="bg-brand-section/80 rounded-2xl p-4 border border-brand-border/80 mb-6 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-brand-heading font-body">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span>EMI Available for All Services</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-brand-body font-body">
                  <CheckCircle2 size={14} className="text-brand-gold" />
                  <span>Flexible Monthly Installments</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-brand-body font-body">
                  <CheckCircle2 size={14} className="text-brand-gold" />
                  <span>Contact Us for EMI Eligibility</span>
                </div>
              </div>
            </div>

            {/* Enquire EMI Button */}
            <Link
              to="/contact"
              className="btn-gold justify-center w-full font-bold text-xs py-4 group"
            >
              Enquire EMI
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Right Column: 6 Features Cards Grid (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {EMI_FEATURES.map(({ title, desc, icon: Icon }, i) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-5 border border-brand-border hover:border-brand-gold/40 hover:shadow-card transition-all duration-300 flex flex-col group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold mb-4 group-hover:bg-brand-gold group-hover:text-white transition-all duration-300">
                  <Icon size={18} />
                </div>
                <h4 className="font-display text-base text-brand-heading font-semibold mb-1.5">{title}</h4>
                <p className="text-brand-body text-xs leading-relaxed font-body font-light">{desc}</p>
              </div>
            ))}
          </motion.div>

        </div>

        {/* ── Payment Methods Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-sm text-center"
        >
          <div className="text-xs text-brand-gold font-body font-semibold uppercase tracking-[0.22em] mb-4">
            Accepted Payment Methods
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {PAYMENT_METHODS.map(({ id, label, desc }) => (
              <div
                key={id}
                className="bg-brand-bg px-4 sm:px-5 py-3 rounded-2xl border border-brand-border flex items-center gap-3 shadow-xs hover:border-brand-gold/40 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold font-bold text-xs">
                  ✓
                </div>
                <div className="text-left">
                  <div className="font-display text-xs font-bold text-brand-heading">{label}</div>
                  <div className="text-[10px] text-brand-body/60 font-body">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
