export interface Package {
  id: string
  name: string
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  price: number
  description: string
  features: string[]
  notIncluded: string[]
  popular: boolean
  color: string
  icon: string
}

export const PACKAGES: Package[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    tier: 'bronze',
    price: 75000,
    description: 'A beautiful beginning for intimate celebrations with essential décor and services.',
    color: '#CD7F32',
    icon: '✦',
    popular: false,
    features: [
      'Basic stage decoration',
      'Welcome arch',
      'Balloon arrangements',
      'Basic floral centrepieces',
      'Ambient lighting',
      'Setup & takedown',
      '1 coordinator on-site',
      'Up to 100 guests',
    ],
    notIncluded: [
      'Photography & Videography',
      'DJ & Sound system',
      'Catering',
      'Theme décor',
      'Premium florals',
    ],
  },
  {
    id: 'silver',
    name: 'Silver',
    tier: 'silver',
    price: 150000,
    description: 'Elevated celebrations with enhanced décor, photography, and seamless coordination.',
    color: '#C0C0C0',
    icon: '✦✦',
    popular: false,
    features: [
      'Premium stage decoration',
      'Grand welcome arch',
      'Floral arrangements',
      'Premium centrepieces',
      'Professional lighting',
      'Photography (8 hrs)',
      'DJ & Basic sound',
      '2 coordinators on-site',
      'Up to 200 guests',
      'Catering consultation',
    ],
    notIncluded: [
      'Cinematography',
      'Drone coverage',
      'Full catering service',
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    tier: 'gold',
    price: 300000,
    description: 'Luxury event experience with full photography, cinematography, and premium décor.',
    color: '#C9A84C',
    icon: '✦✦✦',
    popular: true,
    features: [
      'Luxury full-venue decoration',
      'Mandap/Stage with premium florals',
      'Cinematic photography (12 hrs)',
      'Highlight videography',
      'Drone photography',
      'Professional DJ & sound system',
      'LED dance floor',
      'Catering (veg, 200 pax)',
      '3 dedicated coordinators',
      'Guest management',
      'Up to 400 guests',
      'Décor customisation',
    ],
    notIncluded: [
      'International cuisine',
      'Additional catering pax',
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    tier: 'platinum',
    price: 600000,
    description: 'The ultimate luxury event experience — bespoke, breathtaking, and absolutely flawless.',
    color: '#E5E4E2',
    icon: '✦✦✦✦',
    popular: false,
    features: [
      'Bespoke venue transformation',
      'Custom theme design',
      'Premium import florals',
      'Full cinematography team',
      'Same-day edit film',
      'Drone & aerial coverage',
      'Live streaming setup',
      'Full catering (multi-cuisine)',
      'Celebrity DJ',
      'Professional sound & lighting rig',
      'Dedicated event director',
      'Guest concierge team',
      'Up to 1000 guests',
      'Post-event photo album',
      'Exclusive honeymoon décor',
    ],
    notIncluded: [],
  },
]

export const PACKAGE_COMPARISON_FEATURES = [
  { feature: 'Stage Decoration', bronze: true, silver: true, gold: true, platinum: true },
  { feature: 'Floral Arrangements', bronze: 'Basic', silver: 'Premium', gold: 'Luxury', platinum: 'Import Florals' },
  { feature: 'Photography', bronze: false, silver: '8 Hours', gold: '12 Hours', platinum: 'Full Team' },
  { feature: 'Videography', bronze: false, silver: false, gold: 'Highlights', platinum: 'Full Cinematic' },
  { feature: 'Drone Coverage', bronze: false, silver: false, gold: true, platinum: true },
  { feature: 'DJ & Sound', bronze: false, silver: 'Basic', gold: 'Professional', platinum: 'Celebrity DJ' },
  { feature: 'LED Dance Floor', bronze: false, silver: false, gold: true, platinum: true },
  { feature: 'Catering', bronze: false, silver: false, gold: 'Veg 200 pax', platinum: 'Full Multi-cuisine' },
  { feature: 'Coordinators', bronze: '1', silver: '2', gold: '3', platinum: 'Dedicated Director + Team' },
  { feature: 'Guest Capacity', bronze: '100', silver: '200', gold: '400', platinum: '1000+' },
  { feature: 'Live Streaming', bronze: false, silver: false, gold: false, platinum: true },
  { feature: 'Same-day Edit', bronze: false, silver: false, gold: false, platinum: true },
]
