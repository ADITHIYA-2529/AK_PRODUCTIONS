import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calculator, ChevronDown } from 'lucide-react'
import { formatCurrency } from '@/utils/formatters'

const EVENT_TYPES = [
  { label: 'Wedding', base: 100000 },
  { label: 'Engagement', base: 40000 },
  { label: 'Reception', base: 90000 },
  { label: 'Birthday', base: 20000 },
  { label: 'Baby Shower', base: 25000 },
  { label: 'Corporate Event', base: 120000 },
  { label: 'School Event', base: 35000 },
  { label: 'College Event', base: 45000 },
]

const SERVICES_OPTIONS = [
  { label: 'Photography', cost: 25000 },
  { label: 'Videography', cost: 35000 },
  { label: 'DJ & Sound', cost: 20000 },
  { label: 'Catering (veg)', cost: 450 },
  { label: 'Stage Decoration', cost: 30000 },
  { label: 'Theme Decoration', cost: 50000 },
]

const VENUE_MULTIPLIERS = {
  'Home/Private Venue': 0.8,
  'Banquet Hall': 1.0,
  'Hotel (3-Star)': 1.2,
  'Hotel (5-Star)': 1.5,
  'Outdoor/Garden': 1.1,
}

export default function AiBudgetCalculator() {
  const [eventType, setEventType] = useState(EVENT_TYPES[0].label)
  const [guests, setGuests] = useState(150)
  const [venue, setVenue] = useState('Banquet Hall')
  const [selectedServices, setSelectedServices] = useState<string[]>(['Photography'])

  const toggleService = (label: string) => {
    setSelectedServices(prev =>
      prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]
    )
  }

  const estimate = useMemo(() => {
    const eventBase = EVENT_TYPES.find(e => e.label === eventType)?.base || 100000
    const venueMultiplier = VENUE_MULTIPLIERS[venue as keyof typeof VENUE_MULTIPLIERS] || 1
    const guestFactor = 1 + (guests / 500) * 0.5

    const servicesTotal = SERVICES_OPTIONS
      .filter(s => selectedServices.includes(s.label))
      .reduce((acc, s) => {
        if (s.label === 'Catering (veg)') return acc + s.cost * guests
        return acc + s.cost
      }, 0)

    const subtotal = (eventBase * venueMultiplier * guestFactor) + servicesTotal
    return {
      min: Math.round(subtotal * 0.85 / 1000) * 1000,
      max: Math.round(subtotal * 1.15 / 1000) * 1000,
      mid: Math.round(subtotal / 1000) * 1000,
    }
  }, [eventType, guests, venue, selectedServices])

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border border-brand-border shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
          <Calculator size={18} className="text-brand-gold" />
        </div>
        <div>
          <h3 className="font-display text-xl text-brand-heading font-semibold">AI Budget Calculator</h3>
          <p className="text-brand-body/60 text-xs">Get an instant estimate for your event</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Inputs */}
        <div className="space-y-5">
          {/* Event Type */}
          <div>
            <label className="block text-xs text-brand-body uppercase tracking-widest mb-2 font-medium">Event Type</label>
            <div className="relative">
              <select
                value={eventType}
                onChange={e => setEventType(e.target.value)}
                className="w-full bg-brand-bg border border-brand-border rounded-lg px-4 py-3 text-brand-heading text-sm appearance-none pr-10 focus:outline-none focus:border-brand-gold transition-colors"
              >
                {EVENT_TYPES.map(e => (
                  <option key={e.label} value={e.label} className="bg-white text-brand-heading">
                    {e.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-body/50 pointer-events-none" />
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="block text-xs text-brand-body uppercase tracking-widest mb-2 font-medium">
              Guests: <span className="text-brand-brown font-semibold">{guests}</span>
            </label>
            <input
              type="range"
              min={50}
              max={1000}
              step={25}
              value={guests}
              onChange={e => setGuests(Number(e.target.value))}
              className="w-full accent-brand-gold cursor-pointer"
            />
            <div className="flex justify-between text-xs text-brand-body/40 mt-1">
              <span>50</span><span>1000+</span>
            </div>
          </div>

          {/* Venue */}
          <div>
            <label className="block text-xs text-brand-body uppercase tracking-widest mb-2 font-medium">Venue Type</label>
            <div className="grid grid-cols-1 gap-2">
              {Object.keys(VENUE_MULTIPLIERS).map(v => (
                <button
                  key={v}
                  onClick={() => setVenue(v)}
                  className={`text-left px-3 py-2 rounded text-xs transition-all duration-200 ${
                    venue === v
                      ? 'bg-brand-brown/10 text-brand-brown border border-brand-brown/30'
                      : 'bg-brand-section text-brand-body border border-brand-border hover:border-brand-brown/30'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Services + Result */}
        <div className="space-y-5">
          {/* Services */}
          <div>
            <label className="block text-xs text-brand-body uppercase tracking-widest mb-2 font-medium">Add-on Services</label>
            <div className="space-y-2">
              {SERVICES_OPTIONS.map(s => (
                <button
                  key={s.label}
                  onClick={() => toggleService(s.label)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded border text-xs transition-all duration-200 ${
                    selectedServices.includes(s.label)
                      ? 'bg-brand-brown/10 text-brand-brown border-brand-brown/30 font-medium'
                      : 'bg-brand-section text-brand-body border border-brand-border hover:border-brand-brown/30'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                      selectedServices.includes(s.label) ? 'bg-brand-brown border-brand-brown' : 'border-brand-border bg-white'
                    }`}>
                      {selectedServices.includes(s.label) && (
                        <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 fill-white"><path d="M2 6l3 3 5-5"/></svg>
                      )}
                    </span>
                    {s.label}
                  </span>
                  <span className="text-brand-body/50">
                    {s.label === 'Catering (veg)' ? `${formatCurrency(s.cost)}/pax` : `+${formatCurrency(s.cost)}`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Result */}
          <motion.div
            key={estimate.mid}
            initial={{ scale: 0.97 }}
            animate={{ scale: 1 }}
            className="bg-brand-section rounded-xl p-5 text-center border border-brand-border shadow-sm"
          >
            <div className="text-xs text-brand-body/85 uppercase tracking-widest mb-2 font-medium">Estimated Budget</div>
            <div className="font-display text-3xl font-bold text-gradient-gold mb-1">
              {formatCurrency(estimate.mid)}
            </div>
            <div className="text-xs text-brand-body/60 mb-4">
              Range: {formatCurrency(estimate.min)} – {formatCurrency(estimate.max)}
            </div>
            <div className="text-[10px] text-brand-body/50 leading-relaxed">
              *Estimate only. Final pricing depends on specific requirements, venue, season, and availability.
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
