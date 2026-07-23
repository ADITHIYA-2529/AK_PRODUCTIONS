import { Outlet } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingButtons from '@/components/layout/FloatingButtons'
import ScrollProgress from '@/components/shared/ScrollProgress'

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-body overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  )
}
