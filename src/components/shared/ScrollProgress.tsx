import { motion } from 'framer-motion'
import { useScrollProgress } from '@/hooks/useScrollProgress'

export default function ScrollProgress() {
  const progress = useScrollProgress()
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 z-[60] origin-left"
      style={{
        scaleX: progress / 100,
        background: 'linear-gradient(90deg, #C9A84C, #E6BB66, #C9A84C)',
      }}
    />
  )
}
