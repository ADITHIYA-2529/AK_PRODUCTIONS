import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import RootLayout from '@/layouts/RootLayout'
import { WishlistProvider } from '@/contexts/WishlistContext'
import ErrorBoundary from '@/components/shared/ErrorBoundary'
import SplashScreen from '@/components/shared/SplashScreen'

// Primary Pages
import Home from '@/pages/Home'
import About from '@/pages/About'
import Services from '@/pages/Services'
import ServiceDetail from '@/pages/ServiceDetail'
import Events from '@/pages/Events'
import EventDetail from '@/pages/EventDetail'
import Gallery from '@/pages/Gallery'
import Contact from '@/pages/Contact'

// Secondary Pages (still accessible via direct URL)
import BookEvent from '@/pages/BookEvent'
import FAQ from '@/pages/FAQ'
import Packages from '@/pages/Packages'
import Admin from '@/pages/Admin'

// 404 Not Found
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-6 bg-brand-bg">
      <div>
        <div className="font-display text-9xl font-bold text-gradient-gold mb-4">404</div>
        <h1 className="font-display text-3xl text-brand-heading font-bold mb-4">Page Not Found</h1>
        <p className="text-brand-body mb-8 font-body">The page you're looking for doesn't exist.</p>
        <a href="/" className="btn-gold">Go Home</a>
      </div>
    </div>
  )
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <ErrorBoundary>
      <WishlistProvider>
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
        <div className="min-h-screen">
          <BrowserRouter>
            <AnimatePresence mode="wait">
              <Routes>
                <Route element={<RootLayout />}>
                  {/* Primary Navigation Pages */}
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:slug" element={<ServiceDetail />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/events/:slug" element={<EventDetail />} />
                  <Route path="/contact" element={<Contact />} />

                  {/* Legacy redirect: /portfolio → /events */}
                  <Route path="/portfolio" element={<Navigate to="/events" replace />} />

                  {/* Secondary Pages */}
                  <Route path="/book-event" element={<BookEvent />} />
                  <Route path="/packages" element={<Packages />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/admin" element={<Admin />} />

                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </AnimatePresence>
          </BrowserRouter>
        </div>
      </WishlistProvider>
    </ErrorBoundary>
  )
}
