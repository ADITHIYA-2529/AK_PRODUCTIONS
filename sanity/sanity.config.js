import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// ── AK Productions Custom Branding & Theme ─────────────────────────────────────
import {akTheme} from './theme/akTheme.js'
import {AKProductionsLogo} from './theme/AKProductionsLogo.jsx'
import {deskStructure} from './structure/deskStructure.js'
import {AKDashboard} from './components/AKDashboard.jsx'
import {AKNavbar} from './components/AKNavbar.jsx'

// Supplemental CSS overrides for luxury design system
import './theme/studio-theme.css'

export default defineConfig({
  name: 'ak-productions',
  title: '',

  projectId: 'fulbugms',
  dataset: 'production',

  // ── Custom Navbar & Studio Components ──
  studio: {
    components: {
      navbar: AKNavbar,
    },
  },

  // ── Brand theme ──
  theme: akTheme,

  // ── Plugins with Custom Desk Structure ──
  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
  ],

  // ── Custom Tools (AK Productions CMS Dashboard Overview) ──
  tools: (prev) => [
    {
      name: 'dashboard',
      title: 'CMS Dashboard',
      icon: () => '📊',
      component: AKDashboard,
    },
    ...prev,
  ],

  schema: {
    types: schemaTypes,
  },
})
