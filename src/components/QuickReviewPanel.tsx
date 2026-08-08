import { useState } from 'react'
import { LAYERS, nodesOfLayer, type LayerId } from '../data/iceberg'

/**
 * A flat, text-first index of the whole model — the non-immersive way in.
 *
 * Reads from the same node data as the iceberg, so the two can never drift.
 * Positioning, the scroll container and wheel isolation all belong to
 * TopPanels; this renders content only.
 */

const REVIEW_LAYERS = LAYERS.filter((l) => l.id !== 'insights')

export function QuickReviewPanel({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [section, setSection] = useState<LayerId | null>('events')

  return (
    <>
      {REVIEW_LAYERS.map((layer) => {
        const nodes = nodesOfLayer(layer.id)
        const expanded = section === layer.id
        return (
          <div key={layer.id} className="border-b border-white/[0.06] last:border-b-0">
            <button
              onClick={() => setSection(expanded ? null : layer.id)}
              aria-expanded={expanded}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-left transition-colors duration-200 hover:bg-white/[0.03]"
            >
              <svg
                width="7"
                height="5"
                viewBox="0 0 9 6"
                fill="none"
                className={`shrink-0 text-ice-lo/50 transition-transform duration-200 ${
                  expanded ? 'rotate-180' : ''
                }`}
              >
                <path d="M.5.5l4 4 4-4" stroke="currentColor" strokeWidth="1.3" />
              </svg>
              <span
                className={`label flex-1 transition-colors duration-200 ${
                  expanded ? 'text-ice-hi' : 'text-ice-lo'
                }`}
              >
                {layer.name}
              </span>
              <span className="font-mono text-[10px] text-ice-lo/40">{nodes.length}</span>
            </button>

            {expanded && (
              <ul className="pb-2">
                {nodes.map((n) => (
                  <li key={n.id}>
                    <button
                      onClick={() => onNavigate(n.id)}
                      className="group block w-full px-4 py-1.5 pl-[30px] text-left transition-colors duration-200 hover:bg-white/[0.04]"
                    >
                      <span className="block font-serif text-[13px] leading-snug font-light text-ice-mid/85 transition-colors duration-200 group-hover:text-ice-hi">
                        {n.title}
                      </span>
                      <span className="mt-0.5 block font-serif text-[11.5px] leading-snug font-light text-ice-lo/55">
                        {n.summary}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
    </>
  )
}
