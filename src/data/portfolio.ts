export interface PortfolioItem {
  id: string
  title: string
  subtitle: string
  category: string
  coverImage: string
  images: string[]
  guests: number
  venue: string
  description: string
  tags: string[]
  date: string
  status?: string
  featured?: boolean
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
    date: '20 September 2026',
  },
  {
    id: '2',
    title: 'Sri Varahi Vaibhavam',
    subtitle: 'A Grand Bharathanatyam Tribute to Goddess Varahi',
    category: 'World Record Event',
    coverImage: 'https://res.cloudinary.com/gbarhqu6/image/upload/f_auto/q_auto/ChatGPT_Image_Jul_25_2026_12_55_26_PM_g2dpqj.png',
    images: [
      'https://res.cloudinary.com/gbarhqu6/image/upload/f_auto/q_auto/WhatsApp_Image_2026-07-15_at_2.46.40_PM_1_ekpbu7.jp',
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
    date: '3 October 2026',
  }
]

export const PORTFOLIO_CATEGORIES = ['All', ...new Set(PORTFOLIO_ITEMS.map(p => p.category))]
