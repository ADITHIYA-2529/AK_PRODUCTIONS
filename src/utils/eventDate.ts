/**
 * Date and Time utilities for event status calculation, display formatting, and sorting.
 * Timezone-safe implementation avoiding JS UTC date-parsing bugs.
 */

export interface EventDateInput {
  dateMode?: 'exact' | 'month' | string
  date?: string
  eventMonth?: string
  eventYear?: number | string
  time?: string
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const MONTH_MAP: Record<string, number> = {
  january: 1, jan: 1,
  february: 2, feb: 2,
  march: 3, mar: 3,
  april: 4, apr: 4,
  may: 5,
  june: 6, jun: 6,
  july: 7, jul: 7,
  august: 8, aug: 8,
  september: 9, sep: 9, sept: 9,
  october: 10, oct: 10,
  november: 11, nov: 11,
  december: 12, dec: 12,
}

export interface ParsedEventDate {
  isMonthOnly: boolean
  year: number
  month: number // 1..12
  day: number // 1..31
  hours: number // 0..23
  minutes: number // 0..59
  hasExactTime: boolean
  formattedMonthName: string
  rawDateStr: string
}

/**
 * Checks if the event is configured as Month Only.
 */
export function isMonthOnlyEvent(item: EventDateInput): boolean {
  if (item.dateMode === 'month') return true
  if (item.eventMonth && item.eventYear) return true
  if (item.date) {
    const trimmed = item.date.trim()
    // e.g. "August 2026" or "Aug 2026"
    const monthYearRegex = /^([A-Za-z]+)\s+(\d{4})$/
    if (monthYearRegex.test(trimmed)) {
      const match = trimmed.match(monthYearRegex)
      if (match && MONTH_MAP[match[1].toLowerCase()]) {
        return true
      }
    }
  }
  return false
}

/**
 * Parses time string (e.g. "18:00", "6:00 PM", "6:30 PM IST") into hours and minutes.
 */

function parseTimeString(timeStr?: string): { hours: number; minutes: number; hasExactTime: boolean } {
  if (!timeStr) return { hours: 23, minutes: 59, hasExactTime: false }
  const trimmed = timeStr.trim()
  if (!trimmed) return { hours: 23, minutes: 59, hasExactTime: false }

  // 12-hour format e.g. "6:30 PM" or "06:30 PM IST"
  const twelveHourMatch = trimmed.match(/(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM)/i)
  if (twelveHourMatch) {
    let hrs = parseInt(twelveHourMatch[1], 10)
    const mins = parseInt(twelveHourMatch[2], 10)
    const ampm = twelveHourMatch[3].toUpperCase()
    if (ampm === 'PM' && hrs < 12) hrs += 12
    if (ampm === 'AM' && hrs === 12) hrs = 0
    return { hours: hrs, minutes: mins, hasExactTime: true }
  }

  // 24-hour format e.g. "18:30"
  const twentyFourMatch = trimmed.match(/^(\d{1,2}):(\d{2})/)
  if (twentyFourMatch) {
    const hrs = parseInt(twentyFourMatch[1], 10)
    const mins = parseInt(twentyFourMatch[2], 10)
    return { hours: hrs, minutes: mins, hasExactTime: true }
  }

  return { hours: 23, minutes: 59, hasExactTime: false }
}

/**
 * Normalizes event date details from any event object.
 */

export function parseEventDate(item: EventDateInput): ParsedEventDate | null {
  if (!item) return null

  // 1. Month Only Event
  if (isMonthOnlyEvent(item)) {
    let year = item.eventYear ? Number(item.eventYear) : 0
    let month = item.eventMonth ? MONTH_MAP[item.eventMonth.toLowerCase()] : 0

    if ((!year || !month) && item.date) {
      const match = item.date.trim().match(/^([A-Za-z]+)\s+(\d{4})$/)
      if (match) {
        month = MONTH_MAP[match[1].toLowerCase()] || 0
        year = parseInt(match[2], 10) || 0
      }
    }

    if (year > 0 && month > 0) {
      const monthName = MONTH_NAMES[month - 1] || item.eventMonth || 'Month'
      return {
        isMonthOnly: true,
        year,
        month,
        day: 1,
        hours: 23,
        minutes: 59,
        hasExactTime: false,
        formattedMonthName: monthName,
        rawDateStr: item.date || `${monthName} ${year}`
      }
    }
  }

  // 2. Exact Date Event
  const dateStr = item.date ? item.date.trim() : ''
  if (!dateStr) return null

  let year = 0
  let month = 0
  let day = 0

  // ISO YYYY-MM-DD
  const isoMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (isoMatch) {
    year = parseInt(isoMatch[1], 10)
    month = parseInt(isoMatch[2], 10)
    day = parseInt(isoMatch[3], 10)
  } else {
    // "25 August 2026" or "25 Aug 2026"
    const textMatch = dateStr.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/)
    if (textMatch) {
      day = parseInt(textMatch[1], 10)
      month = MONTH_MAP[textMatch[2].toLowerCase()] || 0
      year = parseInt(textMatch[3], 10)
    } else {
      // "August 25, 2026"
      const textMatch2 = dateStr.match(/^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})/)
      if (textMatch2) {
        month = MONTH_MAP[textMatch2[1].toLowerCase()] || 0
        day = parseInt(textMatch2[2], 10)
        year = parseInt(textMatch2[3], 10)
      }
    }
  }

  if (year > 0 && month > 0 && day > 0) {
    const timeInfo = parseTimeString(item.time)
    const monthName = MONTH_NAMES[month - 1] || ''
    return {
      isMonthOnly: false,
      year,
      month,
      day,
      hours: timeInfo.hours,
      minutes: timeInfo.minutes,
      hasExactTime: timeInfo.hasExactTime,
      formattedMonthName: monthName,
      rawDateStr: dateStr
    }
  }

  return null
}

/**
 * Determines whether an event is upcoming based on local date/time.
 * - If month-only: remains upcoming throughout that entire month, moves to past after month ends.
 * - If exact date without time: remains upcoming throughout that entire day until 23:59:59.
 * - If exact date with time: compares exact date and time.
 */

export function isEventUpcoming(item: EventDateInput, refDate: Date = new Date()): boolean {
  const parsed = parseEventDate(item)
  if (!parsed) return false

  const nowY = refDate.getFullYear()
  const nowM = refDate.getMonth() + 1
  const nowD = refDate.getDate()
  const nowH = refDate.getHours()
  const nowMin = refDate.getMinutes()

  if (parsed.isMonthOnly) {
    if (parsed.year > nowY) return true
    if (parsed.year < nowY) return false
    return parsed.month >= nowM
  }

  // Exact date
  if (parsed.year > nowY) return true
  if (parsed.year < nowY) return false

  if (parsed.month > nowM) return true
  if (parsed.month < nowM) return false

  if (parsed.day > nowD) return true
  if (parsed.day < nowD) return false

  // Same day
  if (parsed.hasExactTime) {
    const eventMins = parsed.hours * 60 + parsed.minutes
    const nowMins = nowH * 60 + nowMin
    return eventMins >= nowMins
  }

  // Same day without time -> upcoming all day
  return true
}

/**
 * Formats event date for display on UI.
 * e.g. "August 2026" for month-only, "25 August 2026" for exact date.
 */

export function getEventDisplayDate(item: EventDateInput): string {
  const parsed = parseEventDate(item)
  if (!parsed) {
    return item.date || 'Date TBD'
  }

  if (parsed.isMonthOnly) {
    return `${parsed.formattedMonthName} ${parsed.year}`
  }

  return `${parsed.day} ${parsed.formattedMonthName} ${parsed.year}`
}

/**
 * Gets number of days in a given month.
 */

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

/**
 * Computes sort timestamp (in milliseconds) for accurate chronological sorting.
 * - For upcoming events (ascending): Month-only events sort from the 1st of that month.
 * - For past events (descending): Month-only events sort from the end of that month.
 */

export function getEventSortTimestamp(item: EventDateInput, context: 'upcoming' | 'past' = 'upcoming'): number {
  const parsed = parseEventDate(item)
  if (!parsed) return 0

  if (parsed.isMonthOnly) {
    if (context === 'upcoming') {
      return Date.UTC(parsed.year, parsed.month - 1, 1, 0, 0, 0)
    } else {
      const lastDay = getDaysInMonth(parsed.year, parsed.month)
      return Date.UTC(parsed.year, parsed.month - 1, lastDay, 23, 59, 59)
    }
  }

  return Date.UTC(
    parsed.year,
    parsed.month - 1,
    parsed.day,
    parsed.hours,
    parsed.minutes,
    0
  )
}
