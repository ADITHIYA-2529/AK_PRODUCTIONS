export interface GalleryItem {
  id: string
  src: string
  category: string
  title: string
  aspectRatio: 'square' | 'portrait' | 'landscape'
}

export const GALLERY_ITEMS: GalleryItem[] = [
  // Weddings — Indian mandap, floral, reception
  { id: '1',  src: '/hero-grand-event.png',                                                                                               category: 'Wedding',     title: 'Grand Luxury Wedding Reception',      aspectRatio: 'landscape' },
  { id: '2',  src: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',                  category: 'Wedding',     title: 'South Indian Bridal Ceremony',         aspectRatio: 'portrait'  },
  { id: '3',  src: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800',                  category: 'Wedding',     title: 'Floral Mandap Décor',                  aspectRatio: 'landscape' },
  { id: '4',  src: '/gallery-hero-wedding.png',                                                                                           category: 'Wedding',     title: 'Candlelit Reception Hall',             aspectRatio: 'landscape' },
  // Corporate
  { id: '5',  src: '/services-hero-stage.png',                                                                                            category: 'Corporate',   title: 'Corporate Gala — LED Stage',           aspectRatio: 'landscape' },
  { id: '6',  src: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',                  category: 'Corporate',   title: 'Business Conference Setup',            aspectRatio: 'square'    },
  // Birthday
  { id: '7',  src: 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=800',                  category: 'Birthday',    title: 'Royal Birthday Celebration',           aspectRatio: 'square'    },
  { id: '8',  src: 'https://images.pexels.com/photos/1405528/pexels-photo-1405528.jpeg?auto=compress&cs=tinysrgb&w=800',                  category: 'Birthday',    title: 'Grand Milestone Birthday Setup',       aspectRatio: 'portrait'  },
  // Engagement
  { id: '9',  src: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=800',                    category: 'Engagement',  title: 'Romantic Engagement Setup',            aspectRatio: 'portrait'  },
  // Entertainment / Stage
  { id: '10', src: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',                  category: 'Entertainment','title': 'Live Concert Stage Lighting',        aspectRatio: 'landscape' },
  { id: '11', src: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',                    category: 'Entertainment','title': 'DJ Night Spectacular',               aspectRatio: 'square'    },
  // Photography
  { id: '12', src: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg?auto=compress&cs=tinysrgb&w=800',                  category: 'Photography', title: 'Wedding Portrait Session',             aspectRatio: 'portrait'  },
  // Baby Shower
  { id: '13', src: 'https://images.pexels.com/photos/5560019/pexels-photo-5560019.jpeg?auto=compress&cs=tinysrgb&w=800',                  category: 'Baby Shower', title: 'Dreamy Baby Shower Setup',             aspectRatio: 'square'    },
  // Theme
  { id: '14', src: 'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=800',                  category: 'Theme',       title: 'Bollywood Night Theme',                aspectRatio: 'landscape' },
  // School / Education
  { id: '15', src: 'https://images.pexels.com/photos/7092614/pexels-photo-7092614.jpeg?auto=compress&cs=tinysrgb&w=800',                  category: 'School',      title: 'Annual Day Stage Decoration',          aspectRatio: 'landscape' },
  // Catering
  { id: '16', src: 'https://images.pexels.com/photos/3217156/pexels-photo-3217156.jpeg?auto=compress&cs=tinysrgb&w=800',                  category: 'Catering',    title: 'Gourmet South Indian Buffet Spread',   aspectRatio: 'landscape' },
  // Team / Behind Scenes
  { id: '17', src: '/about-hero-team.png',                                                                                                category: 'Corporate',   title: 'Event Planning in Action',             aspectRatio: 'square'    },
  { id: '18', src: '/about-story-decoration.png',                                                                                         category: 'Wedding',     title: 'Behind the Scenes — Mandap Setup',     aspectRatio: 'square'    },
]

export const GALLERY_CATEGORIES = ['All', ...new Set(GALLERY_ITEMS.map(item => item.category))]
