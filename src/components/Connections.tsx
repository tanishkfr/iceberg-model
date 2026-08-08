import { motion, AnimatePresence } from 'motion/react'
import { byId } from '../data/iceberg'

export interface Link {
  from: string
  to: string
}

/** Vertical S-curve. Links always read as descending into the layer below. */
function curve(x1: number, y1: number, x2: number, y2: number) {
  const dy = (y2 - y1) * 0.45
  return `M${x1} ${y1} C ${x1} ${y1 + dy}, ${x2} ${y2 - dy}, ${x2} ${y2}`
}

export function Connections({ links }: { links: Link[] }) {
  return (
    <g fill="none">
      <AnimatePresence>
        {links.map(({ from, to }, i) => {
          const a = byId.get(from)
          const b = byId.get(to)
          if (!a || !b) return null
          return (
            <motion.path
              key={`${from}-${to}`}
              d={curve(a.pos.x, a.pos.y, b.pos.x, b.pos.y)}
              stroke="#c2a878"
              strokeWidth="1.25"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.55 }}
              exit={{ opacity: 0, transition: { duration: 0.35 } }}
              transition={{
                pathLength: { duration: 1.1, delay: 0.15 + i * 0.12, ease: [0.22, 0.61, 0.36, 1] },
                opacity: { duration: 0.5, delay: 0.15 + i * 0.12 },
              }}
            />
          )
        })}
      </AnimatePresence>
    </g>
  )
}
