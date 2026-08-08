import { motion } from 'motion/react'
import { LAYERS } from '../data/iceberg'

/** World-space y for each layer's title, sitting on its band of the berg. */
const LABEL_Y = [742, 1560, 2560, 3720, 4120]

interface Props {
  layer: number
  maxUnlocked: number
  k: number
  fade: number
}

export function BergLabels({ layer, maxUnlocked, k, fade }: Props) {
  return (
    <motion.g animate={{ opacity: fade }} transition={{ duration: 1.2 }}>
      {LAYERS.map((l, i) => {
        const active = i === layer
        const locked = i > maxUnlocked
        return (
          <motion.g
            key={l.id}
            transform={`translate(820 ${LABEL_Y[i]}) scale(${k})`}
            initial={false}
            animate={{ opacity: locked ? 0.18 : active ? 1 : 0.4 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            style={{ pointerEvents: 'none' }}
          >
            <text
              textAnchor="middle"
              fill={i === 0 ? '#7b8b95' : '#e6eef2'}
              fontFamily="'IBM Plex Mono', monospace"
              fontSize="10.5"
              letterSpacing="3"
            >
              {l.name.toUpperCase()}
            </text>
            <text
              y="22"
              textAnchor="middle"
              fill={i === 0 ? '#8b9aa3' : '#a9bcc6'}
              fontFamily="Newsreader, Georgia, serif"
              fontWeight="300"
              fontSize="13.5"
            >
              {l.caption}
            </text>
          </motion.g>
        )
      })}
    </motion.g>
  )
}
