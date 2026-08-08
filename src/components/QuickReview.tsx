import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { LAYERS, nodesOfLayer, type LayerId } from '../data/iceberg'

/**
 * A flat, text-first index of the whole model — the non-immersive way in.
 *
 * Collapsed to a single control by default so it never competes with the
 * descent. It reads from the same node data as the iceberg, so the two can
 * never drift apart.
 */

const REVIEW_LAYERS = LAYERS.filter((l) => l.id !== 'insights')

export function QuickReview({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [open, setOpen] = useState(false)
  const [section, setSection] = useState<LayerId | null>('events')
  const scrollRef = useRef<HTMLDivElement>(null)

  /**
   * The descent listens for wheel events on `window`. Without stopping the
   * native event here, scrolling this list would also drag the camera down a
   * layer. React's synthetic stopPropagation does not reach the window
   * listener, so this has to be a native one.
   */
  useEffect(() => {
    const el = scrollRef.current
    if (!el || !open) return
    const swallow = (e: WheelEvent) => e.stopPropagation()
    el.addEventListener('wheel', swallow)
    return () => el.removeEventListener('wheel', swallow)
  }, [open])

  return (
    <div className="fixed top-5 right-8 z-50 flex w-[320px] flex-col items-end">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="label flex items-center gap-2.5 rounded-sm border border-white/10 bg-[#080e12]/78 px-3 py-2 text-ice-lo backdrop-blur-md transition-colors duration-300 hover:border-white/20 hover:text-ice-hi"
      >
        Quick Review
        <svg
          width="9"
          height="6"
          viewBox="0 0 9 6"
          fill="none"
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M.5.5l4 4 4-4" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="mt-2 w-full overflow-hidden rounded-md border border-white/10 bg-[#080e12]/92 backdrop-blur-md"
          >
            <div ref={scrollRef} className="max-h-[74vh] overflow-y-auto py-1.5">
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
                              onClick={() => {
                                onNavigate(n.id)
                                setOpen(false)
                              }}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
