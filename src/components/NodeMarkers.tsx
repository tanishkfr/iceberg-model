import { motion, AnimatePresence } from 'motion/react'
import type { IcebergNode } from '../data/iceberg'

interface Props {
  nodes: IcebergNode[]
  selectedId: string | null
  hoveredId: string | null
  /** Ids lit because something in the layer above points at them. */
  linkedIds: Set<string>
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
  /** Current camera zoom — markers are counter-scaled to hold screen size. */
  k: number
  /** Leader lines out toward the panel edge. */
  showLeaders: boolean
  /** World x of the right edge of frame, so leaders always reach it. */
  leaderX: number
}

export function NodeMarkers({
  nodes,
  selectedId,
  hoveredId,
  linkedIds,
  onSelect,
  onHover,
  k,
  showLeaders,
  leaderX,
}: Props) {
  return (
    <g>
      <AnimatePresence>
        {nodes.map((n, i) => {
          const selected = selectedId === n.id
          const hovered = hoveredId === n.id
          const linked = linkedIds.has(n.id)
          const lit = selected || hovered || linked
          const tint = selected || linked ? '#c2a878' : '#e6eef2'

          return (
            <motion.g
              key={n.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: 'easeOut' }}
            >
              {showLeaders && selected && (
                <motion.line
                  x1={n.pos.x}
                  y1={n.pos.y}
                  x2={leaderX}
                  y2={n.pos.y}
                  stroke="#c2a878"
                  strokeOpacity="0.45"
                  strokeWidth="1"
                  strokeDasharray="3 6"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.65, ease: 'easeInOut' }}
                />
              )}

              <g
                transform={`translate(${n.pos.x} ${n.pos.y}) scale(${k})`}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => onHover(n.id)}
                onMouseLeave={() => onHover(null)}
                onClick={() => onSelect(n.id)}
              >
                {/* Generous invisible hit area — the visible mark stays small. */}
                <circle r="20" fill="transparent" />

                {selected && (
                  <motion.circle
                    r="15"
                    fill="none"
                    stroke={tint}
                    strokeOpacity="0.5"
                    strokeWidth="1"
                    strokeDasharray="2 5"
                    vectorEffect="non-scaling-stroke"
                    style={{ transformOrigin: 'center' }}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                )}

                <motion.circle
                  r={8}
                  fill="none"
                  stroke={tint}
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  initial={{ r: 8, strokeOpacity: 0.34 }}
                  animate={
                    lit
                      ? { r: 10, strokeOpacity: 0.95 }
                      : { r: [8, 9, 8], strokeOpacity: [0.34, 0.52, 0.34] }
                  }
                  transition={
                    lit
                      ? { duration: 0.35, ease: 'easeOut' }
                      : { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }
                  }
                />

                <motion.circle
                  r={2.2}
                  fill={tint}
                  initial={{ r: 2.2, fillOpacity: 0.72 }}
                  animate={{ r: lit ? 3.2 : 2.2, fillOpacity: lit ? 1 : 0.72 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
              </g>
            </motion.g>
          )
        })}
      </AnimatePresence>
    </g>
  )
}
