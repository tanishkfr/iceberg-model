import { motion } from 'motion/react'
import {
  FACETS,
  RIDGE_LINES,
  ABOVE_PATH,
  BELOW_PATH,
  FULL_PATH,
  WATERLINE,
  KEEL_Y,
} from '../lib/geometry'
import type { LayerId } from '../data/iceberg'

const FILL: Record<string, string> = {
  'aw-left': '#f2f6f8',
  'aw-mid': '#dde5ea',
  'aw-right-upper': '#c6d3db',
  'aw-right-lower': '#aebeca',
  'uw-left': '#a1b8c4',
  'uw-mid': '#869daa',
  'uw-right': '#6d8694',
}

/** Depth range each layer occupies on the berg, used for the hover regions. */
const BANDS: Record<LayerId, [number, number]> = {
  events: [380, WATERLINE],
  patterns: [WATERLINE, 2060],
  systems: [2060, 2920],
  mental_models: [2920, 3800],
  insights: [3800, KEEL_Y],
}

interface Props {
  /** Which band is currently reachable. */
  activeLayer: LayerId
  hoveredBand: LayerId | null
  onHoverBand: (l: LayerId | null) => void
  onSelectBand: (l: LayerId) => void
  /** Faded to near-nothing for the insight finale. */
  fade: number
}

export function Iceberg({ activeLayer, hoveredBand, onHoverBand, onSelectBand, fade }: Props) {
  return (
    <motion.g animate={{ opacity: fade }} transition={{ duration: 1.4, ease: 'easeInOut' }}>
      <defs>
        <clipPath id="berg-clip">
          <path d={FULL_PATH} />
        </clipPath>
      </defs>

      {/* Facet planes. Form comes from the breaks, not from contrast. */}
      {FACETS.map((f) => (
        <path key={f.id} d={f.d} fill={FILL[f.id]} />
      ))}

      {/* Hairlines sharpen the plane breaks without adding glow. */}
      {RIDGE_LINES.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="#ffffff"
          strokeOpacity={i < 3 ? 0.45 : 0.1}
          strokeWidth={i < 3 ? 1.4 : 2.2}
        />
      ))}

      {/* Vertical falloff across the whole peak, over the top of the facets. */}
      <path d={ABOVE_PATH} fill="url(#face-light)" style={{ pointerEvents: 'none' }} />

      {/* Water tints and dissolves the submerged mass with depth. */}
      <path d={BELOW_PATH} fill="url(#dissolve)" />

      {/* Interactive bands. The berg is the control surface — no buttons. */}
      <g clipPath="url(#berg-clip)">
        {(Object.keys(BANDS) as LayerId[]).map((id) => {
          const [y0, y1] = BANDS[id]
          const on = hoveredBand === id
          return (
            <rect
              key={id}
              x="-200"
              y={y0}
              width="2000"
              height={y1 - y0}
              fill="#ffffff"
              opacity={on ? 0.09 : 0}
              style={{
                cursor: 'pointer',
                transition: 'opacity 500ms ease',
                pointerEvents: id === activeLayer ? 'auto' : 'none',
              }}
              onMouseEnter={() => onHoverBand(id)}
              onMouseLeave={() => onHoverBand(null)}
              onClick={() => onSelectBand(id)}
            />
          )
        })}
      </g>
    </motion.g>
  )
}
