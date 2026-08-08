import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { INSIGHTS } from '../data/iceberg'

/**
 * The deepest layer is deliberately not a node list.
 *
 * Arrival is held for a beat before anything appears, then the statements
 * arrive one at a time and stay. Nothing here is clickable — by this point the
 * work of exploring is over and the only thing left to do is read.
 */

/** Silence on arrival, before the first line. */
const HOLD_MS = 900
/** Gap between statements. Slow enough to read one before the next lands. */
const STEP_MS = 950

export function InsightsFinale({ active }: { active: boolean }) {
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!active) {
      setShown(0)
      return
    }
    const timers = INSIGHTS.map((_, i) =>
      window.setTimeout(() => setShown(i + 1), HOLD_MS + i * STEP_MS)
    )
    return () => timers.forEach(clearTimeout)
  }, [active])

  if (!active) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      className="pointer-events-none fixed inset-0 z-40 flex items-center"
    >
      {/* Enough veil to hold the type, not enough to erase the berg behind it. */}
      <div className="absolute inset-0 -z-10 bg-[#04070a]/55" />

      <div className="w-full max-w-[820px] pr-8 pl-[168px]">
        <div className="flex flex-col gap-9">
          {INSIGHTS.map((insight, i) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 12 }}
              animate={shown > i ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div className="label text-accent/70">{insight.title}</div>
              <p className="display mt-2.5 text-[clamp(19px,2.05vw,27px)] leading-[1.38] text-ice-hi">
                {insight.statement}
              </p>
              {insight.support && (
                <p className="mt-2 font-serif text-[13.5px] leading-relaxed font-light text-ice-lo/70">
                  {insight.support}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
