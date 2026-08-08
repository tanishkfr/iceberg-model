import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { QuickReviewPanel } from './QuickReviewPanel'
import { SourcesPanel } from './SourcesPanel'

/**
 * The two non-immersive views, sharing one shell in the top-right corner.
 *
 * Only one can be open at a time — they occupy the same space, and having both
 * available at once would turn a quiet corner into a second interface
 * competing with the descent.
 */

type PanelId = 'review' | 'sources'

function Toggle({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      aria-expanded={active}
      className={`label flex items-center gap-2 rounded-sm border bg-[#080e12]/78 px-3 py-2 backdrop-blur-md transition-colors duration-300 ${
        active
          ? 'border-white/25 text-ice-hi'
          : 'border-white/10 text-ice-lo hover:border-white/20 hover:text-ice-hi'
      }`}
    >
      {label}
      <svg
        width="9"
        height="6"
        viewBox="0 0 9 6"
        fill="none"
        className={`transition-transform duration-300 ${active ? 'rotate-180' : ''}`}
      >
        <path d="M.5.5l4 4 4-4" stroke="currentColor" strokeWidth="1.1" />
      </svg>
    </button>
  )
}

export function TopPanels({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [open, setOpen] = useState<PanelId | null>(null)
  const [scrollEl, setScrollEl] = useState<HTMLDivElement | null>(null)

  /**
   * The descent listens for wheel events on `window`. Without stopping the
   * native event here, scrolling either list would also drag the camera down a
   * layer. React's synthetic stopPropagation does not reach a window listener,
   * so this has to be a native one.
   */
  useEffect(() => {
    if (!scrollEl) return
    const swallow = (e: WheelEvent) => e.stopPropagation()
    scrollEl.addEventListener('wheel', swallow)
    return () => scrollEl.removeEventListener('wheel', swallow)
  }, [scrollEl])

  const toggle = (id: PanelId) => setOpen((cur) => (cur === id ? null : id))

  return (
    <div className="fixed top-5 right-8 z-50 flex w-[344px] flex-col items-end">
      <div className="flex items-center gap-2">
        <Toggle label="Sources" active={open === 'sources'} onClick={() => toggle('sources')} />
        <Toggle label="Quick Review" active={open === 'review'} onClick={() => toggle('review')} />
      </div>

      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            key={open}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="mt-2 w-full overflow-hidden rounded-md border border-white/10 bg-[#080e12]/92 backdrop-blur-md"
          >
            <div ref={setScrollEl} className="max-h-[74vh] overflow-y-auto py-1.5">
              {open === 'review' ? (
                <QuickReviewPanel
                  onNavigate={(id) => {
                    onNavigate(id)
                    setOpen(null)
                  }}
                />
              ) : (
                <SourcesPanel />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
