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
            <h1 className="display text-[clamp(30px,3.1vw,42px)] leading-[1.16] text-[#20303a]">
              What you see
              <br />
              isn’t the whole story.
            </h1>
            <p className="mt-4 max-w-[300px] font-serif text-[14px] leading-[1.6] font-light text-[#41525c]">
              Explore the layers beneath the surface to understand how perception
              is shaped.
            </p>
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
