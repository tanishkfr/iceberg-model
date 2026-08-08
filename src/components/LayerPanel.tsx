import { motion } from 'motion/react'
import type { IcebergNode, Layer } from '../data/iceberg'

interface Props {
  layer: Layer
  nodes: IcebergNode[]
  selectedId: string | null
  hoveredId: string | null
  linkedIds: Set<string>
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
  onClose: () => void
}

export function LayerPanel({
  layer,
  nodes,
  selectedId,
  hoveredId,
  linkedIds,
  onSelect,
  onHover,
  onClose,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      className="pointer-events-auto w-[356px] shrink-0 rounded-md border border-white/10 bg-[#080e12]/78 backdrop-blur-md"
    >
      <div className="flex items-start justify-between px-5 pt-5">
        <div>
          <div className="label text-ice-hi/90">{layer.name}</div>
          <div className="mt-1.5 font-serif text-[13px] font-light text-ice-lo">{layer.caption}</div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close layer"
          className="-mr-1 -mt-1 p-1.5 text-ice-lo transition-colors hover:text-ice-hi"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-px px-2.5 pb-3">
        {nodes.map((n, i) => {
          const active = selectedId === n.id
          const linked = linkedIds.has(n.id)
          return (
            <motion.button
              key={n.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.055, ease: 'easeOut' }}
              onMouseEnter={() => onHover(n.id)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onSelect(n.id)}
              className={[
                'group flex items-center gap-3 rounded px-2.5 py-2.5 text-left transition-colors duration-300',
                active ? 'bg-white/[0.07]' : 'hover:bg-white/[0.035]',
              ].join(' ')}
            >
              <span
                className={[
                  'h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300',
                  active || linked ? 'bg-accent' : 'bg-ice-lo/45 group-hover:bg-ice-lo',
                ].join(' ')}
              />
              <span
                className={[
                  'flex-1 font-serif text-[15px] leading-snug font-light transition-colors duration-300',
                  active ? 'text-ice-hi' : 'text-ice-mid/80 group-hover:text-ice-hi',
                ].join(' ')}
              >
                {n.title}
              </span>
              <svg
                width="5"
                height="9"
                viewBox="0 0 5 9"
                fill="none"
                className={[
                  'shrink-0 transition-all duration-300',
                  active
                    ? 'translate-x-0.5 text-accent'
                    : 'text-ice-lo/40 group-hover:translate-x-0.5 group-hover:text-ice-lo',
                  hoveredId === n.id ? 'translate-x-0.5' : '',
                ].join(' ')}
              >
                <path d="M.5.5l4 4-4 4" stroke="currentColor" strokeWidth="1.1" />
              </svg>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
