/**
 * AK Productions – Custom Studio Navbar
 *
 * Uses Sanity Studio v3's official studio.components.navbar API.
 *
 * Why this approach:
 *   The default Sanity navbar renders the brand inside a <button> (WorkspaceMenuButton)
 *   which opens a "Manage project / Invite members" popup on click.
 *   By providing a custom navbar, we render the brand as a plain <div> — it is
 *   physically impossible for a div to open a popup. No CSS hacks needed.
 *
 * Structure:
 *   [AK Productions Logo  AK PRODUCTIONS]  |  {Sanity tools, search, controls}
 *        ↑ pure <div>, non-interactive               ↑ renderDefault(props)
 */

import React from 'react'
import akLogoAsset from '../../public/AK PRODUCTIONS LOGO.png'

export function AKNavbar(props) {
  const {renderDefault} = props

  return (
    <div data-ak-navbar="true">
      {/* ── AK Productions Brand — static div, zero click behaviour ── */}
      <div className="ak-brand-area" style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingRight: '1.5rem', marginRight: '0.5rem', borderRight: '1px solid #E8E2D6', height: '58px', userSelect: 'none' }}>
        {/* Logo circle with gold ring */}
        <div className="ak-logo-wrap" style={{ position: 'relative', flexShrink: 0 }}>
          <div className="ak-logo-ring" style={{ position: 'absolute', inset: '-3px', borderRadius: '50%', border: '2px solid rgba(200, 162, 74, 0.4)', pointerEvents: 'none' }} />
          <img
            src={akLogoAsset}
            alt="AK Productions"
            className="ak-logo-img"
            style={{ width: '54px', height: '54px', minWidth: '54px', minHeight: '54px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'center', display: 'block', border: '1px solid #E8E2D6', boxShadow: '0 2px 8px rgba(43, 43, 43, 0.12)', flexShrink: 0 }}
          />
        </div>

        {/* "AK" dark (#2B2B2B) + "PRODUCTIONS" gold (#C8A24A) — matching public website style */}
        <div className="ak-brand-name" style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 700, fontSize: '22px', letterSpacing: '-0.02em', lineHeight: 1.1, display: 'flex', alignItems: 'baseline', gap: '4px', whiteSpace: 'nowrap' }}>
          <span className="ak-name-ak" style={{ color: '#2B2B2B' }}>AK</span>
          <span className="ak-name-productions" style={{ color: '#C8A24A' }}>PRODUCTIONS</span>
        </div>
      </div>

      {/* ── Sanity Studio default navbar shell ──
          Provides: CMS Dashboard, Structure, Vision, Releases,
                    Drafts, Search, and all right-side controls.
          The WorkspaceMenuButton inside is hidden by CSS. ── */}
      <div className="ak-tools-area">
        {renderDefault(props)}
      </div>
    </div>
  )
}
