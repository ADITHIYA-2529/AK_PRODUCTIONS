import React, { useState } from 'react'
import { useForm, FieldError } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  User, Phone, Mail, Calendar, Users, MapPin, Wallet,
  FileText, Check, ChevronRight, ChevronLeft, Sparkles, ArrowRight, Loader2, AlertCircle
} from 'lucide-react'
import { SERVICES } from '@/constants/services'
import { formatCurrency, formatDate } from '@/utils/formatters'
import { sendBookingEmail } from '@/services/emailService'

import PageHeader from '@/components/shared/PageHeader'

/* ============================================
   INPUT FIELD COMPONENT (Top Level)
   ============================================ */
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  icon: React.ElementType
  error?: FieldError
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ id, label, icon: Icon, type = 'text', placeholder, error, min, onClick, ...rest }, ref) => (
    <div>
      <label htmlFor={id} className="block text-xs text-brand-body font-semibold uppercase tracking-widest mb-2 font-medium">
        {label}
      </label>
      <div className="relative">
        <Icon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-body/40 pointer-events-none z-10" />
        <input
          ref={ref}
          id={id}
          type={type}
          min={min}
          placeholder={placeholder}
          onClick={(e) => {
            if (type === 'date' && 'showPicker' in e.currentTarget) {
              try {
                (e.currentTarget as HTMLInputElement).showPicker()
              } catch {
                // browser restricts showPicker without explicit user action
              }
            }
            onClick?.(e)
          }}
          {...rest}
          className={`w-full bg-white border rounded-xl pl-10 pr-4 py-3.5 text-brand-heading text-sm placeholder:text-brand-body/45 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all ${
            type === 'date' ? 'cursor-pointer' : ''
          } ${error ? 'border-red-500 focus:ring-red-500' : 'border-brand-border'}`}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1.5">{error.message}</p>}
    </div>
  )
)
InputField.displayName = 'InputField'

/* ============================================
   ZOD SCHEMA
   ============================================ */
const bookingSchema = z.object({
  // Step 1 - Event Details
  eventType: z.string().min(1, 'Please select an event type'),
  eventDate: z.string()
    .min(1, 'Please select an event date')
    .refine((val) => {
      if (!val) return false
      const selected = new Date(val + 'T00:00:00')
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return selected >= today
    }, 'Event date cannot be in the past'),
  guests: z.coerce.number({ invalid_type_error: 'Please enter number of guests' }).min(10, 'Minimum 10 guests').max(5000, 'Maximum 5000 guests'),
  venue: z.string().min(3, 'Please enter the venue name or location'),

  // Step 2 - Personal Info
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit Indian mobile number'),
  email: z.string().email('Enter a valid email address'),

  // Step 3 - Budget & Requirements
  budget: z.string().min(1, 'Please select a budget range'),
  requirements: z.string().min(10, 'Please describe your requirements (min 10 characters)'),
})

type BookingFormData = z.infer<typeof bookingSchema>

const BUDGET_RANGES = [
  '₹50,000 – ₹1,00,000',
  '₹1,00,000 – ₹2,50,000',
  '₹2,50,000 – ₹5,00,000',
  '₹5,00,000 – ₹10,00,000',
  '₹10,00,000+',
  'Custom / Not Sure Yet',
]

const STEPS = [
  { title: 'Event Details', icon: Calendar },
  { title: 'Your Info', icon: User },
  { title: 'Budget & More', icon: Wallet },
]

function formatDisplayDate(dateStr?: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T00:00:00')
  return isNaN(d.getTime()) ? dateStr : formatDate(d)
}

export default function BookEvent() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const todayDateString = new Date().toISOString().split('T')[0]

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: 'onChange',
  })

  const watchedValues = watch()

  const nextStep = async () => {
    let fieldsToValidate: (keyof BookingFormData)[] = []
    if (step === 1) fieldsToValidate = ['eventType', 'eventDate', 'guests', 'venue']
    if (step === 2) fieldsToValidate = ['name', 'phone', 'email']
    const valid = await trigger(fieldsToValidate)
    if (valid) setStep(s => s + 1)
  }

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)
    setErrorMessage(null)
    const res = await sendBookingEmail(data)
    setIsSubmitting(false)

    if (res.success) {
      setSubmitted(true)
    } else {
      setErrorMessage(res.message || 'Failed to submit booking. Please try again.')
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'backOut' }}
          className="text-center max-w-lg mx-auto px-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease: 'backOut' }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-brand-gold/10 border-2 border-brand-gold flex items-center justify-center shadow-sm"
          >
            <Sparkles size={36} className="text-brand-gold" />
          </motion.div>
          <h1 className="font-display text-4xl font-bold text-brand-heading mb-3">
            You're All <span className="text-gradient-gold">Set!</span>
          </h1>
          <p className="text-brand-body text-lg mb-2 font-accent italic">
            Thank you, {watchedValues.name}!
          </p>
          <p className="text-brand-body text-sm mb-8 leading-relaxed">
            We've received your booking enquiry. Our team will reach out to you within <strong className="text-brand-gold">24 hours</strong> on <strong className="text-brand-gold">+91 {watchedValues.phone}</strong> to confirm your event details.
          </p>
          <div className="bg-white rounded-2xl p-6 border border-brand-border mb-8 text-left space-y-3 shadow-sm">
            <div className="flex justify-between text-sm">
              <span className="text-brand-body text-xs uppercase tracking-wider font-semibold">Event</span>
              <span className="text-brand-heading font-medium">{watchedValues.eventType}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-body text-xs uppercase tracking-wider font-semibold">Date</span>
              <span className="text-brand-heading font-medium">{formatDisplayDate(watchedValues.eventDate)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-body text-xs uppercase tracking-wider font-semibold">Guests</span>
              <span className="text-brand-heading font-medium">{watchedValues.guests}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-body text-xs uppercase tracking-wider font-semibold">Budget</span>
              <span className="text-brand-gold font-bold">{watchedValues.budget}</span>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <Link to="/" className="btn-gold">Back to Home <ArrowRight size={14} /></Link>
            <a href="https://wa.me/919677203639" target="_blank" rel="noopener noreferrer" className="btn-outline-gold">WhatsApp Us</a>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <PageHeader
        image="https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1920&q=85&auto=format&fit=crop"
        title="BOOK YOUR EVENT"
        subtitle="Let's Begin the Journey"
        breadcrumbs={[{ label: 'Book' }]}
      />

      {/* Form */}
      <section className="pb-24 bg-brand-bg">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto">
            {/* Step Indicators */}
            <div className="flex items-center justify-center gap-0 mb-12">
              {STEPS.map(({ title, icon: Icon }, i) => {
                const num = i + 1
                const isActive = step === num
                const isDone = step > num
                return (
                  <div key={title} className="flex items-center">
                    <div className={`flex flex-col items-center gap-2 ${isActive ? 'opacity-100' : isDone ? 'opacity-80' : 'opacity-40'}`}>
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isDone ? 'bg-brand-gold border-brand-gold text-white shadow-sm' :
                          isActive ? 'border-brand-gold text-brand-gold bg-brand-gold/10' :
                            'border-brand-border text-brand-body/40 bg-brand-section'
                        }`}>
                        {isDone ? <Check size={16} /> : <Icon size={16} />}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider hidden sm:block ${isActive ? 'text-brand-gold font-semibold' : 'text-brand-body/50'}`}>
                        {title}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className={`w-6 sm:w-16 md:w-24 h-px mx-1 sm:mx-2 transition-colors duration-300 ${step > num ? 'bg-brand-gold' : 'bg-brand-border'}`} />
                    )}
                  </div>
                )
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Area */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <AnimatePresence mode="wait">
                    {/* STEP 1 */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        className="bg-white rounded-2xl p-6 md:p-8 border border-brand-border space-y-6 shadow-sm"
                      >
                        <div>
                          <h2 className="font-display text-2xl text-brand-heading font-semibold mb-1">Event Details</h2>
                          <p className="text-brand-body text-sm">Tell us about your event</p>
                        </div>

                        {/* Event Type */}
                        <div>
                          <label className="block text-xs text-brand-body font-semibold uppercase tracking-widest mb-3">Event Type *</label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {SERVICES.slice(0, 12).map(s => (
                              <label
                                key={s.id}
                                className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all text-sm ${watchedValues.eventType === s.name
                                    ? 'border-brand-gold bg-brand-gold/10 text-brand-gold font-semibold'
                                    : 'border-brand-border text-brand-body hover:border-brand-gold bg-brand-bg'
                                  }`}
                              >
                                <input
                                  type="radio"
                                  value={s.name}
                                  {...register('eventType')}
                                  className="hidden"
                                />
                                <span className="w-3 h-3 rounded-full border flex-shrink-0 flex items-center justify-center border-brand-border text-brand-gold">
                                  {watchedValues.eventType === s.name && <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />}
                                </span>
                                {s.name}
                              </label>
                            ))}
                          </div>
                          {errors.eventType && <p className="text-red-500 text-xs mt-2">{errors.eventType.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <InputField
                            id="eventDate"
                            label="Event Date *"
                            icon={Calendar}
                            type="date"
                            min={todayDateString}
                            error={errors.eventDate}
                            {...register('eventDate')}
                          />
                          <InputField
                            id="guests"
                            label="Number of Guests *"
                            icon={Users}
                            type="number"
                            placeholder="e.g. 200"
                            error={errors.guests}
                            {...register('guests')}
                          />
                        </div>

                        <InputField
                          id="venue"
                          label="Venue / Location *"
                          icon={MapPin}
                          placeholder="e.g. ITC Grand Chola, Chennai or My Home, Adyar"
                          error={errors.venue}
                          {...register('venue')}
                        />
                      </motion.div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        className="bg-white rounded-2xl p-6 md:p-8 border border-brand-border space-y-6 shadow-sm"
                      >
                        <div>
                          <h2 className="font-display text-2xl text-brand-heading font-semibold mb-1">Your Information</h2>
                          <p className="text-brand-body text-sm">How should we reach you?</p>
                        </div>

                        <InputField
                          id="name"
                          label="Full Name *"
                          icon={User}
                          placeholder="e.g. Priya Sharma"
                          error={errors.name}
                          {...register('name')}
                        />
                        <InputField
                          id="phone"
                          label="Mobile Number *"
                          icon={Phone}
                          type="tel"
                          placeholder="10-digit Indian mobile number"
                          error={errors.phone}
                          {...register('phone')}
                        />
                        <InputField
                          id="email"
                          label="Email Address *"
                          icon={Mail}
                          type="email"
                          placeholder="e.g. priya@example.com"
                          error={errors.email}
                          {...register('email')}
                        />
                      </motion.div>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        className="bg-white rounded-2xl p-6 md:p-8 border border-brand-border space-y-6 shadow-sm"
                      >
                        <div>
                          <h2 className="font-display text-2xl text-brand-heading font-semibold mb-1">Budget & Requirements</h2>
                          <p className="text-brand-body text-sm">Help us understand your vision</p>
                        </div>

                        {/* Budget */}
                        <div>
                          <label className="block text-xs text-brand-body font-semibold uppercase tracking-widest mb-3">Budget Range *</label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {BUDGET_RANGES.map(range => (
                              <label
                                key={range}
                                className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all text-sm ${watchedValues.budget === range
                                    ? 'border-brand-gold bg-brand-gold/10 text-brand-gold font-semibold'
                                    : 'border-brand-border text-brand-body hover:border-brand-gold bg-brand-bg'
                                  }`}
                              >
                                <input type="radio" value={range} {...register('budget')} className="hidden" />
                                <span className="w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center border-brand-border text-brand-gold">
                                  {watchedValues.budget === range && <span className="w-2 h-2 rounded-full bg-brand-gold" />}
                                </span>
                                {range}
                              </label>
                            ))}
                          </div>
                          {errors.budget && <p className="text-red-500 text-xs mt-2">{errors.budget.message}</p>}
                        </div>

                        {/* Requirements */}
                        <div>
                          <label htmlFor="requirements" className="block text-xs text-brand-body font-semibold uppercase tracking-widest mb-2">
                            Special Requirements / Vision *
                          </label>
                          <div className="relative">
                            <FileText size={14} className="absolute left-4 top-4 text-brand-body/40" />
                            <textarea
                              id="requirements"
                              rows={5}
                              placeholder="Describe your dream event — theme, style, special requests, inspirations..."
                              {...register('requirements')}
                              className={`w-full bg-white border border-brand-border rounded-xl pl-10 pr-4 py-3.5 text-brand-heading text-sm placeholder:text-brand-body/45 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all resize-none ${errors.requirements ? 'border-red-500 focus:ring-red-500' : 'border-brand-border'
                                }`}
                            />
                          </div>
                          {errors.requirements && <p className="text-red-500 text-xs mt-1.5">{errors.requirements.message}</p>}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs font-body flex items-start gap-3"
                    >
                      <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold mb-0.5">Booking Submission Error</div>
                        <div>{errorMessage}</div>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-6">
                    {step > 1 ? (
                      <button
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => setStep(s => s - 1)}
                        className="btn-outline-gold py-3 disabled:opacity-50"
                      >
                        <ChevronLeft size={14} /> Previous
                      </button>
                    ) : <div />}

                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="btn-gold py-3"
                      >
                        Next Step <ChevronRight size={14} />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-gold py-3 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={14} className="animate-spin" /> Submitting Booking...
                          </>
                        ) : (
                          <>
                            <Sparkles size={14} /> Submit Booking
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Sidebar Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 border border-brand-border sticky top-24 shadow-sm">
                  <h3 className="font-display text-lg text-brand-heading font-semibold mb-5">Booking Summary</h3>
                  <div className="space-y-4 text-sm">
                    {[
                      { label: 'Event Type', value: watchedValues.eventType },
                      { label: 'Date', value: formatDisplayDate(watchedValues.eventDate) },
                      { label: 'Guests', value: watchedValues.guests ? `${watchedValues.guests} guests` : undefined },
                      { label: 'Venue', value: watchedValues.venue },
                      { label: 'Name', value: watchedValues.name },
                      { label: 'Phone', value: watchedValues.phone ? `+91 ${watchedValues.phone}` : undefined },
                      { label: 'Budget', value: watchedValues.budget },
                    ].map(({ label, value }) => (
                      value ? (
                        <div key={label} className="flex flex-col gap-0.5">
                          <span className="text-brand-body/50 text-[10px] uppercase tracking-widest font-semibold">{label}</span>
                          <span className="text-brand-heading font-medium truncate">{value}</span>
                          <div className="h-px bg-brand-border mt-2" />
                        </div>
                      ) : null
                    ))}
                    {!watchedValues.eventType && (
                      <p className="text-brand-body/40 text-xs italic">Fill in the form to see your booking summary here.</p>
                    )}
                  </div>
                  <div className="mt-6 pt-4 border-t border-brand-border">
                    <div className="flex items-center gap-2 text-brand-body text-xs mb-2">
                      <Check size={12} className="text-brand-gold" /> Free consultation included
                    </div>
                    <div className="flex items-center gap-2 text-brand-body text-xs mb-2">
                      <Check size={12} className="text-brand-gold" /> Response within 24 hours
                    </div>
                    <div className="flex items-center gap-2 text-brand-body text-xs">
                      <Check size={12} className="text-brand-gold" /> No commitment required
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
