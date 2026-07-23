import { createContext, useContext, ReactNode } from 'react'
import { useWishlist } from '@/hooks/useWishlist'

interface WishlistContextType {
  wishlist: string[]
  toggleWishlist: (id: string) => void
  isWishlisted: (id: string) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const wishlistData = useWishlist()
  return (
    <WishlistContext.Provider value={wishlistData}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlistContext() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlistContext must be used within WishlistProvider')
  return ctx
}
