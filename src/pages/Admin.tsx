import { motion } from 'framer-motion'
import { ArrowUpRight, Database, Settings, ShieldAlert, BookOpen, Terminal } from 'lucide-react'

export default function Admin() {
  const localStudioUrl = 'http://localhost:3333'
  const hostedStudioUrl = 'https://fulbugms.sanity.studio'

  return (
    <div className="bg-brand-bg text-brand-body min-h-[90vh] py-20 sm:py-28 overflow-hidden">
      <div className="container-luxury max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-4 bg-brand-gold/10 px-4 py-2 rounded-full border border-brand-gold/20">
            <Settings size={14} className="text-brand-gold animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-brand-gold text-xs uppercase tracking-widest font-semibold">
              Content Control Center
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand-heading">
            Admin <span className="text-gradient-gold">Dashboard</span>
          </h1>
          <p className="text-brand-body mt-4 max-w-lg mx-auto font-body font-light">
            Manage your website's events, services, images, and copy dynamically using Sanity CMS.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Local Studio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl border border-brand-border hover:border-brand-gold hover:shadow-brand-soft transition-all duration-300 flex flex-col shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold mb-6">
              <Database size={20} />
            </div>
            <h3 className="font-display text-xl text-brand-heading font-bold mb-2">Local Sanity Studio</h3>
            <p className="text-brand-body text-sm leading-relaxed mb-6 font-body font-light flex-1">
              Access the content studio running on your local machine. Perfect for development, testing schemas, and offline editing.
            </p>
            <a
              href={localStudioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold justify-center w-full font-bold group"
            >
              Open Local Studio
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

          {/* Hosted Studio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-2xl border border-brand-border hover:border-brand-gold hover:shadow-brand-soft transition-all duration-300 flex flex-col shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-brand-brown/10 border border-brand-brown/20 flex items-center justify-center text-brand-brown mb-6">
              <Database size={20} />
            </div>
            <h3 className="font-display text-xl text-brand-heading font-bold mb-2">Production Studio</h3>
            <p className="text-brand-body text-sm leading-relaxed mb-6 font-body font-light flex-1">
              Access the hosted production database on the cloud. Changes made here will update the live production website immediately.
            </p>
            <a
              href={hostedStudioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold justify-center w-full font-bold group"
            >
              Open Cloud Studio
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

        </div>

        {/* Instructions Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-brand-section rounded-2xl p-8 border border-brand-border"
        >
          <div className="flex items-center gap-3 mb-6">
            <BookOpen size={18} className="text-brand-gold" />
            <h3 className="font-display text-lg text-brand-heading font-bold">How to start Local Studio</h3>
          </div>
          
          <div className="space-y-6 text-sm text-brand-body leading-relaxed font-body font-light">
            <div className="flex gap-4 items-start">
              <span className="w-6 h-6 rounded-full bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center text-xs font-bold text-brand-gold flex-shrink-0 mt-0.5">1</span>
              <div>
                <p className="font-semibold text-brand-heading mb-1">Open Terminal</p>
                <p>Navigate to the project directory and open the sanity workspace folder.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="w-6 h-6 rounded-full bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center text-xs font-bold text-brand-gold flex-shrink-0 mt-0.5">2</span>
              <div>
                <p className="font-semibold text-brand-heading mb-1">Run Development Server</p>
                <p>Start the Sanity developer studio service by running the following command:</p>
                <div className="mt-3 flex items-center gap-3 bg-[#6A3D07] text-white px-4 py-2.5 rounded-lg border border-brand-border max-w-sm font-mono text-xs">
                  <Terminal size={12} className="text-brand-gold" />
                  <span>cd sanity && npm run dev</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="w-6 h-6 rounded-full bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center text-xs font-bold text-brand-gold flex-shrink-0 mt-0.5">3</span>
              <div>
                <p className="font-semibold text-brand-heading mb-1">Open browser window</p>
                <p>Once compiled, click the "Open Local Studio" button above or open <a href={localStudioUrl} target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline font-medium">http://localhost:3333</a> in your browser.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-3 items-start bg-amber-50 border border-amber-200/50 rounded-xl p-4 text-xs text-amber-800 leading-relaxed font-body">
            <ShieldAlert size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Note:</strong> Custom authentication is not required for local development. Make sure your browser has access to the internet to authorize queries against the Sanity datastore.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
