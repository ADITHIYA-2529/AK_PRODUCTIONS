import { motion } from 'framer-motion'
import { Shield, Zap, Crown, HeartHandshake, Clock, Sparkles } from 'lucide-react'
import { staggerContainer } from '@/animations/variants'

const REASONS = [
  {
    icon: Crown,
    title: 'Luxury-First Approach',
    desc: 'Every detail is curated to deliver a premium, 5-star experience — from the first consultation to the final flourish.',
    stat: '10+',
    statLabel: 'Years',
  },
  {
    icon: HeartHandshake,
    title: 'Dedicated Event Manager',
    desc: "Your personal event manager is available 24/7, ensuring seamless coordination and peace of mind throughout the entire journey.",
    stat: '1:1',
    statLabel: 'Support',
  },
  {
    icon: Shield,
    title: '100% Satisfaction Guarantee',
    desc: 'We stand behind every event we create. Our commitment is your absolute satisfaction — or we make it right.',
    stat: '500+',
    statLabel: 'Happy Clients',
  },
  {
    icon: Zap,
    title: 'All Under One Roof',
    desc: 'Décor, catering, photography, entertainment — 16 premium services seamlessly managed by a single expert team.',
    stat: '16',
    statLabel: 'Services',
  },
  {
    icon: Clock,
    title: 'Flawless Execution',
    desc: 'Precision planning and rigorous checklists ensure every moment runs exactly on time, every single time.',
    stat: '99%',
    statLabel: 'On-Time Rate',
  },
  {
    icon: Sparkles,
    title: 'Bespoke Creativity',
    desc: 'No two events are alike. We craft entirely custom experiences rooted in your vision, style, and personality.',
    stat: '∞',
    statLabel: 'Possibilities',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="section bg-brand-bg">
      <div className="container-luxury">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4 justify-center"
          >
            <span className="gold-line" />
            <span className="text-brand-gold text-xs font-semibold uppercase tracking-[0.25em]">Why AK Productions</span>
            <span className="gold-line" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-5xl font-bold text-brand-heading mb-4 leading-tight"
          >
            Why Thousands{' '}
            <span className="text-gradient-gold">Choose Us</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-brand-body max-w-xl mx-auto text-base leading-relaxed font-body font-light"
          >
            When it comes to the moments that matter most, experience the difference of working with Chennai's finest.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {REASONS.map(({ icon: Icon, title, desc, stat, statLabel }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -6 }}
              className="why-card rounded-4xl p-8 group cursor-default shadow-card hover:shadow-card-hover hover:border-brand-gold/30 transition-all duration-400"
            >
              {/* Icon + Stat Row */}
              <div className="flex items-start justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 border border-brand-gold/22 flex items-center justify-center group-hover:bg-brand-gold group-hover:border-brand-gold transition-all duration-300">
                  <Icon size={24} className="text-brand-gold group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="text-right">
                  <div className="font-display text-2xl font-bold text-gradient-gold leading-none">{stat}</div>
                  <div className="text-brand-body/40 text-[10px] uppercase tracking-widest mt-0.5">{statLabel}</div>
                </div>
              </div>

              {/* Text */}
              <h3 className="font-display text-lg text-brand-heading font-bold mb-2 group-hover:text-brand-gold transition-colors duration-300">
                {title}
              </h3>
              <p className="text-brand-body text-sm leading-relaxed font-body font-light">{desc}</p>

              {/* Bottom accent line */}
              <div className="mt-5 h-px bg-gradient-to-r from-brand-gold/30 via-brand-gold/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
