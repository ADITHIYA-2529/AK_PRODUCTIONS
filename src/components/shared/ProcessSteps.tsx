import { motion } from 'framer-motion'
import { MessageCircle, Palette, CalendarCheck, PartyPopper } from 'lucide-react'

const STEPS = [
  {
    icon: MessageCircle,
    number: '01',
    title: 'Free Consultation',
    desc: 'Share your vision with our event specialists. We listen, understand your needs, and propose tailored ideas.',
  },
  {
    icon: Palette,
    number: '02',
    title: 'Custom Design',
    desc: 'Our creative team crafts a bespoke concept — from mood boards to detailed layouts — all aligned with your aesthetic.',
  },
  {
    icon: CalendarCheck,
    number: '03',
    title: 'Seamless Planning',
    desc: 'We handle every logistic: vendor coordination, timelines, site visits, and rehearsals — so you can relax.',
  },
  {
    icon: PartyPopper,
    number: '04',
    title: 'Perfect Execution',
    desc: 'On the day, our team arrives early, ensures every detail is perfect, and manages everything flawlessly.',
  },
]

export default function ProcessSteps() {
  return (
    <section className="section bg-brand-section">
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
            <span className="text-brand-gold text-xs font-semibold uppercase tracking-[0.25em]">Our Process</span>
            <span className="gold-line" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-5xl font-bold text-brand-heading mb-4"
          >
            How We Create{' '}
            <span className="text-gradient-gold">Magic</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-brand-body max-w-lg mx-auto text-base"
          >
            From first inquiry to final applause — our 4-step process ensures a flawless, stress-free experience.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="h-full origin-left bg-brand-border/60"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {STEPS.map(({ icon: Icon, number, title, desc }, i) => (
              <motion.div
                key={number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative text-center group"
              >
                {/* Step number bubble */}
                <div className="relative mx-auto w-20 h-20 mb-6">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 rounded-full bg-brand-gold/5 border border-brand-gold/20 group-hover:border-brand-gold/50 transition-all duration-500" />
                  {/* Inner circle */}
                  <div className="absolute inset-2 rounded-full bg-[#C8A24A] flex items-center justify-center shadow-sm">
                    <Icon size={22} className="text-white" />
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-brand-gold/40 flex items-center justify-center shadow-sm">
                    <span className="text-brand-gold text-[9px] font-bold">{number}</span>
                  </div>
                </div>

                <h3 className="font-display text-lg text-brand-heading font-semibold mb-3 group-hover:text-brand-gold transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-brand-body text-sm leading-relaxed max-w-xs sm:max-w-[220px] mx-auto">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
