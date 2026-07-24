export interface GalleryItem {
  id: string
  src: string
  category: string
  title: string
  aspectRatio: 'square' | 'portrait' | 'landscape'
}

export const GALLERY_ITEMS: GalleryItem[] = [
  // Weddings — South Indian mandap, grand reception, royal arch
  { id: '1',  src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80&auto=format&fit=crop',  category: 'Wedding',     title: 'Grand Luxury Wedding Reception',      aspectRatio: 'landscape' },
  { id: '2',  src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80&auto=format&fit=crop',  category: 'Wedding',     title: 'South Indian Floral Mandap',          aspectRatio: 'portrait'  },
  { id: '3',  src: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80&auto=format&fit=crop',  category: 'Wedding',     title: 'Royal Entrance Arch Décor',           aspectRatio: 'landscape' },
  { id: '4',  src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80&auto=format&fit=crop',  category: 'Wedding',     title: 'Candlelit Reception Hall',             aspectRatio: 'landscape' },
  // Corporate
  { id: '5',  src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80&auto=format&fit=crop',  category: 'Corporate',   title: 'Corporate Summit — LED Stage',         aspectRatio: 'landscape' },
  { id: '6',  src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80&auto=format&fit=crop',  category: 'Corporate',   title: 'Executive Keynote Setup',              aspectRatio: 'square'    },
  // Birthday — different from baby shower
  { id: '7',  src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80&auto=format&fit=crop',  category: 'Birthday',    title: 'Royal Birthday Celebration',           aspectRatio: 'square'    },
  { id: '8',  src: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80&auto=format&fit=crop',  category: 'Birthday',    title: 'Milestone Birthday Banquet Setup',     aspectRatio: 'portrait'  },
  // Engagement
  { id: '9',  src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80&auto=format&fit=crop',  category: 'Engagement',  title: 'Romantic Engagement Stage',            aspectRatio: 'portrait'  },
  // Entertainment / Stage
  { id: '10', src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80&auto=format&fit=crop',  category: 'Entertainment', title: 'Live Concert Stage Lighting',        aspectRatio: 'landscape' },
  { id: '11', src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80&auto=format&fit=crop',  category: 'Entertainment', title: 'DJ Night & Moving Headlights',       aspectRatio: 'square'    },
  // Photography
  { id: '12', src: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80&auto=format&fit=crop',  category: 'Photography', title: 'Candid Wedding Portrait Session',      aspectRatio: 'portrait'  },
  // Baby Shower — unique image (NOT same as Birthday)
  { id: '13', src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80&auto=format&fit=crop',  category: 'Baby Shower', title: 'Pastel Dreamy Baby Shower Decor',      aspectRatio: 'square'    },
  // Theme
  { id: '14', src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80&auto=format&fit=crop',  category: 'Theme',       title: 'Royal Palace Theme Experience',        aspectRatio: 'landscape' },
  // School / Education
  { id: '15', src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80&auto=format&fit=crop',  category: 'School',      title: 'Annual Day Stage & Lighting',          aspectRatio: 'landscape' },
  // Catering
  { id: '16', src: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80&auto=format&fit=crop',  category: 'Catering',    title: 'Gourmet Catering & Banquet Spread',    aspectRatio: 'landscape' },
  // Team / Behind Scenes
  { id: '17', src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&auto=format&fit=crop',  category: 'Corporate',   title: 'Behind the Scenes — Production Team', aspectRatio: 'square'    },
  { id: '18', src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=80&auto=format&fit=crop',  category: 'Wedding',     title: 'Bespoke Floral Styling & Layout',     aspectRatio: 'square'    },
]

export const GALLERY_CATEGORIES = ['All', ...new Set(GALLERY_ITEMS.map(item => item.category))]
