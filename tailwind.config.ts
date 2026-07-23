/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Brand Palette ──────────────────────────────
        'brand-bg':            '#FCFBF8',
        'brand-section':       '#F7F3EC',
        'brand-card':          '#FFFFFF',
        'brand-gold':          '#C8A24A',
        'brand-gold-secondary':'#E6C97A',
        'brand-heading':       '#2B2B2B',
        'brand-body':          '#666666',
        'brand-border':        '#E8E2D6',
        'brand-brown':         '#8B6914',
        'brand-brown-hover':   '#A07A1A',
        // ── Gold Scale ────────────────────────────────
        gold: {
          DEFAULT: '#C8A24A',
          50:  '#FDF9F0',
          100: '#FAF1D9',
          200: '#F5E3B3',
          300: '#EFD48C',
          400: '#E6C97A',
          500: '#C8A24A',
          600: '#A8862E',
          700: '#876B20',
          800: '#665115',
          900: '#44370D',
        },
        // ── Neutral Warm Scale ────────────────────────
        warm: {
          50:  '#FCFBF8',
          100: '#F7F3EC',
          200: '#EEE8DC',
          300: '#E8E2D6',
          400: '#D9D0C0',
          500: '#B8A990',
          600: '#8B7A61',
          700: '#5E5142',
          800: '#3A3229',
          900: '#2B2B2B',
        },
      },

      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        body:    ['Inter',   'system-ui', 'sans-serif'],
        accent:  ['Poppins', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1.08' }],
        '8xl': ['6rem',   { lineHeight: '1.04' }],
        '9xl': ['8rem',   { lineHeight: '1.0'  }],
      },

      spacing: {
        '18':  '4.5rem',
        '22':  '5.5rem',
        '30':  '7.5rem',
        '34':  '8.5rem',
        '128': '32rem',
        '144': '36rem',
      },

      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
        '5xl': '28px',
        '6xl': '32px',
      },

      backgroundImage: {
        'gradient-gold':          'linear-gradient(135deg, #C8A24A 0%, #E6C97A 50%, #C8A24A 100%)',
        'gradient-gold-soft':     'linear-gradient(135deg, rgba(200,162,74,0.12) 0%, rgba(230,201,122,0.06) 100%)',
        'gradient-hero':          'linear-gradient(180deg, rgba(252,251,248,0.3) 0%, rgba(252,251,248,0.6) 50%, rgba(252,251,248,1) 100%)',
        'gradient-card-border':   'linear-gradient(135deg, #C8A24A, #E6C97A, #C8A24A)',
        'gradient-radial-gold':   'radial-gradient(circle at center, rgba(200,162,74,0.10) 0%, transparent 70%)',
        'gradient-section':       'linear-gradient(180deg, #FCFBF8 0%, #F7F3EC 100%)',
        'gradient-cta':           'linear-gradient(135deg, #F7F3EC 0%, #FCFBF8 50%, #F7F3EC 100%)',
      },

      // ── Soft 3D Shadow System ────────────────────────
      boxShadow: {
        'float':       '0 20px 60px rgba(0,0,0,0.08)',
        'float-sm':    '0 8px 30px rgba(0,0,0,0.06)',
        'float-lg':    '0 30px 80px rgba(0,0,0,0.10)',
        'card':        '0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
        'card-hover':  '0 20px 60px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06)',
        'card-gold':   '0 20px 60px rgba(200,162,74,0.15), 0 4px 12px rgba(200,162,74,0.08)',
        'button':      '0 4px 16px rgba(200,162,74,0.30)',
        'button-hover':'0 8px 28px rgba(200,162,74,0.45)',
        'nav':         '0 4px 24px rgba(0,0,0,0.07)',
        'image':       '0 24px 64px rgba(0,0,0,0.12)',
        'brand-soft':  '0 4px 20px rgba(0,0,0,0.05)',
        'brand-card-hover': '0 16px 48px rgba(0,0,0,0.08)',
        // keep legacy names for backward compat
        'gold':        '0 0 20px rgba(200,162,74,0.12)',
        'gold-lg':     '0 0 40px rgba(200,162,74,0.18)',
        'glass':       '0 8px 32px rgba(43,43,43,0.04)',
        'glass-gold':  '0 8px 32px rgba(200,162,74,0.06)',
      },

      borderColor: {
        'gold-dim':    'rgba(200,162,74,0.20)',
        'gold-bright': 'rgba(200,162,74,0.50)',
      },

      animation: {
        'shimmer':     'shimmer 4s linear infinite',
        'float':       'float 6s ease-in-out infinite',
        'float-slow':  'float 9s ease-in-out infinite',
        'fade-in':     'fadeIn 0.6s ease-out forwards',
        'gold-shine':  'goldShine 0.8s ease forwards',
        'pulse-gold':  'pulseGold 3s ease-in-out infinite',
        'spin-slow':   'spin 12s linear infinite',
      },

      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)'   },
          '50%':      { transform: 'translateY(-12px)'  },
        },
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)'    },
        },
        goldShine: {
          '0%':   { transform: 'translateX(-100%) skewX(-15deg)' },
          '100%': { transform: 'translateX(200%)  skewX(-15deg)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(200,162,74,0.15)' },
          '50%':      { boxShadow: '0 0 30px rgba(200,162,74,0.35)' },
        },
      },

      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
