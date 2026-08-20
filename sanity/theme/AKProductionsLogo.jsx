/**
 * AK Productions – Studio Header Logo & Brand Identity Component
 *
 * Mirrors the public AK Productions website navbar branding exactly:
 *   - Same logo image (circular, same proportions as website at desktop size)
 *   - "AK" in dark heading colour (#2B2B2B) + "PRODUCTIONS" in gold (#C8A24A)
 *   - Poppins font-bold, tracking-tight — matching website's font-display class
 *   - gap-3.5 (14px) between logo and text block — matching website's gap-3.5
 *   - overflow: visible so Sanity's icon wrapper never clips the brand identity
 */

import React from 'react'
import akLogoAsset from '../../public/AK PRODUCTIONS LOGO.png'

export function AKProductionsLogo() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',           // matches website gap-3.5
        padding: '0',
        overflow: 'visible',
        whiteSpace: 'nowrap',
        position: 'relative',
        zIndex: 10,
        minWidth: 'max-content',
        flexShrink: 0,
      }}
    >
      {/* ── Logo — 58px matches website desktop proportions, clearly visible ── */}
      <div style={{position: 'relative', flexShrink: 0}}>
        {/* Subtle gold ring — mirrors website's hover ring */}
        <div
          style={{
            position: 'absolute',
            inset: '-3px',
            borderRadius: '50%',
            border: '2px solid rgba(200, 162, 74, 0.35)',
            pointerEvents: 'none',
          }}
        />
        <img
          src={akLogoAsset}
          alt="AK Productions"
          style={{
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            border: '1px solid rgba(232, 226, 214, 0.7)',
            boxShadow: '0 2px 8px rgba(43, 43, 43, 0.12)',
            flexShrink: 0,
          }}
        />
      </div>

      {/* ── Brand Name — "AK" dark + "PRODUCTIONS" gold, Poppins bold ── */}
      <div style={{lineHeight: 1}}>
        <div
          style={{
            fontFamily: "'Poppins', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: '24px',          // 24px — larger, clearly readable
            letterSpacing: '-0.02em',  // tracking-tight matching website
            lineHeight: 1.1,
            display: 'flex',
            alignItems: 'baseline',
            gap: '4px',
          }}
        >
          <span style={{color: '#2B2B2B'}}>AK</span>
          <span style={{color: '#C8A24A'}}>PRODUCTIONS</span>
        </div>
      </div>
    </div>
  )
}
