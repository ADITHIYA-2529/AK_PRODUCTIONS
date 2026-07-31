import { client } from "./client";

// GROQ Query strings
export const HOME_QUERY = `*[_type == "home"][0]`;

export const ABOUT_QUERY = `*[_type == "about"][0]`;

export const CONTACT_QUERY = `*[_type == "contact"][0]`;

export const FEATURED_SERVICES_QUERY = `*[_type == "service" && featured == true] | order(displayOrder asc, _createdAt asc)[0...6]`;

export const ALL_SERVICES_QUERY = `*[_type == "service"] | order(displayOrder asc, _createdAt asc)`;

export const SERVICE_DETAIL_QUERY = `*[_type == "service" && slug.current == $slug][0]`;

export const HOME_GALLERY_QUERY = `*[_type == "gallery"] | order(displayOrder asc, date desc)[0...6] {
  _id, title, category, aspectRatio, altText, description, displayOrder, featured,
  mediaType,
  image,
  "videoUrl": video.asset->url
}`;

export const ALL_GALLERY_QUERY = `*[_type == "gallery"] | order(displayOrder asc, date desc, _createdAt desc) {
  _id, title, category, aspectRatio, altText, description, displayOrder, featured,
  mediaType,
  image,
  "videoUrl": video.asset->url
}`;

export const HOME_EVENTS_QUERY = `*[_type == "event"] | order(date desc)[0...3] {
  _id, title, subtitle, category, coverImage, bannerImage, images,
  guests, venue, date, time, organizer, registrationDeadline,
  description, tags, status, featured,
  "slug": slug.current
}`;

export const ALL_EVENTS_QUERY = `*[_type == "event"] | order(date desc) {
  _id, title, subtitle, category, coverImage, bannerImage, images,
  guests, venue, date, time, organizer, registrationDeadline,
  description, tags, status, featured,
  "slug": slug.current
}`;

export const EVENT_BY_SLUG_QUERY = `*[_type == "event" && slug.current == $slug][0] {
  _id, title, subtitle, category, coverImage, bannerImage, images,
  guests, venue, date, time, organizer, registrationDeadline,
  description, tags, status, featured,
  "slug": slug.current
}`;

export const EVENT_BY_ID_QUERY = `*[_type == "event" && _id == $id][0] {
  _id, title, subtitle, category, coverImage, bannerImage, images,
  guests, venue, date, time, organizer, registrationDeadline,
  description, tags, status, featured,
  "slug": slug.current
}`;

export const FAQS_QUERY = `*[_type == "faq"] | order(order asc)`;

export const PRICING_FAQS_QUERY = `*[_type == "faq" && category == "Pricing"] | order(order asc)`;

export const PACKAGES_QUERY = `*[_type == "package"] | order(order asc)`;

export const FLOATING_CONTACT_QUERY = `*[_type == "contact"][0]{ phone }`;

// Centralized Fetch Helpers
export async function getHomeData() {
  return await client.fetch(HOME_QUERY);
}

export async function getAboutData() {
  return await client.fetch(ABOUT_QUERY);
}

export async function getContactData() {
  return await client.fetch(CONTACT_QUERY);
}

export async function getFeaturedServices() {
  return await client.fetch(FEATURED_SERVICES_QUERY);
}

export async function getAllServices() {
  return await client.fetch(ALL_SERVICES_QUERY);
}

export async function getServiceBySlug(slug: string) {
  return await client.fetch(SERVICE_DETAIL_QUERY, { slug });
}

export async function getHomeGallery() {
  return await client.fetch(HOME_GALLERY_QUERY);
}

export async function getAllGallery() {
  return await client.fetch(ALL_GALLERY_QUERY);
}

export async function getHomeEvents() {
  return await client.fetch(HOME_EVENTS_QUERY);
}

export async function getAllEvents() {
  return await client.fetch(ALL_EVENTS_QUERY);
}

export async function getEventBySlug(slug: string) {
  return await client.fetch(EVENT_BY_SLUG_QUERY, { slug });
}

export async function getEventById(id: string) {
  return await client.fetch(EVENT_BY_ID_QUERY, { id });
}

export async function getAllFaqs() {
  return await client.fetch(FAQS_QUERY);
}

export async function getPricingFaqs() {
  return await client.fetch(PRICING_FAQS_QUERY);
}

export async function getAllPackages() {
  return await client.fetch(PACKAGES_QUERY);
}

export async function getFloatingContact() {
  return await client.fetch(FLOATING_CONTACT_QUERY);
}

// ─── Site Settings ──────────────────────────────────────────
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]`

export async function getSiteSettings() {
  return await client.fetch(SITE_SETTINGS_QUERY)
}

