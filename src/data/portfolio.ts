import {
  isEventUpcoming as isEventUpcomingUtil,
  getEventDisplayDate as getEventDisplayDateUtil,
  getEventSortTimestamp as getEventSortTimestampUtil,
  parseEventDate as parseEventDateUtil,
  EventDateInput
} from '@/utils/eventDate'

export interface PortfolioItem {
  id: string
  title: string
  subtitle: string
  category: string
  customCategory?: string
  coverImage: string
  bannerImage?: string
  images: string[]
  guests: number
  venue: string
  description: string
  tags: string[]
  dateMode?: 'exact' | 'month' | string
  date: string
  eventMonth?: string
  eventYear?: number
  status?: string
  featured?: boolean
  slug?: string
  time?: string
  organizer?: string
  registrationDeadline?: string
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: '1',
    title: 'Bharatha Kalaium Silaium 2026',
    subtitle: 'A Grand Bharathanatyam World Record Celebration',
    category: 'Dance Event',
    coverImage: 'https://res.cloudinary.com/gbarhqu6/image/upload/f_auto/q_auto/ChatGPT_Image_Jul_25_2026_12_46_26_PM_2_ipcjih.png',
    images: [
      'https://res.cloudinary.com/gbarhqu6/image/upload/f_auto/q_auto/kallum_sailum_portrait.jpg_o0zuir.jpg',
    ],
    guests: 500,
    venue: 'Mahabalipuram, Chennai',
    description: 'Bharatha Kalaium Silaium 2026 is a prestigious Bharathanatyam world record event bringing the dancers on a stage. Inspired by India’s rich cultural heritage, the event celebrates classical dance, artistic excellence, and unity while creating a historic world record experience.',
    tags: [
      'Bharathanatyam',
      'World Record',
      'Cultural Event',
      'Classical Dance',
      'Mahabalipuram'
    ],
    dateMode: 'exact',
    date: '20 September 2026',
  },
  {
    id: '2',
    title: 'Sri Varahi Vaibhavam',
    subtitle: 'A Grand Bharathanatyam Tribute to Goddess Varahi',
    category: 'World Record Event',
    coverImage: 'https://res.cloudinary.com/gbarhqu6/image/upload/f_auto/q_auto/ChatGPT_Image_Jul_25_2026_12_55_26_PM_g2dpqj.png',
    images: [
      'https://res.cloudinary.com/gbarhqu6/image/upload/f_auto/q_auto/WhatsApp_Image_2026-07-15_at_2.46.40_PM_1_ekpbu7.jpg',
    ],
    guests: 500,
    venue: 'Chennai, Tamil Nadu',
    description: 'Sri Varahi Vaibhavam is a spectacular Bharathanatyam cultural event dedicated to Goddess Varahi. The event brings together hundreds of talented dancers to create the world’s largest human formation through Bharathanatyam, celebrating devotion, culture, and artistic excellence on a grand stage.',
    tags: [
      'Varahi',
      'Bharathanatyam',
      'World Record',
      'Classical Dance',
      'Human Formation',
      'Cultural Event'
    ],
    dateMode: 'exact',
    date: '3 October 2026',
  }
]

export const PORTFOLIO_CATEGORIES = ['All', ...Array.from(new Set(PORTFOLIO_ITEMS.map(p => getEffectiveCategory(p))))]

/**
 * Returns current date in YYYY-MM-DD format based on local time.
 */
export function getTodayDateString(): string {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Normalizes any date string (ISO YYYY-MM-DD or readable text like "20 September 2026") into YYYY-MM-DD format.
 */
export function toIsoDateString(dateStr?: string): string {
  if (!dateStr) return ''
  const parsed = parseEventDateUtil({ date: dateStr })
  if (!parsed) return dateStr.trim()
  const m = String(parsed.month).padStart(2, '0')
  const d = String(parsed.day).padStart(2, '0')
  return `${parsed.year}-${m}-${d}`
}

/**
 * Determines whether an event is upcoming (accepts event object or date string).
 */
export function isEventUpcoming(input?: string | EventDateInput): boolean {
  if (!input) return false
  if (typeof input === 'string') {
    return isEventUpcomingUtil({ date: input })
  }
  return isEventUpcomingUtil(input)
}

export const getEventDisplayDate = getEventDisplayDateUtil
export const getEventSortTimestamp = getEventSortTimestampUtil
export const parseEventDate = parseEventDateUtil

/**
 * Resolves effective category name (replaces 'Custom' with customCategory if provided).
 */
export function getEffectiveCategory(item: { category?: string; customCategory?: string }): string {
  if (!item) return 'Event'
  if (item.category === 'Custom' && item.customCategory && item.customCategory.trim()) {
    return item.customCategory.trim()
  }
  return item.category || 'Event'
}

