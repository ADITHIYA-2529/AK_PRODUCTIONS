import emailjs from '@emailjs/browser'

export interface ContactEmailParams {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export interface BookingEmailParams {
  name: string
  email: string
  phone: string
  eventType: string
  eventDate: string
  guests: number | string
  venue: string
  budget: string
  requirements: string
}

export interface RegistrationEmailParams {
  fullName: string
  email: string
  phone: string
  college: string
  participants: number | string
  message?: string
  // Event metadata for future backend integration
  eventId: string
  eventName: string
  eventDate: string
  eventTitle: string
}

function getEmailJSConfig() {
  return {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    contactTemplateId: import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || '',
    bookingTemplateId: import.meta.env.VITE_EMAILJS_BOOKING_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  }
}

/**
 * Helper to check if EmailJS is properly configured with non-placeholder keys.
 */
export function isEmailJSConfigured(): boolean {
  const { serviceId, publicKey } = getEmailJSConfig()
  return Boolean(
    serviceId &&
    publicKey &&
    serviceId !== 'your_service_id' &&
    publicKey !== 'your_public_key'
  )
}

/**
 * Validates whether a given template ID is valid and not mistakenly set to the service ID.
 */
function validateTemplateId(templateId: string, serviceId: string): { valid: boolean; error?: string } {
  if (!templateId || templateId === 'your_contact_template_id' || templateId === 'your_booking_template_id') {
    return { valid: false, error: 'Template ID is not configured in .env' }
  }
  if (templateId === serviceId) {
    return {
      valid: false,
      error: `Invalid Template ID: "${templateId}" is a Service ID. In EmailJS, Template IDs start with "template_" (e.g. template_abc123). Please create a template in EmailJS Dashboard and update your .env file.`
    }
  }
  return { valid: true }
}

/**
 * Sends contact enquiry email via EmailJS.
 * If credentials are missing or invalid, provides clear feedback and falls back safely.
 */
export async function sendContactEmail(params: ContactEmailParams): Promise<{ success: boolean; message?: string }> {
  const { serviceId, contactTemplateId, publicKey } = getEmailJSConfig()

  // Provide both snake_case and camelCase / standard field aliases so any template variable format works
  const templateParams = {
    from_name: params.name,
    name: params.name,
    reply_to: params.email,
    user_email: params.email,
    email: params.email,
    user_phone: params.phone,
    phone: params.phone,
    subject: params.subject,
    message: params.message,
    submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  }

  if (!isEmailJSConfigured()) {
    console.warn(
      '[EmailJS Service] Credentials not fully configured in .env. Simulating successful contact email send.\n' +
      'Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_CONTACT_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in .env to send real emails.'
    )
    await new Promise((resolve) => setTimeout(resolve, 800))
    return { success: true, message: 'Simulated send success (missing .env keys)' }
  }

  const templateCheck = validateTemplateId(contactTemplateId, serviceId)
  if (!templateCheck.valid) {
    console.warn(`[EmailJS Config Error] ${templateCheck.error}`)
    return { success: false, message: templateCheck.error }
  }

  try {
    const response = await emailjs.send(serviceId, contactTemplateId, templateParams, { publicKey })
    if (response.status === 200 || response.text === 'OK') {
      return { success: true }
    }
    return { success: false, message: `EmailJS response status: ${response.status}` }
  } catch (error: any) {
    console.error('[EmailJS Contact Error]', error)
    return {
      success: false,
      message: error?.text || error?.message || 'Failed to send message. Please check your EmailJS Template ID & Public Key.',
    }
  }
}

/**
 * Sends event booking enquiry email via EmailJS.
 */
export async function sendBookingEmail(params: BookingEmailParams): Promise<{ success: boolean; message?: string }> {
  const { serviceId, contactTemplateId, bookingTemplateId, publicKey } = getEmailJSConfig()

  const templateParams = {
    from_name: params.name,
    name: params.name,
    reply_to: params.email,
    user_email: params.email,
    email: params.email,
    user_phone: params.phone,
    phone: params.phone,
    event_type: params.eventType,
    eventType: params.eventType,
    event_date: params.eventDate,
    eventDate: params.eventDate,
    guests_count: String(params.guests),
    guests: String(params.guests),
    venue_location: params.venue,
    venue: params.venue,
    budget_range: params.budget,
    budget: params.budget,
    requirements: params.requirements,
    message: params.requirements,
    submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  }

  const targetTemplateId = (bookingTemplateId && bookingTemplateId !== 'your_booking_template_id')
    ? bookingTemplateId
    : contactTemplateId

  if (!isEmailJSConfigured()) {
    console.warn(
      '[EmailJS Service] Credentials not fully configured in .env. Simulating successful booking email send.\n' +
      'Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_BOOKING_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in .env to send real emails.'
    )
    await new Promise((resolve) => setTimeout(resolve, 800))
    return { success: true, message: 'Simulated booking send success' }
  }

  const templateCheck = validateTemplateId(targetTemplateId, serviceId)
  if (!templateCheck.valid) {
    console.warn(`[EmailJS Config Error] ${templateCheck.error}`)
    return { success: false, message: templateCheck.error }
  }

  try {
    const response = await emailjs.send(serviceId, targetTemplateId, templateParams, { publicKey })
    if (response.status === 200 || response.text === 'OK') {
      return { success: true }
    }
    return { success: false, message: `EmailJS response status: ${response.status}` }
  } catch (error: any) {
    console.error('[EmailJS Booking Error]', error)
    return {
      success: false,
      message: error?.text || error?.message || 'Failed to send booking details via EmailJS',
    }
  }
}

/**
 * Sends event registration email via EmailJS.
 * Reuses the booking template with registration-specific field mapping.
 * Includes event metadata for future backend integration.
 */
export async function sendRegistrationEmail(params: RegistrationEmailParams): Promise<{ success: boolean; message?: string }> {
  const { serviceId, contactTemplateId, bookingTemplateId, publicKey } = getEmailJSConfig()

  const templateParams = {
    // Standard aliases for the booking template
    from_name: params.fullName,
    name: params.fullName,
    reply_to: params.email,
    user_email: params.email,
    email: params.email,
    user_phone: params.phone,
    phone: params.phone,
    // Map event registration fields to booking template variables
    event_type: params.eventName,
    eventType: params.eventName,
    event_date: params.eventDate,
    eventDate: params.eventDate,
    guests_count: String(params.participants),
    guests: String(params.participants),
    venue_location: params.college,
    venue: params.college,
    budget_range: `${params.participants} participant(s)`,
    budget: `${params.participants} participant(s)`,
    requirements: params.message || 'No additional message provided.',
    message: params.message || 'No additional message provided.',
    // Registration-specific fields
    college_organization: params.college,
    participants_count: String(params.participants),
    event_id: params.eventId,
    event_title: params.eventTitle,
    submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  }

  const targetTemplateId = (bookingTemplateId && bookingTemplateId !== 'your_booking_template_id')
    ? bookingTemplateId
    : contactTemplateId

  if (!isEmailJSConfigured()) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { success: true, message: 'Simulated registration send success' }
  }

  const templateCheck = validateTemplateId(targetTemplateId, serviceId)
  if (!templateCheck.valid) {
    return { success: false, message: templateCheck.error }
  }

  try {
    const response = await emailjs.send(serviceId, targetTemplateId, templateParams, { publicKey })
    if (response.status === 200 || response.text === 'OK') {
      return { success: true }
    }
    return { success: false, message: `EmailJS response status: ${response.status}` }
  } catch (error: any) {
    console.error('[EmailJS Registration Error]', error)
    return {
      success: false,
      message: error?.text || error?.message || 'Failed to send registration. Please try again.',
    }
  }
}

