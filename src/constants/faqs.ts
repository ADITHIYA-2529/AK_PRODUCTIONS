export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

export const FAQS: FAQ[] = [
  {
    id: '1',
    category: 'Booking',
    question: 'How far in advance should I book AK Productions?',
    answer: 'We recommend booking at least 3–6 months in advance for weddings and major events, and 4–6 weeks for smaller events like birthdays or corporate gatherings. Popular dates (wedding season: October–March) fill up fast, so early booking is strongly advised.',
  },
  {
    id: '2',
    category: 'Booking',
    question: 'What is the booking process?',
    answer: 'Fill out our online booking form or WhatsApp us. Our team will contact you within 24 hours to schedule a consultation. After understanding your requirements, we present a customised proposal and quote. Once approved, a booking token confirms your date.',
  },
  {
    id: '3',
    category: 'Pricing',
    question: 'What is your pricing structure?',
    answer: 'Our pricing is customised based on event type, guest count, venue, and specific requirements. We offer Bronze, Silver, Gold, and Platinum packages, or fully bespoke quotes. Use our AI Budget Calculator for an instant estimate.',
  },
  {
    id: '4',
    category: 'Pricing',
    question: 'What is the advance payment required?',
    answer: 'We require a 25% non-refundable booking advance to secure your date. The balance is due 7 days before the event. For premium/platinum packages, a 40% advance is required.',
  },
  {
    id: '5',
    category: 'Services',
    question: 'Do you provide services outside Chennai?',
    answer: 'Yes! While based in Chennai, we service all of Tamil Nadu and can arrange events across India. Travel and logistics costs are included in the quote for outstation events.',
  },
  {
    id: '6',
    category: 'Services',
    question: 'Can you handle both decoration and photography for my wedding?',
    answer: 'Absolutely. Our Gold and Platinum packages include comprehensive decoration, photography, and videography. Bundling services ensures seamless coordination and often provides better value than booking separately.',
  },
  {
    id: '7',
    category: 'Services',
    question: 'Do you offer customised themes?',
    answer: 'Yes, custom theme design is our specialty. Share your vision — be it a Royal Rajasthani theme, tropical paradise, Hollywood glamour, or anything else — and our creative team will bring it to life with precision.',
  },
  {
    id: '8',
    category: 'Logistics',
    question: 'How many people will be on-site during the event?',
    answer: 'Our on-site team varies by event size. Small events have 2–3 team members; medium events have 5–8; large weddings and corporate events have 10–20+ team members, including coordinators, décor crew, photographers, and technicians.',
  },
  {
    id: '9',
    category: 'Logistics',
    question: 'What happens if there is a last-minute change in the event?',
    answer: 'We understand that events are dynamic. Minor changes within 48 hours are accommodated at no charge. Significant changes to scope, venue, or guest count may require a revised quote and timeline assessment.',
  },
  {
    id: '10',
    category: 'Cancellation',
    question: 'What is your cancellation policy?',
    answer: 'Cancellations more than 60 days before the event: 50% refund of advance. 30–60 days: 25% refund. Less than 30 days: No refund. We do offer date-change flexibility subject to availability.',
  },
]

export const FAQ_CATEGORIES = [...new Set(FAQS.map(f => f.category))]
