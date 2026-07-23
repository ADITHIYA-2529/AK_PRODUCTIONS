import * as Lucide from 'lucide-react'
import React from 'react'

/**
 * Resolves a Lucide icon string to a React component.
 * Fallback to Sparkles if not found.
 */
export function getIconComponent(iconName: string): React.ComponentType<any> {
  if (!iconName) return Lucide.Sparkles
  
  // Try exact match
  const IconComponent = (Lucide as any)[iconName]
  if (IconComponent) return IconComponent

  // Try mapping some common aliases
  const aliases: Record<string, React.ComponentType<any>> = {
    'University': Lucide.School, // Lucide has School / Landmark instead of University in some versions
    'Wedding': Lucide.Heart,
    'Celebration': Lucide.Cake,
    'Corporate': Lucide.Building2,
    'Decoration': Lucide.Sparkles,
    'Education': Lucide.GraduationCap,
    'Media': Lucide.Camera,
    'Entertainment': Lucide.Music,
    'Technical': Lucide.Zap,
    'Food': Lucide.ChefHat,
    'Catering': Lucide.ChefHat,
    'Planning': Lucide.ClipboardList,
  }

  return aliases[iconName] || Lucide.Sparkles
}
