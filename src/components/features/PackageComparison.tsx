import { motion } from 'framer-motion'
import { Check, X, Minus } from 'lucide-react'
import { PACKAGE_COMPARISON_FEATURES, PACKAGES } from '@/constants/packages'
import { cn } from '@/utils/cn'

export default function PackageComparison() {
  const renderValue = (value: string | boolean) => {
    if (value === true) return <Check size={16} className="text-brand-gold mx-auto" />
    if (value === false) return <X size={14} className="text-brand-body/30 mx-auto" />
    if (value === '') return <Minus size={14} className="text-brand-body/30 mx-auto" />
    return <span className="text-brand-heading text-xs font-semibold">{value}</span>
  }

  const tierColors: Record<string, string> = {
    bronze: 'text-amber-700',
    silver: 'text-slate-600',
    gold: 'text-brand-gold',
    platinum: 'text-slate-800',
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr>
            <th className="text-left py-4 pr-4 text-brand-body/65 text-sm font-semibold uppercase tracking-widest w-44">
              Feature
            </th>
            {PACKAGES.map(pkg => (
              <th key={pkg.id} className="py-4 px-3 text-center relative">
                {pkg.popular && (
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] text-brand-gold bg-brand-gold/10 border border-brand-gold/20 px-2 py-0.5 rounded-full uppercase tracking-widest whitespace-nowrap shadow-sm">
                    Popular
                  </div>
                )}
                <div className={cn('font-display text-lg font-bold', tierColors[pkg.tier])}>
                  {pkg.name}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PACKAGE_COMPARISON_FEATURES.map((row, i) => (
            <motion.tr
              key={row.feature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                'border-t',
                i % 2 === 0 ? 'border-brand-border bg-brand-section/20' : 'border-brand-border'
              )}
            >
              <td className="py-3 pr-4 text-sm text-brand-heading font-body font-medium">{row.feature}</td>
              <td className="py-3 px-3 text-center">{renderValue(row.bronze)}</td>
              <td className="py-3 px-3 text-center">{renderValue(row.silver)}</td>
              <td className={cn(
                'py-3 px-3 text-center',
                'bg-brand-gold/5'
              )}>{renderValue(row.gold)}</td>
              <td className="py-3 px-3 text-center">{renderValue(row.platinum)}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
