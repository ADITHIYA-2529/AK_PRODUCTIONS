export interface Testimonial {
  id: string
  name: string
  role?: string
  eventType: string
  rating: number
  comment: string
  avatar?: string
  date?: string
  featured?: boolean
  location?: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Kavitha & Rajesh',
    role: 'Bride & Groom',
    eventType: 'Wedding Decoration',
    rating: 5,
    comment: 'AK Productions turned our wedding reception at ECR into a royal fairytale. The floral mandap and fairy light entrance were breathtaking beyond words!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80&auto=format&fit=crop',
    date: 'January 2026',
    featured: true,
    location: 'ECR, Chennai',
  },
  {
    id: '2',
    name: 'Senthil Nathan',
    role: 'Managing Director',
    eventType: 'Corporate Event',
    rating: 5,
    comment: 'Impeccable execution for our annual corporate summit. The stage setup, audio-visual alignment, and hospitality were handled with flawless professionalism.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80&auto=format&fit=crop',
    date: 'December 2025',
    featured: true,
    location: 'Nungambakkam, Chennai',
  },
  {
    id: '3',
    name: 'Ananya & Vikram',
    role: 'Parents',
    eventType: '1st Birthday Celebration',
    rating: 5,
    comment: 'The theme decoration for our daughter’s first birthday was magical! From custom entrance arches to balloon styling, every child and parent was amazed.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80&auto=format&fit=crop',
    date: 'November 2025',
    featured: true,
    location: 'Velachery, Chennai',
  },
  {
    id: '4',
    name: 'Deepak Kumar',
    role: 'Client',
    eventType: 'Photography & Videography',
    rating: 5,
    comment: 'The 4K cinematic video summary captured every emotional moment of our engagement. Their candid team is super friendly and extremely skilled.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80&auto=format&fit=crop',
    date: 'October 2025',
    featured: false,
    location: 'RA Puram, Chennai',
  },
  {
    id: '5',
    name: 'Meenakshi Sundaram',
    role: 'Event Host',
    eventType: 'Theme Stage Decoration',
    rating: 5,
    comment: 'AK Productions delivered an unforgettable traditional South Indian stage theme. The fresh jasmine floral arrangements were mesmerising!',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80&auto=format&fit=crop',
    date: 'August 2025',
    featured: false,
    location: 'Mylapore, Chennai',
  },
  {
    id: '6',
    name: 'Priya & Karthik',
    role: 'Bride & Groom',
    eventType: 'Sangeet & Reception',
    rating: 5,
    comment: 'From sound system and LED screen setups to grand entrance pyros, everything ran smoothly without a single delay. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80&auto=format&fit=crop',
    date: 'February 2026',
    featured: true,
    location: 'OMR, Chennai',
  },
]
