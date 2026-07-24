import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { urlFor } from '@/sanity/image'
import { getAboutData, getSiteSettings } from '@/sanity/queries'
import { ArrowRight, Heart, Award, Shield, Clock, Target, Eye, Star } from 'lucide-react'
import { getIconComponent } from '@/utils/sanityHelpers'
import SectionHeading from '@/components/shared/SectionHeading'
import AnimatedCounter from '@/components/shared/AnimatedCounter'
import WhyChooseUs from '@/components/shared/WhyChooseUs'
import PageHeader from '@/components/shared/PageHeader'
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '@/animations/variants'

// ─── Static fallbacks ─────────────────────────────────────────
const FALLBACK_VALUES = [
  { icon: 'Heart', title: 'Passion', desc: 'Every event is treated as our own — with full heart and dedication.' },
  { icon: 'Award', title: 'Excellence', desc: 'We never settle for anything less than extraordinary.' },
  { icon: 'Shield', title: 'Trust', desc: '500+ clients trust us with their most precious moments.' },
  { icon: 'Clock', title: 'Precision', desc: 'Flawless execution, on time, every time, without exception.' },
]

const FALLBACK_TIMELINE = [
  { year: '2015', title: 'AK Productions Founded', desc: 'Started as a small wedding decoration studio in Chennai.' },
  { year: '2017', title: 'First Corporate Client', desc: 'Expanded to corporate events with 5-star hotel partnerships.' },
  { year: '2019', title: 'Photography Division', desc: 'Launched in-house photography and videography services.' },
  { year: '2021', title: '200+ Events Milestone', desc: 'Celebrated 200 successful events despite challenging times.' },
  { year: '2023', title: 'All-India Operations', desc: 'Expanded operations across Tamil Nadu and major Indian cities.' },
  { year: '2025', title: '500+ Events & Growing', desc: "Now Chennai's most trusted luxury event management brand." },
]

const FALLBACK_TEAM = [
  {
    name: 'Arun Kumar',
    role: 'Founder & Creative Director',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80&auto=format&fit=crop',
  },
  {
    name: 'Priya Sharma',
    role: 'Event Manager',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80&auto=format&fit=crop',
  },
  {
    name: 'Rahul Verma',
    role: 'Production Head',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80&auto=format&fit=crop',
  },
  {
    name: 'Sneha Iyer',
    role: 'Client Relations',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80&auto=format&fit=crop',
  },
]

// ─── Framer variants ──────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}
const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

function SectionEyebrow({ children, center = false }: { children: string; center?: boolean }) {
  return (
    <div className={`flex items-center gap-3 mb-4 ${center ? 'justify-center' : ''}`}>
      <span className="gold-line" />
      <span className="text-brand-gold text-[11px] font-body font-semibold uppercase tracking-[0.28em]">
        {children}
      </span>
      {center && <span className="gold-line" />}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
export default function About() {
  const [aboutData, setAboutData] = useState<any>(null)
  const [siteSettings, setSiteSettings] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getAboutData(), getSiteSettings()])
      .then(([aboutRes, settingsRes]) => {
        if (aboutRes) setAboutData(aboutRes)
        if (settingsRes) setSiteSettings(settingsRes)
        setLoading(false)
      })
      .catch(err => { console.error('SANITY ERROR:', err); setLoading(false) })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin" />
      </div>
    )
  }

  // ─── Derived values ────────────────────────────────────────
  const heroTitle = aboutData?.heroTitle || 'ABOUT US'
  const heroSubtitle = aboutData?.heroSubtitle || 'Driven by creativity, precision, and passion, we deliver exceptional event experiences that leave lasting memories.'

  const title = aboutData?.title || 'Who We Are'
  const heading = aboutData?.heading || 'Born from a Passion for Perfect Moments'
  const description = aboutData?.description
  // Hero image — siteSettings first, then aboutData.image, then static fallback
  const heroImage = siteSettings?.aboutHeroImage
    ? urlFor(siteSettings.aboutHeroImage).width(1400).url()
    : (aboutData?.image ? urlFor(aboutData.image).width(1400).url() : 'https://res.cloudinary.com/gbarhqu6/image/upload/f_auto/q_auto/ChatGPT_Image_Jul_24_2026_03_09_08_PM_fq7mkv.png')


  const storyImages: string[] = aboutData?.images?.length
    ? aboutData.images.map((img: any) => urlFor(img).url())
    : [
      'https://res.cloudinary.com/gbarhqu6/image/upload/f_auto/q_auto/pexels-darshandave-30840225_eohudh.jpg',
      'https://res.cloudinary.com/gbarhqu6/image/upload/f_auto/q_auto/rawabi-i-qOca8zlCVPY-unsplash_jtec27.jpg',
      'https://res.cloudinary.com/gbarhqu6/image/upload/f_auto/q_auto/pexels-vlada-karpovich-7099884_guu03n.jpg',
      'https://res.cloudinary.com/gbarhqu6/image/upload/f_auto/q_auto/pexels-thevisionaryvows-33914537_azpgjt.jpg',
    ]

  const missionTitle = aboutData?.missionTitle || 'To Craft Extraordinary'
  const missionText = aboutData?.missionText || "To transform every client's vision into a breathtaking, flawlessly executed reality — delivering luxury experiences that exceed expectations and create memories that last a lifetime."
  const visionTitle = aboutData?.visionTitle || "India's Finest Event Brand"
  const visionText = aboutData?.visionText || "To be recognized as India's most sought-after luxury event management brand — synonymous with creativity, trust, and the highest standard of celebration craftsmanship."

  const eventsCount = aboutData?.eventsCount ?? 500
  const teamCount = aboutData?.teamCount ?? 30
  const guestsCount = aboutData?.guestsCount ?? 50000
  const yearsCount = aboutData?.yearsCount ?? 10

  const team = aboutData?.team?.length ? aboutData.team : FALLBACK_TEAM
  const values = aboutData?.values?.length ? aboutData.values : FALLBACK_VALUES
  const timeline = aboutData?.timeline?.length ? aboutData.timeline : FALLBACK_TIMELINE

  const ctaTitle = aboutData?.ctaTitle || 'Ready to Create Something Unforgettable?'
  const ctaSubtitle = aboutData?.ctaSubtitle || "Book a free consultation with our team and let's start planning your perfect event."
  const ctaButtonText = aboutData?.ctaButtonText || 'Book Free Consultation'

  return (
    <>
      {/* ── Page Hero ── */}
      <PageHeader
        image={heroImage}
        title={heroTitle}
        subtitle={heroSubtitle}
        breadcrumbs={[{ label: 'About' }]}
      />

      {/* ── Story ── */}
      <section className="section bg-brand-bg">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <motion.div variants={fadeInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <SectionEyebrow>{title}</SectionEyebrow>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-heading mb-6">{heading}</h2>
              <div className="space-y-4 text-brand-body leading-relaxed font-light">
                {description ? (
                  description.split('\n\n').map((pText: string, idx: number) => <p key={idx}>{pText}</p>)
                ) : (
                  <>
                    <p>AK Productions was born in 2015 from a simple belief: every celebration deserves to be extraordinary. What began as a boutique wedding decoration studio in Chennai has grown into one of the city's most respected luxury event management companies.</p>
                    <p>Our founder built this company on three pillars: creative excellence, flawless execution, and genuine care for every client. Today, our 30-member team shares that same passion — from our master decorators and cinematographers to our coordinators and culinary partners.</p>
                    <p>Over 500 events later, we still approach every booking with the same excitement and dedication as our very first. Because for us, it's not just a job — it's an art.</p>
                  </>
                )}
              </div>
              <Link to="/events" className="btn-gold mt-8">
                See Our Work <ArrowRight size={14} />
              </Link>
            </motion.div>

            <motion.div variants={fadeInRight} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative">
              <div className="grid grid-cols-2 gap-4">
                {storyImages.map((src: string, i: number) => (
                  <div
                    key={i}
                    className={`overflow-hidden rounded-3xl border border-brand-border shadow-card ${i === 1 ? 'mt-8' : ''} ${i === 2 ? '-mt-8' : ''}`}
                  >
                    <img
                      src={src} alt={`Story grid ${i + 1}`}
                      className="aspect-square object-cover w-full hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-3xl p-5 text-center border border-brand-border shadow-float">
                <div className="font-display text-3xl font-bold text-gradient-gold">{yearsCount}+</div>
                <div className="text-brand-body text-xs mt-1">Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="section bg-brand-section">
        <div className="container-luxury">
          <div className="text-center mb-12">
            <SectionEyebrow center>Our Purpose</SectionEyebrow>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-heading">
              Mission & <span className="text-gradient-gold">Vision</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Target, pretitle: 'Our Mission', title: missionTitle, text: missionText },
              { icon: Eye, pretitle: 'Our Vision', title: visionTitle, text: visionText },
            ].map(({ icon: Icon, pretitle, title: t, text }, i) => (
              <motion.div
                key={pretitle}
                variants={i === 0 ? fadeInLeft : fadeInRight}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="bg-white rounded-4xl p-8 border border-brand-border shadow-card hover:shadow-card-hover hover:border-brand-gold/30 transition-all duration-400"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-brand-gold/10 border border-brand-gold/22 flex items-center justify-center">
                    <Icon size={24} className="text-brand-gold" />
                  </div>
                  <div>
                    <div className="text-brand-gold text-[10px] uppercase tracking-widest mb-0.5">{pretitle}</div>
                    <h3 className="font-display text-xl text-brand-heading font-bold">{t}</h3>
                  </div>
                </div>
                <p className="text-brand-body leading-relaxed font-light">{text}</p>
                <div className="mt-6 h-px bg-gradient-to-r from-brand-gold/40 via-brand-gold/15 to-transparent" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section bg-brand-bg">
        <div className="container-luxury">
          <SectionHeading pretitle="Our Values" title="What Drives" highlight="Us" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v: any, i: number) => {
              const Icon = getIconComponent(v.icon) || Heart
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-4xl p-7 text-center border border-brand-border shadow-card hover:shadow-card-hover hover:border-brand-gold/30 transition-all duration-400"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-brand-gold/10 border border-brand-gold/22 flex items-center justify-center">
                    <Icon size={24} className="text-brand-gold" />
                  </div>
                  <h3 className="font-display text-xl text-brand-heading font-semibold mb-2">{v.title}</h3>
                  <p className="text-brand-body text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="section bg-brand-section border-y border-brand-border">
        <div className="container-luxury">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { val: eventsCount, suf: '+', label: 'Events Executed' },
              { val: teamCount, suf: '+', label: 'Expert Team Members' },
              { val: guestsCount, suf: '+', label: 'Happy Guests' },
              { val: yearsCount, suf: '+', label: 'Years in Chennai' },
            ].map(({ val, suf, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="font-display text-4xl md:text-5xl font-bold text-gradient-gold mb-2">
                  <AnimatedCounter end={val} suffix={suf} />
                </div>
                <div className="text-brand-body/65 text-sm font-body font-medium">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="section bg-brand-bg">
        <div className="container-luxury">
          <SectionHeading pretitle="Our Journey" title="A Decade of" highlight="Excellence" />
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical gold line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-brand-gold via-brand-gold-secondary to-transparent" />
            {timeline.map((item: any, i: number) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-16 pb-10 last:pb-0"
              >
                {/* Year bubble */}
                <div className="absolute left-0 w-12 h-12 rounded-full bg-white border-2 border-brand-gold/40 shadow-card flex items-center justify-center text-brand-gold text-xs font-bold">
                  {item.year.slice(2)}
                </div>
                <div className="text-brand-gold text-xs uppercase tracking-widest mb-1">{item.year}</div>
                <h3 className="font-display text-lg text-brand-heading font-semibold mb-1">{item.title}</h3>
                <p className="text-brand-body text-sm font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <WhyChooseUs />

      {/* ── CTA ── */}
      <section className="section bg-brand-section">
        <div className="container-luxury text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-heading mb-4">
              {ctaTitle}
            </h2>
            <p className="text-brand-body mb-8 max-w-xl mx-auto font-body font-light">
              {ctaSubtitle}
            </p>
            <Link to="/contact" className="btn-gold">{ctaButtonText} <ArrowRight size={14} /></Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
