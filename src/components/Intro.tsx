import { motion, AnimatePresence } from 'motion/react'

/**
 * The opening deliberately withholds instructions. One line of orientation,
 * one quiet hint, and nothing that looks like a control.
 */
export function Intro({ visible, hint }: { visible: boolean; hint: string }) {
  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 1.4, ease: [0.22, 0.61, 0.36, 1], delay: 0.3 }}
            className="pointer-events-none fixed top-[9vh] left-[124px] z-20 max-w-[420px]"
          >
            <h1 className="display text-[clamp(28px,2.9vw,40px)] leading-[1.18] font-normal text-[#1a2832]">
              How does the government shape public perception?
            </h1>
            <p className="mt-3.5 max-w-[340px] font-serif text-[14px] leading-[1.6] font-light text-[#3d505c]">
              Explore the layers beneath the surface to understand how visibility, narratives, and infrastructure are controlled.
            </p>
            <div className="mt-5 pt-3.5 border-t border-[#20303a]/15">
              <span className="label block text-[9.5px] tracking-[0.18em] text-[#485c69]/80 uppercase font-mono">
                Project By
              </span>
              <span className="mt-1 block font-mono text-[11px] tracking-wider text-[#20303a] font-medium">
                Tanishk · Anushka · Arnav · Janya · Nathan
              </span>
              <a
                href="https://www.figma.com/board/zDOtMepKtruxjwPIqYNqn4/Propaganda---Insights-to-Concepts?node-id=116-635&t=O8wjJJD4JsHtkigX-1"
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto mt-2.5 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wide text-[#485c69]/70 transition-colors duration-200 hover:text-[#20303a]"
              >
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="shrink-0">
                  <path d="M2 2h8M10 2v8M10 2L2 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                View FigJam Board
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Single element, opacity only. Keying this by text and swapping through
          AnimatePresence deadlocked whenever the hint changed twice quickly. */}
      <motion.div
        animate={{ opacity: hint ? 0.65 : 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="pointer-events-none fixed bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <span className="label text-ice-lo">{hint}</span>
      </motion.div>
    </>
  )
}
