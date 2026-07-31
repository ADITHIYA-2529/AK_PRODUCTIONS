export interface GalleryItem {
  id: string
  src: string               // image URL (empty string for video-only items)
  videoUrl: string          // video URL (empty string for image-only items)
  mediaType: 'image' | 'video'
  category: string
  title: string
  aspectRatio: 'square' | 'portrait' | 'landscape'
  altText?: string
  featured?: boolean
  displayOrder?: number
  description?: string
}

export const GALLERY_ITEMS: GalleryItem[] = []

export const GALLERY_CATEGORIES = ['All']
