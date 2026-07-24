import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Phone, Mail, Send, Check, Instagram, Facebook, MapPin } from 'lucide-react'
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '@/animations/variants'
import { urlFor } from '@/sanity/image'
import { getContactData, getSiteSettings } from '@/sanity/queries'

import PageHeader from '@/components/shared/PageHeader'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit mobile number'),
  subject: z.string().min(3, 'Subject required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

// ─── Animation variants ───────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [contactData, setContactData] = useState<any>(null)
  const [contactHeroImage, setContactHeroImage] = useState('https://res.cloudinary.com/gbarhqu6/image/upload/f_auto/q_auto/ChatGPT_Image_Jul_24_2026_03_13_26_PM_ntevxg.png')

  useEffect(() => {
    Promise.all([getContactData(), getSiteSettings()])
      .then(([data, settingsData]) => {
        if (data) setContactData(data)
        if (settingsData?.contactHeroImage) {
          setContactHeroImage(urlFor(settingsData.contactHeroImage).width(1400).url())
        }
      })
      .catch(err => console.error('SANITY ERROR:', err))
  }, [])

  const phone = contactData?.phone || '+91 96772 03639'
  const whatsappNumber = contactData?.whatsappNumber || phone
  const email = contactData?.email || 'akeventschennai@gmail.com'
  const address = contactData?.address || 'Chennai, Tamil Nadu'
  const googleMapsUrl = contactData?.googleMapsUrl || 'https://maps.google.com/?q=AK+Events+Chennai'
  const workingHours = contactData?.workingHours || 'Mon – Sun · 9 AM – 9 PM'
  const instagramUsername = contactData?.instagramUsername || '@ak_events3639'
  const instagramUrl = contactData?.instagramUrl || 'https://www.instagram.com/ak_events3639'
  const facebookName = contactData?.facebookName || 'AK Productions'
  const facebookUrl = contactData?.facebookUrl || 'https://www.facebook.com/profile.php?id=61580711224848'

  const contactChannels = [
    { id: 'phone', icon: Phone, label: 'Call Us', value: phone, sub: workingHours, href: `tel:${phone.replace(/\s+/g, '')}` },
    { id: 'email', icon: Mail, label: 'Email Us', value: email, sub: 'We reply within 4 hours', href: `mailto:${email}` },
    { id: 'instagram', icon: Instagram, label: 'Instagram', value: instagramUsername, sub: 'Follow our latest work', href: instagramUrl },
    { id: 'facebook', icon: Facebook, label: 'Facebook', value: facebookName, sub: 'Like our page', href: facebookUrl },
  ]

  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = (data: ContactFormData) => {
    console.log(data)
    setSubmitted(true)
  }

  const inputClass = "w-full bg-white border border-brand-border rounded-2xl px-4 py-3.5 text-brand-heading text-sm font-body placeholder:text-brand-body/35 focus:outline-none focus:border-brand-gold focus:shadow-[0_0_0_3px_rgba(200,162,74,0.12)] transition-all duration-300"

  return (
    <>
      {/* ── Page Hero ── */}
      <PageHeader
        image={contactHeroImage}
        title="CONTACT US"
        subtitle="Let's discuss your vision and create an extraordinary event together."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      {/* ── Contact Channels ── */}
      <section className="section bg-brand-section border-b border-brand-border">
        <div className="container-luxury">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="text-center mb-14"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-4 justify-center">
              <span className="gold-line" />
              <span className="text-brand-gold text-xs uppercase tracking-[0.3em] font-display font-semibold">Reach Out</span>
              <span className="gold-line" />
            </motion.div>
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl font-bold text-brand-heading">
              Connect With <span className="text-gradient-gold">Us Directly</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-brand-body mt-4 max-w-md mx-auto font-body font-light">
              We're always a message or call away. Choose the channel that works best for you.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {contactChannels.map(({ id, icon: Icon, label, value, sub, href }) => (
              <motion.a
                key={id}
                href={href}
                target={id === 'instagram' || id === 'facebook' ? '_blank' : undefined}
                rel={id === 'instagram' || id === 'facebook' ? 'noopener noreferrer' : undefined}
                variants={fadeInUp}
                whileHover={{ y: -6 }}
                className="contact-channel-card p-7 flex flex-col items-start gap-4 group cursor-pointer"
                aria-label={label}
              >
                <div className="contact-icon-circle">
                  <Icon size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-display font-bold uppercase tracking-[0.22em] text-brand-body/50 mb-1">{label}</div>
                  <div className="font-display text-brand-heading font-semibold text-sm leading-snug group-hover:text-brand-gold transition-colors duration-300">{value}</div>
                  <div className="text-brand-body/50 text-[11px] font-body mt-1">{sub}</div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* WhatsApp CTA Banner */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8"
          >
            <a
              href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20AK%20Productions!%20I%20would%20like%20to%20enquire%20about%20your%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col sm:flex-row items-center gap-5 bg-white rounded-4xl px-8 py-6 border border-brand-border shadow-card hover:shadow-card-hover hover:border-[#25D366]/40 transition-all duration-400 group"
            >
              <div className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 text-white shadow-card">
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <div>
                <div className="font-display font-bold text-brand-heading group-hover:text-[#1a9c4f] transition-colors">Chat on WhatsApp</div>
                <div className="text-brand-body text-sm font-body font-light">Typically responds within minutes · {whatsappNumber}</div>
              </div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Contact Form + Info ── */}
      <section className="section bg-brand-bg">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Left: Info */}
            <motion.div variants={fadeInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="gold-line" />
                <span className="text-brand-gold text-xs uppercase tracking-widest font-display font-semibold">
                  Contact Information
                </span>
              </div>
              <h2 className="font-display text-3xl font-bold text-brand-heading mb-4">
                Let's Start <span className="text-gradient-gold">Planning Together</span>
              </h2>
              <p className="text-brand-body mb-8 leading-relaxed font-body font-light">
                Whether you have a question, need a quote, or are ready to start planning — we're here for you.
                Reach out through any channel and our team will respond promptly.
              </p>

              {/* Contact detail rows */}
              <div className="space-y-4 mb-8">
                {[
                  { id: 'phone', icon: Phone, label: 'Phone', value: phone, href: `tel:${phone.replace(/\s+/g, '')}` },
                  { id: 'email', icon: Mail, label: 'Email', value: email, href: `mailto:${email}` },
                  { id: 'location', icon: MapPin, label: 'Location', value: address, href: googleMapsUrl },
                  { id: 'insta', icon: Instagram, label: 'Instagram', value: instagramUsername, href: instagramUrl },
                  { id: 'fb', icon: Facebook, label: 'Facebook', value: facebookName, href: facebookUrl },
                ].map(({ id, icon: Icon, label, value, href }) => (
                  <a
                    key={id}
                    href={href}
                    target={id === 'insta' || id === 'fb' || id === 'location' ? '_blank' : undefined}
                    rel={id === 'insta' || id === 'fb' || id === 'location' ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 p-4 bg-white rounded-3xl border border-brand-border shadow-card hover:shadow-card-hover hover:border-brand-gold/30 transition-all duration-400 group"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-brand-gold/10 border border-brand-gold/22 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold group-hover:border-brand-gold transition-all duration-300">
                      <Icon size={16} className="text-brand-gold group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-[10px] font-display font-semibold uppercase tracking-widest text-brand-body/50 mb-0.5">{label}</div>
                      <div className="font-display font-semibold text-brand-heading text-sm group-hover:text-brand-gold transition-colors duration-300">{value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div variants={fadeInRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="bg-white rounded-4xl p-8 border border-brand-border shadow-float text-center h-full flex flex-col items-center justify-center min-h-[520px]"
                >
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full border-2 border-brand-gold/20 animate-ping" style={{ animationDuration: '2s' }} />
                    <div className="absolute inset-2 rounded-full border border-brand-gold/30" />
                    <div className="absolute inset-4 rounded-full bg-brand-gold/10 border border-brand-gold flex items-center justify-center shadow-card">
                      <Check size={28} className="text-brand-gold" />
                    </div>
                  </div>
                  <h3 className="font-display text-2xl text-brand-heading font-bold mb-2">Message Sent!</h3>
                  <p className="text-brand-body text-sm max-w-xs font-body">
                    Thank you for reaching out. Our team will get back to you within 4 hours.
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-brand-gold text-xs font-body">
                    <Check size={12} />
                    <span>We typically respond within 4 hours</span>
                  </div>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-white rounded-4xl p-8 border border-brand-border shadow-float space-y-5"
                >
                  <div>
                    <h2 className="font-display text-2xl text-brand-heading font-bold mb-1">Send a Message</h2>
                    <p className="text-brand-body text-sm font-body">We'll respond within 4 business hours.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] text-brand-body font-display font-bold uppercase tracking-widest mb-2">
                        Full Name *
                      </label>
                      <input
                        {...register('name')}
                        placeholder="Your name"
                        className={inputClass}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1.5 font-body">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] text-brand-body font-display font-bold uppercase tracking-widest mb-2">
                        Phone *
                      </label>
                      <input
                        {...register('phone')}
                        type="tel"
                        placeholder="10-digit mobile"
                        className={inputClass}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1.5 font-body">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-brand-body font-display font-bold uppercase tracking-widest mb-2">
                      Email *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="your@email.com"
                      className={inputClass}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1.5 font-body">{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] text-brand-body font-display font-bold uppercase tracking-widest mb-2">
                      Subject *
                    </label>
                    <input
                      {...register('subject')}
                      placeholder="e.g. Wedding enquiry for March 2027"
                      className={inputClass}
                    />
                    {errors.subject && <p className="text-red-500 text-xs mt-1.5 font-body">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] text-brand-body font-display font-bold uppercase tracking-widest mb-2">
                      Message *
                    </label>
                    <textarea
                      {...register('message')}
                      rows={5}
                      placeholder="Tell us about your event..."
                      className={`${inputClass} resize-none`}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1.5 font-body">{errors.message.message}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-gold w-full justify-center font-bold py-4 text-sm"
                  >
                    <Send size={15} /> Send Message
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
