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
    title: 'The Royal Sharma Wedding',
    subtitle: 'A Timeless Love Story',
    category: 'Wedding',
    coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900&q=85&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80&auto=format&fit=crop',
    ],
    guests: 600,
    venue: 'ITC Grand Chola, Chennai',
    description: 'A spectacular 3-day wedding celebration with a floral paradise mandap, grand reception, and intimate family ceremony. Every detail was crafted with love.',
    tags: ['Luxury', 'Floral', 'Traditional', 'Grand'],
    date: 'December 2024',
  },
  {
    id: '2',
    title: 'TechCorp Annual Gala',
    subtitle: 'Elevating Corporate Excellence',
    category: 'Corporate',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=85&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80&auto=format&fit=crop',
    ],
    guests: 800,
    venue: 'Chennai Trade Centre',
    description: 'A world-class annual corporate gala with a grand LED stage, award ceremony, and gourmet dinner. Attended by 800 industry professionals.',
    tags: ['Corporate', 'Gala', 'LED', 'Premium'],
    date: 'January 2025',
  },
  {
    id: '3',
    title: 'Little Star\'s 1st Birthday',
    subtitle: 'Once Upon a Magical Year',
    category: 'Birthday',
    coverImage: 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=900',
    images: [
      'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1405528/pexels-photo-1405528.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    guests: 150,
    venue: 'Private Residence, Adyar',
    description: 'A fairy-tale first birthday with enchanted forest theme, balloon installations, interactive photo booths, and a stunning dessert table.',
    tags: ['Birthday', 'Theme', 'Kids', 'Fairy Tale'],
    date: 'February 2025',
  },
  {
    id: '4',
    title: 'Kavitha & Raj Engagement',
    subtitle: 'Where Two Stories Became One',
    category: 'Engagement',
    coverImage: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=900',
    images: [
      'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    guests: 200,
    venue: 'The Park Hotel, Chennai',
    description: 'An elegant garden-inspired engagement with a stunning floral backdrop, candlelit dinner table settings, and a personalised floral photo wall.',
    tags: ['Engagement', 'Romantic', 'Floral', 'Garden'],
    date: 'March 2025',
  },
  {
    id: '5',
    title: 'Bollywood Glamour Night',
    subtitle: 'Lights, Camera, Celebration!',
    category: 'Theme',
    coverImage: 'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=900',
    images: [
      'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    guests: 350,
    venue: 'Chennai Convention Centre',
    description: 'A dazzling Bollywood-themed corporate party with red carpet entry, film reel props, Bollywood DJ, and star-studded décor.',
    tags: ['Theme', 'Bollywood', 'Corporate', 'Dance'],
    date: 'April 2025',
  },
  {
    id: '6',
    title: 'Sunrise Baby Shower',
    subtitle: 'Welcoming New Beginnings',
    category: 'Baby Shower',
    coverImage: 'https://images.pexels.com/photos/5560019/pexels-photo-5560019.jpeg?auto=compress&cs=tinysrgb&w=900',
    images: [
      'https://images.pexels.com/photos/5560019/pexels-photo-5560019.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    guests: 80,
    venue: 'Private Residence, RA Puram',
    description: 'A pastel-perfect baby shower with a gender reveal moment, dreamy balloon installations, customised dessert table, and heartwarming floral arrangements.',
    tags: ['Baby Shower', 'Pastel', 'Gender Reveal', 'Intimate'],
    date: 'May 2025',
  },
]

export const PORTFOLIO_CATEGORIES = ['All', ...new Set(PORTFOLIO_ITEMS.map(p => p.category))]
