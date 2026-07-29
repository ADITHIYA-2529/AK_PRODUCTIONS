import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  Calendar, Clock, MapPin, User, Building2, Users, ArrowRight,
  CheckCircle2, X, AlertCircle, Sparkles, Tag, ArrowLeft, Send, Check
} from 'lucide-react'
import { urlFor } from '@/sanity/image'
import { getEventBySlug, getEventById } from '@/sanity/queries'
import { PORTFOLIO_ITEMS, PortfolioItem } from '@/data/portfolio'
import GalleryLightbox from '@/components/shared/GalleryLightbox'
import { sendRegistrationEmail } from '@/services/emailService'

export default function EventDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [event, setEvent] = useState<PortfolioItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [registerModalOpen, setRegisterModalOpen] = useState(false)

  // Registration Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    participants: 1,
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 180])
  const scale = useTransform(scrollY, [0, 600], [1.05, 1.25])

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      return
    }

    setLoading(true)
    setSubmitStatus(null)

    // Try fetching by slug first, then by ID, then fallback to local static data
    getEventBySlug(slug)
      .then((data) => {
        if (data) {
          mapAndSetEvent(data)
        } else {
          return getEventById(slug).then((byIdData) => {
            if (byIdData) {
              mapAndSetEvent(byIdData)
            } else {
              fallbackToLocal(slug)
            }
          })
        }
      })
      .catch((err) => {
        console.error('SANITY EVENT FETCH ERROR:', err)
        fallbackToLocal(slug)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [slug])

  const mapAndSetEvent = (data: any) => {
    const mapped: PortfolioItem = {
      id: data._id,
      slug: data.slug || data._id,
      title: data.title,
      subtitle: data.subtitle || '',
      category: data.category || 'Event',
      coverImage: data.bannerImage
        ? urlFor(data.bannerImage).url()
        : data.coverImage
          ? urlFor(data.coverImage).url()
          : '',
      images: data.images?.length ? data.images.map((img: any) => urlFor(img).url()) : [],
      guests: data.guests ?? 0,
      venue: data.venue || 'Venue to be announced',
      description: data.description || 'No detailed description available for this event.',
      tags: data.tags || [],
      date: data.date || 'Date TBD',
      time: data.time || '',
      organizer: data.organizer || 'AK Productions',
      registrationDeadline: data.registrationDeadline || '',
      status: data.status || 'past',
      featured: !!data.featured,
    }
    setEvent(mapped)
  }

  const fallbackToLocal = (searchSlug: string) => {
    const local = PORTFOLIO_ITEMS.find(
      (item) => item.slug === searchSlug || item.id === searchSlug
    )
    if (local) {
      setEvent({
        ...local,
        slug: local.slug || local.id,
        time: local.time || '10:00 AM IST',
        organizer: local.organizer || 'AK Productions',
      })
    } else {
      setEvent(null)
    }
  }

  // Form Validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required'
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.college.trim()) {
      newErrors.college = 'College / Organization is required'
    }

    if (!formData.participants || formData.participants < 1) {
      newErrors.participants = 'Number of participants must be at least 1'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'participants' ? Math.max(1, parseInt(value) || 1) : value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!event) return

    if (!validateForm()) {
      return
    }

    setSubmitting(true)
    setSubmitStatus(null)

    try {
      const res = await sendRegistrationEmail({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        college: formData.college.trim(),
        participants: formData.participants,
        message: formData.message.trim(),
        eventId: event.id,
        eventName: event.title,
        eventDate: event.date,
        eventTitle: event.title,
      })

      if (res.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your registration request has been submitted successfully.',
        })
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          college: '',
          participants: 1,
          message: '',
        })
      } else {
        setSubmitStatus({
          type: 'error',
          message: res.message || 'Failed to submit registration. Please try again.',
        })
      }
    } catch (err: any) {
      setSubmitStatus({
        type: 'error',
        message: 'An unexpected error occurred. Please try again later.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin" />
      </div>
    )
  }

  // 404 Event Not Found
  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6 bg-brand-bg py-24">
        <div className="max-w-md">
          <div className="w-16 h-16 bg-brand-gold/10 border border-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-gold">
            <AlertCircle size={32} />
          </div>
          <h1 className="font-display text-3xl text-brand-heading font-bold mb-3">Event Not Found</h1>
          <p className="text-brand-body mb-8 font-body text-sm leading-relaxed">
            The event you are looking for does not exist or may have been removed.
          </p>
          <Link to="/events" className="btn-gold font-bold inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Events
          </Link>
        </div>
      </div>
    )
  }

  const allImages = [event.coverImage, ...(event.images || [])].filter(Boolean)

  return (
    <div className="bg-brand-bg text-brand-body min-h-screen">
      {/* HERO / BANNER SECTION */}
      <motion.section
        ref={containerRef}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 1] }}
        className="relative h-[480px] md:h-[540px] w-full flex items-center justify-center overflow-hidden rounded-b-[40px] md:rounded-b-[56px] shadow-float-lg bg-brand-bg"
      >
        {/* Parallax Hero Image */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <motion.img
            src={event.coverImage}
            alt={event.title}
            style={{ y, scale }}
            transition={{ duration: 0.1, ease: 'linear' }}
            className="w-full h-[120%] object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/45 z-10" />
        </div>

        {/* Hero Content */}
        <div className="container-luxury relative z-20 text-center flex flex-col items-center justify-center pt-16">
          {/* Breadcrumb Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 mb-4 font-body text-xs font-semibold uppercase tracking-widest"
          >
            <Link to="/" className="text-white/70 hover:text-brand-gold transition-colors">
              Home
            </Link>
            <span className="text-brand-gold font-medium">/</span>
            <Link to="/events" className="text-white/70 hover:text-brand-gold transition-colors">
              Events
            </Link>
            <span className="text-brand-gold font-medium">/</span>
            <span className="text-brand-gold font-bold">{event.category}</span>
          </motion.nav>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ textShadow: '0 5px 25px rgba(0,0,0,0.4)' }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-wide leading-tight mb-4 select-none bg-gradient-to-r from-[#F8E8B0] via-[#E6C97A] via-[#C8A24A] to-[#9B6A18] bg-clip-text text-transparent max-w-4xl"
          >
            {event.title}
          </motion.h1>

          {/* Subtitle */}
          {event.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
              className="text-white/90 text-sm md:text-base font-accent tracking-wider font-light max-w-2xl mx-auto mb-6"
            >
              {event.subtitle}
            </motion.p>
          )}

          {/* Register CTA Button in Hero */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex items-center gap-4"
          >
            <button
              onClick={() => setRegisterModalOpen(true)}
              className="btn-gold font-bold px-8 py-3.5 shadow-lg text-sm flex items-center gap-2 group"
            >
              <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
              Register Now
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* MAIN CONTENT SECTION */}
      <section className="section bg-brand-bg py-16">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Event Overview & Description */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <span className="gold-line" />
                <span className="text-brand-gold text-xs uppercase tracking-widest font-semibold font-body">
                  Event Details
                </span>
              </div>

              <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-heading mb-6">
                About The Event
              </h2>

              <p className="text-brand-body text-base md:text-lg leading-relaxed font-body mb-8 whitespace-pre-line">
                {event.description}
              </p>

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <div className="mb-10">
                  <h4 className="text-xs uppercase tracking-widest text-brand-body/70 font-semibold mb-3 flex items-center gap-2 font-body">
                    <Tag size={13} className="text-brand-gold" /> Highlights & Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-white border border-brand-border text-brand-heading text-xs px-3 py-1.5 rounded-full font-body font-medium shadow-sm hover:border-brand-gold/40 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Image Gallery */}
              {allImages.length > 0 && (
                <div className="pt-6 border-t border-brand-border">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="gold-line" />
                    <h3 className="font-display text-xl text-brand-heading font-bold">
                      Event Gallery
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {allImages.map((img, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06 }}
                        onClick={() => {
                          setLightboxIndex(i)
                          setLightboxOpen(true)
                        }}
                        className="aspect-4/3 overflow-hidden rounded-2xl group border border-brand-border hover:border-brand-gold transition-all duration-300 shadow-sm relative"
                      >
                        <img
                          src={img}
                          alt={`${event.title} image ${i + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold">
                          View Image
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Sticky Event Details Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-7 border border-brand-border shadow-card sticky top-24">
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-brand-border">
                  <span className="text-xs font-body font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full">
                    {event.category}
                  </span>
                  {event.status && (
                    <span className={`text-[11px] font-body font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${event.status === 'upcoming'
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      : 'bg-gray-100 text-gray-600'
                      }`}>
                      {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                    </span>
                  )}
                </div>

                {/* Key Details List */}
                <div className="space-y-5 mb-8">
                  {/* Date */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold flex-shrink-0 mt-0.5">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-brand-body/60 font-body font-semibold">
                        Event Date
                      </div>
                      <div className="text-sm font-body font-semibold text-brand-heading">
                        {event.date}
                      </div>
                    </div>
                  </div>

                  {/* Time */}
                  {event.time && (
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold flex-shrink-0 mt-0.5">
                        <Clock size={18} />
                      </div>
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-brand-body/60 font-body font-semibold">
                          Event Time
                        </div>
                        <div className="text-sm font-body font-semibold text-brand-heading">
                          {event.time}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Venue */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold flex-shrink-0 mt-0.5">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-brand-body/60 font-body font-semibold">
                        Venue
                      </div>
                      <div className="text-sm font-body font-semibold text-brand-heading">
                        {event.venue}
                      </div>
                    </div>
                  </div>

                  {/* Organizer */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold flex-shrink-0 mt-0.5">
                      <User size={18} />
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-brand-body/60 font-body font-semibold">
                        Organizer
                      </div>
                      <div className="text-sm font-body font-semibold text-brand-heading">
                        {event.organizer || 'AK Productions'}
                      </div>
                    </div>
                  </div>

                  {/* Guest count */}
                  {event.guests > 0 && (
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold flex-shrink-0 mt-0.5">
                        <Users size={18} />
                      </div>
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-brand-body/60 font-body font-semibold">
                          Expected Attendees
                        </div>
                        <div className="text-sm font-body font-semibold text-brand-heading">
                          {event.guests}+ Guests
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Main Register Button */}
                <button
                  onClick={() => setRegisterModalOpen(true)}
                  className="btn-gold w-full text-center justify-center py-3.5 text-xs font-bold uppercase tracking-wider shadow-md mb-3"
                >
                  Register Now <ArrowRight size={14} />
                </button>

                <p className="text-[11px] text-center text-brand-body/60 font-body">
                  Instant registration • No payment required
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY LIGHTBOX */}
      <GalleryLightbox
        images={allImages}
        isOpen={lightboxOpen}
        initialIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
      />

      {/* REGISTRATION MODAL */}
      <AnimatePresence>
        {registerModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setRegisterModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-brand-border overflow-hidden z-10 my-8"
            >
              {/* Modal Header */}
              <div className="bg-brand-section px-6 py-5 border-b border-brand-border flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-body font-bold text-brand-gold uppercase tracking-wider">
                    Event Registration
                  </div>
                  <h3 className="font-display text-lg sm:text-xl text-brand-heading font-bold truncate max-w-md">
                    {event.title}
                  </h3>
                </div>
                <button
                  onClick={() => setRegisterModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-white border border-brand-border flex items-center justify-center text-brand-body hover:text-brand-heading hover:border-brand-gold transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Form */}
              <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
                {submitStatus?.type === 'success' ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto mb-4">
                      <CheckCircle2 size={36} />
                    </div>
                    <h4 className="font-display text-2xl font-bold text-brand-heading mb-2">
                      Registration Submitted!
                    </h4>
                    <p className="text-brand-body text-sm font-body leading-relaxed max-w-md mx-auto mb-6">
                      {submitStatus.message}
                    </p>
                    <button
                      onClick={() => {
                        setRegisterModalOpen(false)
                        setSubmitStatus(null)
                      }}
                      className="btn-gold font-bold px-6 py-2.5 text-xs"
                    >
                      Close Window
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {submitStatus?.type === 'error' && (
                      <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-xs font-body">
                        <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                        <div>{submitStatus.message}</div>
                      </div>
                    )}

                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-body font-semibold uppercase tracking-wider text-brand-heading mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-body bg-brand-bg text-brand-heading focus:outline-none transition-colors ${errors.fullName
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-brand-border focus:border-brand-gold'
                          }`}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-[11px] font-body mt-1">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Email & Phone grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div>
                        <label className="block text-xs font-body font-semibold uppercase tracking-wider text-brand-heading mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          className={`w-full px-4 py-3 rounded-xl border text-sm font-body bg-brand-bg text-brand-heading focus:outline-none transition-colors ${errors.email
                            ? 'border-red-400 focus:border-red-500'
                            : 'border-brand-border focus:border-brand-gold'
                            }`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-[11px] font-body mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-body font-semibold uppercase tracking-wider text-brand-heading mb-1.5">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          className={`w-full px-4 py-3 rounded-xl border text-sm font-body bg-brand-bg text-brand-heading focus:outline-none transition-colors ${errors.phone
                            ? 'border-red-400 focus:border-red-500'
                            : 'border-brand-border focus:border-brand-gold'
                            }`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-[11px] font-body mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* College / Organization & Participants */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* College */}
                      <div>
                        <label className="block text-xs font-body font-semibold uppercase tracking-wider text-brand-heading mb-1.5">
                          College / Organization <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="college"
                          value={formData.college}
                          onChange={handleInputChange}
                          placeholder="Institution or company"
                          className={`w-full px-4 py-3 rounded-xl border text-sm font-body bg-brand-bg text-brand-heading focus:outline-none transition-colors ${errors.college
                            ? 'border-red-400 focus:border-red-500'
                            : 'border-brand-border focus:border-brand-gold'
                            }`}
                        />
                        {errors.college && (
                          <p className="text-red-500 text-[11px] font-body mt-1">
                            {errors.college}
                          </p>
                        )}
                      </div>

                      {/* Participants */}
                      <div>
                        <label className="block text-xs font-body font-semibold uppercase tracking-wider text-brand-heading mb-1.5">
                          Number of Participants <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="participants"
                          min="1"
                          value={formData.participants}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border text-sm font-body bg-brand-bg text-brand-heading focus:outline-none transition-colors ${errors.participants
                            ? 'border-red-400 focus:border-red-500'
                            : 'border-brand-border focus:border-brand-gold'
                            }`}
                        />
                        {errors.participants && (
                          <p className="text-red-500 text-[11px] font-body mt-1">
                            {errors.participants}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message (Optional) */}
                    <div>
                      <label className="block text-xs font-body font-semibold uppercase tracking-wider text-brand-heading mb-1.5">
                        Additional Message <span className="text-brand-body/50 text-[10px] lowercase">(optional)</span>
                      </label>
                      <textarea
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Any special requests or queries?"
                        className="w-full px-4 py-3 rounded-xl border border-brand-border focus:border-brand-gold text-sm font-body bg-brand-bg text-brand-heading focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-3">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-gold w-full text-center justify-center py-3.5 text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-2"
                      >
                        {submitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Confirm Registration <Send size={14} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
