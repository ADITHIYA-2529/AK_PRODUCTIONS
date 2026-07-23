import { useState, useEffect } from 'react'

const WISHLIST_KEY = 'ak_events_wishlist'

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]')
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
  }, [wishlist])

  const toggleWishlist = (id: string) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const isWishlisted = (id: string) => wishlist.includes(id)

  const clearWishlist = () => setWishlist([])

  return { wishlist, toggleWishlist, isWishlisted, clearWishlist }
}
