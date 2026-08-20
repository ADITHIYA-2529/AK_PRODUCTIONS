/**
 * AK Productions – Sanity Studio Custom Luxury Theme
 *
 * Colors extracted from website (tailwind.config.ts & globals.css):
 *   Primary (Gold)      #C8A24A
 *   Gold Light          #E6C97A
 *   Gold Dark           #A67C00
 *   Background          #FCFBF8
 *   Section BG          #F7F3EC
 *   Card                #FFFFFF
 *   Heading text        #2B2B2B
 *   Body text           #666666
 *   Border              #E8E2D6
 *   Brown accent        #8B6914
 */

import {buildLegacyTheme} from 'sanity'

const GOLD          = '#C8A24A'
const GOLD_LIGHT    = '#E6C97A'
const GOLD_DARK     = '#A67C00'
const BROWN         = '#8B6914'
const WARM_BG       = '#FCFBF8'
const SECTION_BG    = '#F7F3EC'
const WHITE         = '#FFFFFF'
const HEADING       = '#2B2B2B'
const BODY_TEXT     = '#666666'
const BORDER        = '#E8E2D6'
const MUTED         = 'rgba(102,102,102,0.55)'

export const akTheme = buildLegacyTheme({
  /* ── Global neutrals ── */
  '--black':  HEADING,
  '--white':  WHITE,

  /* ── Brand primary ── */
  '--brand-primary': GOLD,

  /* ── Default colour scheme (light) ── */
  '--default-bg-color':           WARM_BG,
  '--default-fg-color':           HEADING,
  '--default-icon-color':         BROWN,
  '--default-muted-fg-color':     BODY_TEXT,
  '--default-faded-fg-color':     MUTED,
  '--default-border-color':       BORDER,

  /* ── Code / pre ── */
  '--component-bg':               WHITE,
  '--component-text-color':       HEADING,

  /* ── Focus ring ── */
  '--focus-color':                GOLD,

  /* ── Main navigation bar ── */
  '--main-navigation-color':           WARM_BG,
  '--main-navigation-color--inverted': HEADING,

  /* ── Top-bar ── */
  '--top-bar-color': HEADING,

  /* ── State tones ── */
  '--state-success-color': GOLD,
  '--state-warning-color': '#E6A020',
  '--state-danger-color':  '#B33A3A',
  '--state-info-color':    '#4A7FC1',

  /* ── Buttons ── */
  '--button-primary-color':     GOLD,
  '--button-danger-color':      '#B33A3A',
  '--button-success-color':     GOLD,

  /* ── Dropdown / menu ── */
  '--dropdown-color':            WHITE,
  '--dropdown-shadow-color':     'rgba(43,43,43,0.10)',

  /* ── Input fields ── */
  '--input-bg':                  WHITE,
  '--input-border-color':        BORDER,
  '--input-placeholder-color':   MUTED,
  '--input-fg-color':            HEADING,
  '--input-box-shadow':          'none',

  /* ── Card ── */
  '--card-bg-color':             WHITE,
  '--card-border-color':         BORDER,
  '--card-fg-color':             HEADING,
  '--card-muted-fg-color':       BODY_TEXT,
  '--card-shadow-outline-color': 'rgba(200,162,74,0.20)',
  '--card-shadow-umbra-color':   'rgba(43,43,43,0.06)',
  '--card-shadow-penumbra-color':'rgba(43,43,43,0.04)',

  /* ── Badge ── */
  '--badge-neutral-color':       SECTION_BG,
  '--badge-neutral-fg-color':    HEADING,

  /* ── Label / tag ── */
  '--label-neutral-color':       BORDER,
  '--label-neutral-fg-color':    HEADING,

  /* ── Modal / dialog ── */
  '--modal-bg-color':            WHITE,
  '--modal-fg-color':            HEADING,
})
