import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { INSIGHTS } from '../data/iceberg'

/**
 * The deepest layer is deliberately not a node list.
 *
 * Arrival is held for a beat before anything appears, then the statements
 * arrive one at a time and stay.
 */

/** Silence on arrival, before the first line. */
const HOLD_MS = 600
/** Gap between statements. */
const STEP_MS = 800

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
      className="fixed inset-0 z-40 flex items-center overflow-y-auto py-12 pointer-events-auto"
    >
      {/* Enough veil to hold the type, not enough to erase the berg behind it. */}
      <div className="fixed inset-0 -z-10 bg-[#04070a]/65 pointer-events-none" />

      <div className="w-full max-w-[860px] pr-8 pl-[168px] my-auto">
        <div className="flex flex-col gap-7">
          {INSIGHTS.map((insight, i) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 12 }}
              animate={shown > i ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div className="label text-accent/80 font-semibold tracking-wider">{insight.title}</div>
              <p className="display mt-1.5 text-[clamp(17px,1.75vw,23px)] leading-[1.35] text-ice-hi font-normal">
                {insight.statement}
              </p>
              {insight.sublines && insight.sublines.length > 0 && (
                <ul className="mt-2 space-y-1 pl-4 list-disc marker:text-accent/60 text-[12.5px] leading-relaxed text-ice-lo/75 font-mono">
                  {insight.sublines.map((line, sIdx) => (
                    <li key={sIdx}>{line}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
